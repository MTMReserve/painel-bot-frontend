// ============================
// File: src/server/tests/integration/utils/setupTestTenant.ts
// ============================

import { pool } from "../../../utils/db";
import bcrypt from "bcrypt";
import type { RowDataPacket } from "mysql2";

export async function setupTestTenant() {
  const tenant_id = "teste-produto";
  const senha = "123456";
  const senha_hash = await bcrypt.hash(senha, 10);

  const [rows] = await pool.query("SELECT id FROM tenants WHERE tenant_id = ?", [tenant_id]);
  if ((rows as RowDataPacket[]).length === 0) {
    await pool.query(
      `
      INSERT INTO tenants (
        tipo_pessoa,
        tenant_id,
        senha_hash,
        nome_empresa,
        logo_url,
        plano,
        aceitou_termos_em,
        termo_versao,
        email,
        telefone,
        google_id,
        cpf,
        nome_completo,
        data_nascimento,
        cnpj,
        razao_social,
        nome_fantasia,
        responsavel_legal_nome,
        responsavel_legal_cpf,
        cep,
        logradouro,
        bairro,
        numero,
        complemento,
        cidade,
        estado
      )
      VALUES (?, ?, ?, ?, ?, ?, NOW(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        "CNPJ",                          // tipo_pessoa
        tenant_id,                      // tenant_id
        senha_hash,                     // senha_hash
        "Empresa de Teste",             // nome_empresa
        "https://logo.com/teste.png",   // logo_url
        "mensal",                       // plano
        "v1.0",                         // termo_versao
        "teste@empresa.com",            // email
        "11999999999",                  // telefone
        "google-oauth-id-123",          // google_id
        "12345678900",                  // cpf
        "João da Silva",                // nome_completo
        "1990-01-01",                   // data_nascimento
        "12345678000199",               // cnpj
        "Empresa Teste LTDA",           // razao_social
        "Loja Teste",                   // nome_fantasia
        "Carlos Souza",                 // responsavel_legal_nome
        "98765432100",                  // responsavel_legal_cpf
        "01001-000",                    // cep
        "Rua dos Testes",               // logradouro
        "Centro",                       // bairro
        "123",                          // numero
        "Sala 1",                       // complemento
        "São Paulo",                    // cidade
        "SP"                            // estado
      ]
    );
    console.log("[TEST] ✅ Tenant de teste criado com todos os campos.");
  } else {
    console.log("[TEST] ⚠️  Tenant de teste já existe.");
  }
}
