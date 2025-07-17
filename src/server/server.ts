// ========================
// File: src/server/server.ts
// ========================

import express from "express";
import cors from "cors";
import { statsRouter } from "./routes/stats.routes";
import { clientsRouter } from "./routes/clients.routes";
import  authRouter from "./routes/auth.routes";
import { tenantRouter } from "./routes/tenant.routes";  
import { BACK_ENV } from "./config/env.server";
import session from "cookie-session";


const app = express();

app.use(cors());
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
