//=================================
//src/server/routes/auth.routes.ts
//=================================

import { Router } from "express";
import {
  loginHandler,
  registerHandler,
  recuperarSenhaHandler,
} from "../controllers/authController";
import passport from "../services/GoogleAuthService";
import type { TenantRow } from "@server/models/Tenant";

const router = Router();

// 🔐 Login tradicional
router.post("/login", loginHandler);

// 🆕 Cadastro via formulário
router.post("/register", registerHandler);

// ✅ Recuperação de senha
router.post("/recuperar-senha", recuperarSenhaHandler);

// ✅ Google OAuth - Início
// Primeiro ponto de entrada — redireciona com tenant_id salvo na sessão
router.get("/auth/google", (req, res, next) => {
  const { tenant_id } = req.query;

  if (!tenant_id || typeof tenant_id !== "string") {
    return res.status(401).json({ error: "Acesso negado. tenant_id ausente ou inválido." });
  }

  // Salva tenant_id temporariamente na sessão
  req.session = req.session || {};
  req.session.tenant_id = tenant_id;

  next();
}, passport.authenticate("google", { scope: ["profile", "email"] }));


// ✅ Google OAuth - Callback
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: true,
  }),
  (req, res) => {
    const { tenant_id } = req.user as TenantRow;
    const redirectUrl = `http://localhost:5173/login-callback?tenant_id=${tenant_id}`;
    return res.redirect(redirectUrl);
  }
);



export default router;
