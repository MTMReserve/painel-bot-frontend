// ==============================
// File: src/server/tests/integration/product.integration.test.ts
// ==============================

import request from 'supertest';
import { app } from '../../server';
import { pool } from '../../../server/utils/db';
import { setupTestTenant } from './utils/setupTestTenant';

const tenant_id = 'teste-produto';
let productId: string;
let cookie: string[];

beforeAll(async () => {
  await setupTestTenant();

  const loginRes = await request(app)
    .post("/auth/login")
    .send({
      identificador: "teste@empresa.com", // mesmo email usado no setup
      senha: "123456"                     // mesma senha usada no setup
    });

  // ✅ Corrigido: garantir array de cookies válido
  const setCookie = loginRes.headers["set-cookie"];
  if (Array.isArray(setCookie)) {
    cookie = setCookie;
  } else if (typeof setCookie === "string") {
    cookie = [setCookie];
  } else {
    cookie = [];
  }

  if (cookie.length === 0) {
    throw new Error("Login de teste falhou: cookie vazio");
  }
});

afterAll(async () => {
  await pool.query('DELETE FROM products WHERE tenant_id = ?', [tenant_id]);
  await pool.end();
});

describe('Integração - Products', () => {
  it('deve criar um produto com todos os campos', async () => {
    const res = await request(app)
      .post('/products')
      .set('Cookie', cookie)
      .send({
        tenant_id,
        nome: 'Produto Teste',
        descricao: 'Descrição completa',
        preco: 'R$ 99,00 ou 3x de R$ 33',
        promocao: 'Leve 3, pague 2',
        garantias: 'Satisfação garantida ou seu dinheiro de volta',
        beneficios: ['Entrega expressa', 'Suporte 24h'],
        formasPagamento: ['pix', 'credito'],
        instrucoesPagamento: 'Pix: chave@email.com',
        negociacao: {
          preco_base: 100,
          desconto_pix: 0.1,
          preco_com_desconto: 90,
          condicao_para_desconto: 'À vista via Pix',
          observacoes: 'Promoção válida até o fim do mês'
        },
        entrega: 'envio',
        instrucoesEntrega: 'Entregamos via motoboy',
        local_realizacao: 'Rua X, 123',
        requires_address: true,
        definicaoFechamento: 'Cliente confirmou interesse e pagamento',
        camposObrigatoriosFechamento: ['name', 'payment_method'],
        categoria: 'servico',
        tags: ['urgente', 'luxo']
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    productId = res.body.id;
  });

  it('deve buscar o produto criado e validar estrutura JSON', async () => {
    const res = await request(app)
      .get(`/products/${productId}`)
      .set('Cookie', cookie);

    expect(res.statusCode).toBe(200);
    expect(res.body.nome).toBe('Produto Teste');
    expect(Array.isArray(res.body.beneficios)).toBe(true);
    expect(res.body.beneficios).toContain('Entrega expressa');
    expect(res.body.negociacao?.preco_base).toBe(100);
    expect(res.body.formasPagamento).toContain('pix');
    expect(res.body.camposObrigatoriosFechamento).toContain('payment_method');
  });

  it('deve atualizar o produto com novos valores', async () => {
    const res = await request(app)
      .put(`/products/${productId}`)
      .set('Cookie', cookie)
      .send({
        nome: 'Produto Atualizado',
        descricao: 'Nova descrição',
        preco: 'R$ 120,00',
        formasPagamento: ['boleto', 'credito'],
        definicaoFechamento: 'Atualizado para nova estratégia',
        camposObrigatoriosFechamento: ['name', 'confirmacao']
      });

    expect(res.statusCode).toBe(200);
  });

  it('deve retornar o produto atualizado', async () => {
    const res = await request(app)
      .get(`/products/${productId}`)
      .set('Cookie', cookie);

    expect(res.statusCode).toBe(200);
    expect(res.body.nome).toBe('Produto Atualizado');
    expect(res.body.formasPagamento).toContain('boleto');
    expect(res.body.camposObrigatoriosFechamento).toContain('confirmacao');
  });
});
