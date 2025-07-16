// ==============================================
// File: src/server/controllers/clientsController.ts
// ==============================================

import { type Response, type RequestHandler } from "express";
import { ClientRepository } from "../repositories/ClientRepository";
import type { AuthenticatedRequest } from "../types/Express"; // ✅ NOVO

// ✅ GET /clients — Lista todos com filtros
export const getClientsHandler: RequestHandler = async (req, res: Response) => {
  const { etapa, status, produto_id } = req.query;
  const tenant_id = (req as AuthenticatedRequest).tenant_id;

  if (!tenant_id || typeof tenant_id !== "string") {
    return res.status(400).json({ error: "tenant_id é obrigatório na query string" });
  }

  try {
    const clients = await ClientRepository.findAll({
      tenant_id,
      etapa: etapa as string | undefined,
      status: status as string | undefined,
      produto_id: produto_id as string | undefined,
    });

    return res.json(clients);
  } catch (error) {
    console.error("[GET /clients]", error);
    return res.status(500).json({ error: "Erro ao buscar clientes" });
  }
};

// ✅ GET /clients/:id — Busca um cliente específico com mensagens
export const getClientByIdHandler: RequestHandler = async (req, res: Response) => {
  const { id } = req.params;
  const tenant_id = (req as AuthenticatedRequest).tenant_id;

  if (!tenant_id || typeof tenant_id !== "string") {
    return res.status(400).json({ error: "tenant_id é obrigatório na query string" });
  }

  try {
    const cliente = await ClientRepository.findByIdWithMessages(Number(id), tenant_id);

    if (!cliente) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }

    // ✅ Mapeamento final para corresponder ao schema Zod
    const resposta = {
      ...cliente,
      etapa: cliente.current_state,
      criado_em: cliente.created_at?.toISOString?.() || cliente.created_at,
    };

    return res.json(resposta);
  } catch (error) {
    console.error(`[GET /clients/${id}]`, error);
    return res.status(500).json({ error: "Erro ao buscar cliente" });
  }
};
