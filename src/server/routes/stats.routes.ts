//=============================
// src/server/routes/stats.routes.ts
//=============================

import { Router, type Router as ExpressRouter } from "express";
import { getFunnelStats } from "../controllers/statsController";
import { ensureTenantAuthenticated } from "../middlewares/ensureTenantAuthenticated";

export const statsRouter: ExpressRouter = Router();

// ✅ Protege as rotas com middleware
statsRouter.use(ensureTenantAuthenticated);

statsRouter.get("/funnel", getFunnelStats);
