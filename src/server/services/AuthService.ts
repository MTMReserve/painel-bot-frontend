// ===============================
// File: src/server/services/AuthService.ts
// ===============================

import bcrypt from "bcrypt";
import axios from "axios";
import {
  findTenantById,
  findTenantByEmail,
  findTenantByTelefone,
  findTenantByGoogleId,
  createTenant,
  createTenantFromGoogle,
} from "../repositories/TenantRepo";
import type { LoginRequest, SafeTenant } from "../models/Tenant";

export async function autenticarTenant(login: LoginRequest): Promise<SafeTenant> {
  const { identificador, senha } = login;

  // Tenta localizar o tenant por telefone, email ou tenant_id
  const [porTelefone, porEmail, porTenantId] = await Promise.all([
    findTenantByTelefone(identificador),
    findTenantByEmail(identificador),
    findTenantById(identificador)
  ]);

  const tenant = porTelefone || porEmail || porTenantId;

  if (!tenant) {
    throw { status: 404, message: "Empresa não encontrada" };
  }

  const senhaValida = await bcrypt.compare(senha, tenant.senha_hash);
  if (!senhaValida) {
    throw { status: 401, message: "Credenciais inválidas" };
  }

  return {
    tenant_id: tenant.tenant_id,
    nome_empresa: tenant.nome_empresa,
    logo_url: tenant.logo_url || undefined,
    plano: tenant.plano,
    termo_versao: tenant.termo_versao,
    aceitou_termos_em: tenant.aceitou_termos_em,
    token: tenant.tenant_id
  };
}

export async function registrarTenant(data: {
  tenant_id: string;
  nome_empresa: string;
  senha: string;
}): Promise<SafeTenant> {
  const existente = await findTenantById(data.tenant_id);
  if (existente) {
    throw { status: 409, message: "Empresa já cadastrada" };
  }

  const senha_hash = await bcrypt.hash(data.senha, 10);
  const novo = await createTenant({
    tenant_id: data.tenant_id,
    nome_empresa: data.nome_empresa,
    senha_hash
  });

  return {
    tenant_id: novo.tenant_id,
    nome_empresa: novo.nome_empresa,
    logo_url: novo.logo_url || undefined,
    token: novo.tenant_id
  };
}

// ✅ Login com Google Credential JWT direto do front (via botão GoogleLogin)
export async function loginViaGoogleCredential(credential: string): Promise<SafeTenant> {
  const tokeninfoUrl = `https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`;
  const { data } = await axios.get(tokeninfoUrl);

  const google_id = data.sub;
  const email = data.email;
  const nome = data.name || email.split("@")[0];
  const logo_url = data.picture || undefined;

  if (!google_id || !email) {
    throw { status: 400, message: "Credenciais do Google inválidas" };
  }

  let tenant = await findTenantByGoogleId(google_id);

  if (!tenant) {
    tenant = await createTenantFromGoogle({
      google_id,
      nome_empresa: nome,
      email,
      logo_url
    });
  }

  return {
    tenant_id: tenant.tenant_id,
    nome_empresa: tenant.nome_empresa,
    logo_url: tenant.logo_url || undefined,
    plano: tenant.plano,
    termo_versao: tenant.termo_versao,
    aceitou_termos_em: tenant.aceitou_termos_em,
    token: tenant.tenant_id
  };
}
