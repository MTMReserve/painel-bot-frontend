//====================================
// src/controllers/statsController.ts
//====================================

import type { Request, Response } from "express";
import { pool } from "../utils/db";

export async function getFunnelStats(req: Request, res: Response) {
  console.log("[GET] /stats/funnel chamado com:", req.query); // ✅ Log de debug

  const tenant_id = req.query.tenant_id as string;

  if (!tenant_id) {
    return res.status(400).json({ error: "tenant_id é obrigatório na query string" });
  }

  try {
    const [rows] = await pool.query(
      `
      SELECT current_state AS etapa, COUNT(*) AS total
      FROM clients
      WHERE tenant_id = ?
      GROUP BY current_state
      `,
      [tenant_id]
    );

    res.json(rows);
  } catch (error) {
    console.error("[getFunnelStats] Erro:", error);
    res.status(500).json({ error: "Erro ao buscar dados do funil" });
  }
}
