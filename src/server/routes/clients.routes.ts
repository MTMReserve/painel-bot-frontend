// ======================================
// File: src/server/routes/clients.routes.ts
// ======================================

import { Router } from "express";
import {
  getClientsHandler,
  getClientByIdHandler, // ✅ Novo import
} from "../controllers/clientsController";

export const clientsRouter: Router = Router();

clientsRouter.get("/", getClientsHandler);
clientsRouter.get("/:id", getClientByIdHandler); // ✅ Nova rota
