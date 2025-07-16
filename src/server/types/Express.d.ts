// ===============================
// File: src/server/types/Express.d.ts
// ===============================

import type { Request } from "express";
import type { TenantRow } from "@server/models/Tenant";

/** Permite usar req.user tipado pelo Passport */
declare global {
  namespace Express {
    interface User extends TenantRow {
      isGoogleLogin?: boolean; // ✅ Propriedade opcional para evitar lint e manter extensível
    }
  }
}

/** Permite acessar req.tenant_id injetado pelo middleware */
export interface AuthenticatedRequest extends Request {
  tenant_id: string;
}
