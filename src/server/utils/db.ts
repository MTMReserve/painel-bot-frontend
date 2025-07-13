// ========================
// File: src/utils/db.ts
// ========================
import mysql from "mysql2/promise";
import { BACK_ENV } from "../config/env.server";

export const pool = mysql.createPool({
  host: BACK_ENV.DB_HOST,
  port: BACK_ENV.DB_PORT,
  user: BACK_ENV.DB_USER,
  password: BACK_ENV.DB_PASSWORD,
  database: BACK_ENV.DB_NAME,
});
