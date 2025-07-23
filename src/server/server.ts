// ========================
// File: src/server/server.ts
// ========================

import express from "express";
import cors from "cors";
import { statsRouter } from "./routes/stats.routes";
import { clientsRouter } from "./routes/clients.routes";
import authRouter from "./routes/auth.routes";
import { tenantRouter } from "./routes/tenant.routes";
import { BACK_ENV } from "./config/env.server";
import session from "cookie-session";

const app = express();

// ✅ Middleware CORS com origem liberada para o front-end local
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// ✅ Middleware obrigatório para interpretar JSON
app.use(express.json());

app.use(
  session({
    name: "session",
    keys: ["secretkey123"],
    maxAge: 24 * 60 * 60 * 1000,
  })
);

// ✅ Registro dos routers
app.use("/stats", statsRouter);
app.use("/clients", clientsRouter);
app.use("/auth", authRouter);
app.use(tenantRouter);

app.listen(BACK_ENV.PORT, () => {
  console.log(`[PAINEL API] ✅ Rodando em http://localhost:${BACK_ENV.PORT}`);
});


export { app };