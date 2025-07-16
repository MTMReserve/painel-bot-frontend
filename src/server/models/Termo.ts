// ===============================
// File: src/server/models/Termo.ts
// ===============================

import type { RowDataPacket } from "mysql2";

export interface Termo extends RowDataPacket {
  id: number;
  versao: string;
  conteudo_md: string;
  ativo: boolean;
  criado_em: string;
}
