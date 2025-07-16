// ===============================
// File: src/server/services/AuthService.ts
// ===============================

import bcrypt from "bcrypt";
import axios from "axios";
import {
  findTenantById,
  findTenantByEmail,
  findTenantByTelefone,
  createTenant
} from "../repositories/TenantRepo";
import type { LoginRequest, SafeTenant } from "../models/Tenant";

export async function autenticarTenant(login: LoginRequest): Promise<SafeTenant> {
  const { identificador, senha } = login;

  let tenant = null;

  // Detectar tipo de identificador
  if (/^\+?\d{10,15}$/.test(identificador)) {
    tenant = await findTenantByTelefone(identificador);
  } else if (/^[\w-.]+@[\w-]+\.[\w-.]+$/.test(identificador)) {
    tenant = await findTenantByEmail(identificador);
  } else {
    tenant = await findTenantById(identificador);
  }

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

// 🔁 Login com conta Google OAuth
export async function loginViaGoogle(code: string): Promise<SafeTenant> {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = `${process.env.API_BASE_URL}/auth/google/callback`;

  const tokenResp = await axios.post("https://oauth2.googleapis.com/token", null, {
    params: {
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code"
    },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });

  const { id_token } = tokenResp.data;

  const userInfoResp = await axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${id_token}`);
  const email = userInfoResp.data.email;
  const nome = userInfoResp.data.name || email.split("@")[0];

  const tenantId = email.split("@")[0].replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

  let tenant = await findTenantById(tenantId);

  if (!tenant) {
    const senhaAleatoria = Math.random().toString(36).slice(-8);
    const senha_hash = await bcrypt.hash(senhaAleatoria, 10);

    tenant = await createTenant({
      tenant_id: tenantId,
      nome_empresa: nome,
      senha_hash
    });
  }

  return {
    tenant_id: tenant.tenant_id,
    nome_empresa: tenant.nome_empresa,
    logo_url: tenant.logo_url || undefined,
    token: tenant.tenant_id
  };
}
