// ===============================
// File: src/server/repositories/TenantRepo.ts
// ===============================

import { pool } from "../utils/db";
import type { Tenant } from "../models/Tenant"; // ✅ Fonte de verdade

// Já existente
export async function findTenantById(tenant_id: string) {
  const [rows] = await pool.query<Tenant[]>(
    "SELECT * FROM tenants WHERE tenant_id = ? LIMIT 1",
    [tenant_id]
  );
  return rows[0] || null;
}

// ✅ NOVO: buscar por e-mail
export async function findTenantByEmail(email: string) {
  const [rows] = await pool.query<Tenant[]>(
    "SELECT * FROM tenants WHERE email = ? LIMIT 1",
    [email]
  );
  return rows[0] || null;
}

// ✅ NOVO: buscar por telefone
export async function findTenantByTelefone(telefone: string) {
  const [rows] = await pool.query<Tenant[]>(
    "SELECT * FROM tenants WHERE telefone = ? LIMIT 1",
    [telefone]
  );
  return rows[0] || null;
}

// ✅ NOVO
export async function createTenant(data: {
  tenant_id: string;
  nome_empresa: string;
  senha_hash: string;
}) {
  const { tenant_id, nome_empresa, senha_hash } = data;

  const insertSql = `
    INSERT INTO tenants (tenant_id, nome_empresa, senha_hash)
    VALUES (?, ?, ?)
  `;
  await pool.query(insertSql, [tenant_id, nome_empresa, senha_hash]);

  const [rows] = await pool.query<Tenant[]>(
    "SELECT * FROM tenants WHERE tenant_id = ? LIMIT 1",
    [tenant_id]
  );
  return rows[0];
}

// Atualiza campo plano
export async function updateTenantPlano(tenant_id: string, plano: string) {
  await pool.query("UPDATE tenants SET plano = ? WHERE tenant_id = ?", [plano, tenant_id]);
}

// Registra aceite do termo
export async function salvarAceiteTermo(tenant_id: string, versao: string) {
  await pool.query(
    "UPDATE tenants SET aceitou_termos_em = NOW(), termo_versao = ? WHERE tenant_id = ?",
    [versao, tenant_id]
  );
}

// ✅ NOVO: buscar por Google ID
export async function findTenantByGoogleId(google_id: string) {
  const [rows] = await pool.query<Tenant[]>(
    "SELECT * FROM tenants WHERE google_id = ? LIMIT 1",
    [google_id]
  );
  return rows[0] || null;
}

// ✅ NOVO: criar tenant a partir do Google
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
    "SELECT * FROM tenants WHERE tenant_id = ? LIMIT 1",
    [tenant_id]
  );
  return rows[0];
}
