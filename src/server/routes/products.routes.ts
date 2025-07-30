// ==============================
// File: src/server/routes/products.routes.ts
// ==============================

import { Router } from "express";
import {
  createProductHandler,
  getAllProductsHandler,
  getProductByIdHandler,
  updateProductHandler,
} from "../controllers/productController";
import { ensureTenantAuthenticated } from "../middlewares/ensureTenantAuthenticated";

const router = Router();

// ✅ Todas as rotas exigem tenant_id autenticado
router.use(ensureTenantAuthenticated);

// ✅ Rotas sem prefixo duplicado
router.post("/", createProductHandler);
router.get("/", getAllProductsHandler);
router.get("/:id", getProductByIdHandler);
router.put("/:id", updateProductHandler);

export default router;
