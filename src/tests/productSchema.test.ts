import { productSchema } from '../client/schemas/productSchema';

describe('productSchema', () => {
  it('deve validar um produto válido', () => {
    const data = {
      tenant_id: 'tenant-1',
      nome: 'Produto Teste',
      descricao: 'Descrição do produto',
      preco: 100,
      categorias: ['categoria1'],
      formasPagamento: ['credito'],
      metas_por_etapa: { descoberta: 10, consideracao: 5 },
    };
    expect(() => productSchema.parse(data)).not.toThrow();
  });

  it('deve falhar se o nome for vazio', () => {
    const data = {
      tenant_id: 'tenant-1',
      nome: '',
      descricao: 'Descrição',
      preco: 50,
      categorias: ['categoria'],
      formasPagamento: ['debito'],
      metas_por_etapa: {},
    };
    expect(() => productSchema.parse(data)).toThrow();
  });

  it('deve falhar se categorias estiver vazio', () => {
    const data = {
      tenant_id: 'tenant-1',
      nome: 'Produto',
      descricao: 'Teste',
      preco: 50,
      categorias: [],
      formasPagamento: ['debito'],
      metas_por_etapa: {},
    };
    expect(() => productSchema.parse(data)).toThrow();
  });
});