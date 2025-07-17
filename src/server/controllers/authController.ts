// ===============================
// File: src/server/controllers/authController.ts
// ===============================

import { Request, Response } from "express";
import { autenticarTenant, registrarTenant, loginViaGoogleCredential } from "../services/AuthService";
import { enviarEmailRecuperacao } from "../services/recuperacaoService";
import type { LoginRequest } from "../models/Tenant";

// ✅ Login — POST /auth/login
export async function loginHandler(req: Request, res: Response): Promise<Response> {
  try {
    const loginData: LoginRequest = req.body;

    if (!loginData.identificador || !loginData.senha) {
      return res.status(400).json({ error: "Campos obrigatórios: identificador e senha" });
    }

    const tenant = await autenticarTenant(loginData);
    return res.json(tenant);
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "status" in error && "message" in error) {
      return res.status((error as { status: number }).status).json({
        error: (error as { message: string }).message,
      });
    }

    console.error("Erro inesperado:", error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
}

// ✅ Login com Google Credential — POST /auth/google
export async function googleLoginHandler(req: Request, res: Response): Promise<Response> {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({ error: "Credencial JWT do Google não fornecida" });
    }

    const tenant = await loginViaGoogleCredential(credential);
    return res.json(tenant);
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "status" in error && "message" in error) {
      return res.status((error as { status: number }).status).json({
        error: (error as { message: string }).message,
      });
    }

    console.error("Erro inesperado no login Google:", error);
    return res.status(500).json({ error: "Erro interno no login com Google" });
  }
}

// ✅ Cadastro de nova empresa — POST /auth/register
export async function registerHandler(req: Request, res: Response): Promise<Response> {
  try {
    const { tenant_id, senha, nome_empresa } = req.body;

    if (!tenant_id || !senha || !nome_empresa) {
      return res.status(400).json({ error: "Campos obrigatórios: tenant_id, senha, nome_empresa" });
    }

    const novoTenant = await registrarTenant({ tenant_id, senha, nome_empresa });

    return res.status(201).json({
      tenant_id: novoTenant.tenant_id,
      nome_empresa: novoTenant.nome_empresa,
      logo_url: novoTenant.logo_url || undefined,
      plano: novoTenant.plano,
      termo_versao: novoTenant.termo_versao,
      aceitou_termos_em: novoTenant.aceitou_termos_em,
    });
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "status" in error && "message" in error) {
      return res.status((error as { status: number }).status).json({
        error: (error as { message: string }).message,
      });
    }

    console.error("Erro ao cadastrar tenant:", error);
    return res.status(500).json({ error: "Erro interno ao registrar tenant" });
  }
}

// ✅ Recuperação de senha — POST /auth/recuperar-senha
export async function recuperarSenhaHandler(req: Request, res: Response) {
  const { tenant_id, email } = req.body;

  if (!tenant_id || !email) {
    return res.status(400).json({ error: "tenant_id e email são obrigatórios" });
  }

  try {
    await enviarEmailRecuperacao(tenant_id, email);
    return res.json({ message: "E-mail de recuperação enviado" });
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "message" in error) {
      return res.status(400).json({ error: (error as { message: string }).message });
    }

    console.error("Erro inesperado ao recuperar senha:", error);
    return res.status(500).json({ error: "Erro interno ao recuperar senha" });
  }
}
