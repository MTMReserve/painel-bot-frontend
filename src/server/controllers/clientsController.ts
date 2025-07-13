// ==============================================
// File: src/server/controllers/clientsController.ts
// ==============================================

import { type Request, type Response } from "express";
import { ClientRepository } from "../repositories/ClientRepository";

// ✅ GET /clients — Lista todos com filtros
export async function getClientsHandler(req: Request, res: Response) {
  const { etapa, status, produto_id, tenant_id } = req.query;

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
}

// ✅ GET /clients/:id — Busca um cliente específico com mensagens
export async function getClientByIdHandler(req: Request, res: Response) {
  const { id } = req.params;
  const { tenant_id } = req.query;

  if (!tenant_id || typeof tenant_id !== "string") {
    return res.status(400).json({ error: "tenant_id é obrigatório na query string" });
  }

  try {
    const cliente = await ClientRepository.findByIdWithMessages(Number(id), tenant_id);

    if (!cliente) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }

    return res.json(cliente);
  } catch (error) {
    console.error(`[GET /clients/${id}]`, error);
    return res.status(500).json({ error: "Erro ao buscar cliente" });
  }
}
