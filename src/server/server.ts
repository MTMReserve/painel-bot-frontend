// ========================
// File: src/server/server.ts
// ========================

import express from "express";
import cors from "cors";
import { statsRouter } from "./routes/stats.routes";
import { clientsRouter } from "./routes/clients.routes"; // ✅ importação do router
import { BACK_ENV } from "./config/env.server";

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Registro dos routers
app.use("/stats", statsRouter);
app.use("/clients", clientsRouter); // ✅ registra o router com prefixo

app.listen(BACK_ENV.PORT, () => {
  console.log(`[PAINEL API] ✅ Rodando em http://localhost:${BACK_ENV.PORT}`);
});
