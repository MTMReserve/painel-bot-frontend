// ===============================
// File: src/server/types/Express.d.ts
// ===============================

import type { Request } from "express";

/** Permite acessar req.tenant_id injetado pelo middleware */
export interface AuthenticatedRequest extends Request {
  tenant_id: string;
}
