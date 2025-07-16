// ======================================
// File: src/server/routes/clients.routes.ts
// ======================================

import { Router } from "express";
import {
  getClientsHandler,
  getClientByIdHandler,
} from "../controllers/clientsController";
import { ensureTenantAuthenticated } from "../middlewares/ensureTenantAuthenticated";

export const clientsRouter: Router = Router();

// ✅ Protege as rotas com middleware
clientsRouter.use(ensureTenantAuthenticated);

clientsRouter.get("/", getClientsHandler);
clientsRouter.get("/:id", getClientByIdHandler); // ✅ Nova rota
