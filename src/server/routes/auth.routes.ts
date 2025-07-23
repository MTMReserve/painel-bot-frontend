//=================================
// src/server/routes/auth.routes.ts
//=================================

import { Router } from "express";
import {
  loginHandler,
  registerHandler,
  recuperarSenhaHandler,
  googleLoginHandler,
  checkTenantIdAvailability,
  verificarExistenciaHandler, // ✅ Nova importação
} from "../controllers/authController";

import { signupHandler } from "../controllers/signupController";

const router = Router();

// 🔐 Login tradicional
router.post("/login", loginHandler);

// 🆕 Cadastro via formulário antigo
router.post("/register", registerHandler);

// 🆕 Cadastro completo com todos os campos (novo fluxo)
router.post("/signup", signupHandler);

// ✅ Recuperação de senha
router.post("/recuperar-senha", recuperarSenhaHandler);

// ✅ Login com Google Credential
router.post("/google", googleLoginHandler);

// ✅ Verificação de disponibilidade do tenant_id
router.get("/check-tenant-id", checkTenantIdAvailability);

// ✅ Verificação de existência de cpf, email, telefone ou tenant_id
router.post("/verificar-existencia", verificarExistenciaHandler); // ✅ Nova rota adicionada

export default router;
