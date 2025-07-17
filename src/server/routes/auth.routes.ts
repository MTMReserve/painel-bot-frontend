//=================================
// src/server/routes/auth.routes.ts
//=================================

import { Router } from "express";
import {
  loginHandler,
  registerHandler,
  recuperarSenhaHandler,
  googleLoginHandler,
} from "../controllers/authController";

const router = Router();

// 🔐 Login tradicional
router.post("/login", loginHandler);

// 🆕 Cadastro via formulário
router.post("/register", registerHandler);

// ✅ Recuperação de senha
router.post("/recuperar-senha", recuperarSenhaHandler);

// ✅ Login com Google Credential
router.post("/google", googleLoginHandler);

export default router;
