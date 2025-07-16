// ==========================================
// File: src/client/types/ClientResponse.ts
// ==========================================

import type { EtapaFunil } from "@client/config/constants";

export type Mensagem = {
  id: string;
  texto: string;
  timestamp: string;
  tipo: "enviada" | "recebida";
};

export interface ClientResponse {
  id: number;
  name: string | null;
  phone: string | null;
  email: string | null;

  current_state: EtapaFunil | null;
  etapa: string | null;
  produto_id: string | null;
  criado_em: string | null;

  necessidades?: string | null;
  forma_pagamento?: string | null;
  budget?: string | null;
  negotiated_price?: string | null;

  status?: "aberta" | "fechada" | "perdida" | null;
  temperatura?: "quente" | "morno" | "frio" | null;

  conversa_finalizada?: boolean;
  retries?: number;

  mensagens: Mensagem[];
}
