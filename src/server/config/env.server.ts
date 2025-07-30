// =====================================
// File: src/server/config/env.server.ts
// Usado exclusivamente no back-end
// =====================================

import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

// 🔍 Detecta se está rodando dentro do Jest
const isJest = process.env.JEST_WORKER_ID !== undefined;

// ✅ Recria __dirname de forma compatível com Jest + Node ESM
const __filename = isJest
  ? path.resolve("src/server/config/env.server.ts") // caminho genérico
  : fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

// ✅ Carrega variáveis do .env.server localizado na raiz do monorepo
dotenv.config({
  path: path.resolve(__dirname, "../../../.env.server"),
});

// ✅ Validação explícita e fallback seguros
function getEnv(name: string, fallback?: string): string {
  const value = process.env[name];
  if (value === undefined || value === "") {
    if (fallback !== undefined) return fallback;
    throw new Error(`[env.server.ts] ❌ Variável de ambiente obrigatória ausente: ${name}`);
  }
  return value;
}

// ✅ Exporta variáveis de ambiente padronizadas
export const BACK_ENV = {
  PORT: Number(getEnv("PORT", "3000")),

  DB_HOST: getEnv("DB_HOST", "127.0.0.1"),
  DB_PORT: Number(getEnv("DB_PORT", "3306")),
  DB_USER: getEnv("DB_USER", "root"),
  DB_PASSWORD: getEnv("DB_PASSWORD", ""),
  DB_NAME: getEnv("DB_NAME", "bot_whatsapp"),
};

// ✅ Variáveis do Google OAuth
export const GOOGLE_CLIENT_ID = getEnv("GOOGLE_CLIENT_ID");
export const GOOGLE_CLIENT_SECRET = getEnv("GOOGLE_CLIENT_SECRET");
