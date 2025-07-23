import { type RequestHandler } from "express";
import {
  getTenantProfile,
  updatePlano,
  getTermoAtual,
  registrarAceite,
  updateNomeEmpresa
} from "../services/tenantService";
import type { AuthenticatedRequest } from "../types/Express";

// ✅ GET /tenant/me — retorna perfil completo
export const getTenantProfileHandler: RequestHandler = async (req, res) => {
  const { tenant_id } = req as AuthenticatedRequest;
  const perfil = await getTenantProfile(tenant_id);
  return res.json(perfil);
};

// ✅ PUT /tenant/me — atualiza apenas o nome da empresa (novo)
export const updateTenantProfileHandler: RequestHandler = async (req, res) => {
  const { tenant_id } = req as AuthenticatedRequest;
  const { nome_empresa } = req.body;

  if (!nome_empresa || typeof nome_empresa !== "string" || nome_empresa.trim().length < 2) {
    return res.status(400).json({ error: "Nome da empresa inválido" });
  }

  await updateNomeEmpresa(tenant_id, nome_empresa.trim());
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
