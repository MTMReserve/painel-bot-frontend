// ==========================================
// File: src/server/middlewares/ensureTenantAuthenticated.ts
// ==========================================

import type { Request, Response, NextFunction } from "express";
import type { AuthenticatedRequest } from "../types/Express";

/**
 * Middleware que verifica se o tenant_id está presente no body, query ou headers.
 * Injeta o tenant_id em `req.tenant_id` para uso posterior.
 */
export function ensureTenantAuthenticated(req: Request, res: Response, next: NextFunction) {
  const tenant_id =
    (req.query.tenant_id as string) ||
    (req.body?.tenant_id as string) ||
    (req.headers["x-tenant-id"] as string); // opcional para requisições com header

  if (!tenant_id || typeof tenant_id !== "string") {
    return res.status(401).json({ error: "Acesso negado. tenant_id ausente ou inválido." });
  }

  // Injetando no tipo AuthenticatedRequest
  (req as AuthenticatedRequest).tenant_id = tenant_id;

  return next();
}
