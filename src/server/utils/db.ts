// ========================
// File: src/utils/db.ts
// ========================

import mysql from "mysql2/promise";
import dotenv from "dotenv";

// ✅ Carrega variáveis do .env.server
dotenv.config({ path: ".env.server" });

// ✅ Detecta ambiente de teste
const isTest = process.env.NODE_ENV === "test";

// ✅ Cria pool condicional: teste ou produção
export const pool = isTest
  ? mysql.createPool({
      uri: process.env.DATABASE_URL_TEST,
    })
  : mysql.createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

