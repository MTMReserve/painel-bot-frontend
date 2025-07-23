// ===============================
// File: src/server/controllers/authController.ts
// ===============================

import { Request, Response } from "express";
import { autenticarTenant, registrarTenant, loginViaGoogleCredential } from "../services/AuthService";
import { enviarEmailRecuperacao } from "../services/recuperacaoService";
import type { LoginRequest } from "../models/Tenant";
import { pool } from "../utils/db"; // ✅ Import necessário

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

// ✅ Verificar disponibilidade de tenant_id — GET /auth/check-tenant-id
export async function checkTenantIdAvailability(req: Request, res: Response) {
  const { tenant_id } = req.query;

  if (!tenant_id || typeof tenant_id !== "string") {
    return res.status(400).json({ error: "Parâmetro tenant_id é obrigatório" });
  }

  try {
    const [rows] = await pool.query(
      "SELECT COUNT(*) as total FROM tenants WHERE tenant_id = ?",
      [tenant_id]
    );

    const count = (rows as { total: number }[])[0].total;

    return res.status(200).json({ available: count === 0 });
  } catch (err) {
    console.error("Erro ao verificar tenant_id:", err);
    return res.status(500).json({ error: "Erro interno ao verificar tenant_id" });
  }
}

// ✅ Verificar existência de dados — POST /auth/verificar-existencia
export async function verificarExistenciaHandler(req: Request, res: Response) {
  const { cpf, email, telefone, tenant_id } = req.body;

  const resultados: Record<string, boolean> = {};

  try {
    if (cpf) {
      const [rows] = await pool.query("SELECT id FROM tenants WHERE cpf = ? LIMIT 1", [cpf]);
      resultados.cpf = Array.isArray(rows) && rows.length > 0;
    }

    if (email) {
      const [rows] = await pool.query("SELECT id FROM tenants WHERE email = ? LIMIT 1", [email]);
      resultados.email = Array.isArray(rows) && rows.length > 0;
    }

    if (telefone) {
      const [rows] = await pool.query("SELECT id FROM tenants WHERE telefone = ? LIMIT 1", [telefone]);
      resultados.telefone = Array.isArray(rows) && rows.length > 0;
    }

    if (tenant_id) {
      const [rows] = await pool.query("SELECT id FROM tenants WHERE tenant_id = ? LIMIT 1", [tenant_id]);
      resultados.tenant_id = Array.isArray(rows) && rows.length > 0;
    }

    return res.json(resultados);
  } catch (error) {
    console.error("Erro ao verificar existência:", error);
    return res.status(500).json({ error: "Erro interno ao verificar existência." });
  }
}
