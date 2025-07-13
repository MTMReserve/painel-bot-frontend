//=============================
// src/server/routes/stats.routes.ts
//=============================

import { Router, type Router as ExpressRouter } from "express";
import { getFunnelStats } from "../controllers/statsController";

export const statsRouter: ExpressRouter = Router();

statsRouter.get("/funnel", getFunnelStats);
