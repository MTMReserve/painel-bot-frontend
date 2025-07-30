import { pool } from "../utils/db";
import type { Tenant } from "../models/Tenant"; // ✅ Fonte de verdade

// Já existente
export async function findTenantById(tenant_id: string) {
  const [rows] = await pool.query<Tenant[]>(
    `
    SELECT
      id,
      tenant_id,
      senha_hash,
      nome_empresa,
      nome_completo,
      cpf,
      aceitou_termos_em,
      termo_versao,
      logo_url,
      plano,
      email,
      telefone,
      cep,
      logradouro,
      numero,
      complemento,
      cidade,
      estado
    FROM tenants
    WHERE tenant_id = ?
    LIMIT 1
    `,
    [tenant_id]
  );
  return rows[0] || null;
}


// ✅ buscar por e-mail
export async function findTenantByEmail(email: string) {
  const [rows] = await pool.query<Tenant[]>(
    `
    SELECT
      id,
      tenant_id,
      senha_hash,
      nome_empresa,
      nome_completo,
      cpf,
      aceitou_termos_em,
      termo_versao,
      logo_url,
      plano,
      email,
      telefone,
      cep,
      logradouro,
      numero,
      complemento,
      cidade,
      estado
    FROM tenants
    WHERE email = ?
    LIMIT 1
    `,
    [email]
  );

  return rows[0] || null;
}

// ✅ busca por telefone com suporte a múltiplos formatos
export async function findTenantByTelefone(telefone: string) {
  const telefoneLimpo = telefone.replace(/\D/g, "");

  const tentativas = [
    telefoneLimpo,
    "+55" + telefoneLimpo,
    "55" + telefoneLimpo,
  ];

  const [rows] = await pool.query<Tenant[]>(
    `
    SELECT
      id,
      tenant_id,
      senha_hash,
      nome_empresa,
      nome_completo,
      cpf,
      aceitou_termos_em,
      termo_versao,
      logo_url,
      plano,
      email,
      telefone,
      cep,
      logradouro,
      numero,
      complemento,
      cidade,
      estado
    FROM tenants
    WHERE telefone IN (?, ?, ?)
    LIMIT 1
    `,
    tentativas
  );


  return rows[0] || null;
}

// ✅ criação completa de tenant com todos os campos
export async function createTenant(data: Omit<Tenant, "criado_em">) {
  const {
    tipo_pessoa,
    tenant_id,
    senha_hash,
    nome_empresa,
    logo_url,
    plano,
    termo_versao,
    aceitou_termos_em,
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
    estado,
  } = data;

  const insertSql = `
    INSERT INTO tenants (
      tipo_pessoa, tenant_id, senha_hash, nome_empresa, logo_url, plano,
      termo_versao, aceitou_termos_em, email, telefone, google_id,
      cpf, nome_completo, data_nascimento,
      cnpj, razao_social, nome_fantasia, responsavel_legal_nome, responsavel_legal_cpf,
      cep, logradouro, bairro, numero, complemento, cidade, estado
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  await pool.query(insertSql, [
    tipo_pessoa,
    tenant_id,
    senha_hash,
    nome_empresa,
    logo_url || null,
    plano,
    termo_versao,
    aceitou_termos_em,
    email,
    telefone,
    google_id || null,
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
    estado,
  ]);

  const [rows] = await pool.query<Tenant[]>(
    `
    SELECT
      id,
      tenant_id,
      nome_empresa,
      nome_completo,
      cpf,
      aceitou_termos_em,
      termo_versao,
      logo_url,
      plano,
      email,
      telefone,
      cep,
      logradouro,
      numero,
      complemento,
      cidade,
      estado
    FROM tenants
    WHERE tenant_id = ?
    LIMIT 1
    `,
    [tenant_id]
  );


  return rows[0];
}

// Atualiza campo plano
export async function updateTenantPlano(tenant_id: string, plano: string) {
  await pool.query("UPDATE tenants SET plano = ? WHERE tenant_id = ?", [plano, tenant_id]);
}

// ✅ NOVO: Atualiza campo nome_empresa
export async function updateTenantNomeEmpresa(tenant_id: string, nome_empresa: string) {
  await pool.query("UPDATE tenants SET nome_empresa = ? WHERE tenant_id = ?", [nome_empresa, tenant_id]);
}

// Registra aceite do termo
export async function salvarAceiteTermo(tenant_id: string, versao: string) {
  await pool.query(
    "UPDATE tenants SET aceitou_termos_em = NOW(), termo_versao = ? WHERE tenant_id = ?",
    [versao, tenant_id]
  );
}

// buscar por Google ID
export async function findTenantByGoogleId(google_id: string) {
  const [rows] = await pool.query<Tenant[]>(
    `
    SELECT
      id,
      tenant_id,
      nome_empresa,
      nome_completo,
      cpf,
      aceitou_termos_em,
      termo_versao,
      logo_url,
      plano,
      email,
      telefone,
      cep,
      logradouro,
      numero,
      complemento,
      cidade,
      estado
    FROM tenants
    WHERE google_id = ?
    LIMIT 1
    `,
    [google_id]
  );

  return rows[0] || null;
}

// criar tenant a partir do Google
export async function createTenantFromGoogle(data: {
  google_id: string;
  nome_empresa: string;
  email?: string;
  logo_url?: string;
}) {
  const { google_id, nome_empresa, email, logo_url } = data;

  const tenant_id = `g${google_id.slice(0, 10)}`;

  await pool.query(
    "INSERT INTO tenants (tenant_id, google_id, nome_empresa, email, logo_url) VALUES (?, ?, ?, ?, ?)",
    [tenant_id, google_id, nome_empresa, email || null, logo_url || null]
  );

    const [rows] = await pool.query<Tenant[]>(
      `
      SELECT
        id,
        tenant_id,
        nome_empresa,
        nome_completo,
        cpf,
        aceitou_termos_em,
        termo_versao,
        logo_url,
        plano,
        email,
        telefone,
        cep,
        logradouro,
        numero,
        complemento,
        cidade,
        estado
      FROM tenants
      WHERE tenant_id = ?
      LIMIT 1
      `,
      [tenant_id]
    );
    return rows[0] || null;
  }

  // ✅ NOVO: Atualiza todos os campos do perfil editável
  export async function updateTenantProfile(
    tenant_id: string,
    data: {
      nome_empresa: string;
      logo_url: string | null;
      cep: string;
      numero: string;
      complemento: string | null;
      cidade: string;
      estado: string;
      logradouro: string;
      bairro: string | null;
    }
  ) {
  await pool.query(
    `
    UPDATE tenants
    SET
      nome_empresa = ?,
      logo_url = ?,
      cep = ?,
      numero = ?,
      complemento = ?,
      cidade = ?,
      estado = ?,
      logradouro = ?,
      bairro = ?
    WHERE tenant_id = ?
  `,
    [
      data.nome_empresa,
      data.logo_url,
      data.cep,
      data.numero,
      data.complemento,
      data.cidade,
      data.estado,
      data.logradouro,
      data.bairro,
      tenant_id,
    ]
  );
}
