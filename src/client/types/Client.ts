// ===============================
// File: src/client/types/Client.ts
// ===============================

/**
 * Tipagem dos dados básicos de um cliente no sistema.
 * Representa tanto clientes listados quanto detalhes individuais.
 */

import type { EtapaFunil } from "@client/config/constants";

/**
 * Representa uma mensagem da conversa do cliente.
 */
export interface Mensagem {
  id: string;
  texto: string;
  tipo: "enviada" | "recebida";
  timestamp: string;
}

/**
 * Representa um cliente no funil de vendas.
 */
export interface Client {
  id: number;
  name: string;
  phone: string;
  current_state: EtapaFunil;

  etapa?: string | null;
  produto_id?: string | null;
  criado_em?: string;

  email?: string | null;
  necessidades?: string | null;

  forma_pagamento?: string | null;
  budget?: string | null;
  negotiated_price?: string | null;

  /** Status operacional do cliente (vindo do back-end) */
  status?: "aberta" | "fechada" | "perdida" | null;

  /** Temperatura do lead para vendas */
  temperatura?: "quente" | "morno" | "frio" | null;

  /** Tentativas de reentrada após encerramento */
  retries?: number;

  /** Flag que indica se a conversa foi finalizada */
  conversa_finalizada?: boolean;

  /** Histórico de mensagens (se solicitado via /clients/:id) */
  mensagens?: Mensagem[];
}
