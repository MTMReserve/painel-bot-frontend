// ===========================================
// File: src/server/routes/tenant.routes.ts
// ===========================================

import { Router } from "express";
import {
  getTenantProfileHandler,
  updatePlanoHandler,
  getTermoAtualHandler,
  registrarAceiteHandler
} from "../controllers/tenantController";
import { ensureTenantAuthenticated } from "../middlewares/ensureTenantAuthenticated";

export const tenantRouter = Router();

tenantRouter.use(ensureTenantAuthenticated);

tenantRouter.get("/tenant/me", getTenantProfileHandler);
tenantRouter.put("/tenant/me", updatePlanoHandler);
tenantRouter.get("/tenant/termos", getTermoAtualHandler);
tenantRouter.post("/tenant/aceite", registrarAceiteHandler);
