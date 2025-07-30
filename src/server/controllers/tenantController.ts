//===========================================
//src/server/controllers/tenantController.ts
//===========================================

import { type RequestHandler } from "express";
import {
  getTenantProfile,
  updatePlano,
  getTermoAtual,
  registrarAceite,
  updateTenantProfile 
} from "../services/tenantService";
import type { AuthenticatedRequest } from "../types/Express";
import { tenantProfileUpdateSchema } from "../schemas/tenantProfileSchema"; // ✅ Importação do novo schema

// ✅ GET /tenant/me — retorna perfil completo
export const getTenantProfileHandler: RequestHandler = async (req, res) => {
  const { tenant_id } = req as AuthenticatedRequest;
  const perfil = await getTenantProfile(tenant_id);
  return res.json(perfil);
};

// ✅ PUT /tenant/me — atualiza o perfil do tenant (completo)
export const updateTenantProfileHandler: RequestHandler = async (req, res) => {
  const { tenant_id } = req as AuthenticatedRequest;

  const parseResult = tenantProfileUpdateSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({
      error: "Dados inválidos",
      detalhes: parseResult.error.flatten(),
    });
  }

  await updateTenantProfile(tenant_id, parseResult.data);
  return res.status(204).send();
};

// ✅ PUT /tenant/plano — troca o plano
export const updatePlanoHandler: RequestHandler = async (req, res) => {
  const { tenant_id } = req as AuthenticatedRequest;
  const { plano } = req.body;

  if (!plano) return res.status(400).json({ error: "Plano é obrigatório" });

  await updatePlano(tenant_id, plano);
  return res.status(204).send();
};

// ✅ GET /tenant/termos — retorna o termo atual
export const getTermoAtualHandler: RequestHandler = async (_req, res) => {
  const termo = await getTermoAtual();
  return res.json(termo);
};

// ✅ POST /tenant/aceite — registra aceite do contrato
export const registrarAceiteHandler: RequestHandler = async (req, res) => {
  const { tenant_id } = req as AuthenticatedRequest;
  const { versao } = req.body;

  if (!versao) return res.status(400).json({ error: "Versão do termo é obrigatória" });

  await registrarAceite(tenant_id, versao);
  return res.status(204).send();
};
