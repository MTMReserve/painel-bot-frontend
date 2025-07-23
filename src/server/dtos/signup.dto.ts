// ===============================
// File: src/server/dtos/signup.dto.ts
// ===============================

import { z } from "zod";
import { signupSchema } from "../schemas/signupSchema";

// Request vinda do front-end
export type SignupRequest = z.infer<typeof signupSchema>;

// Resposta segura enviada ao front após cadastro
export interface SignupResponse {
  tenant_id: string;
  nome_empresa: string;
  logo_url?: string;
  plano?: string;
  termo_versao?: string;
  aceitou_termos_em?: string;
  token?: string; // se futuramente for usar JWT
}
