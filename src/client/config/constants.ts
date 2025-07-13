// ===============================
// File: src/config/constants.ts
// ===============================

/**
 * Constantes reutilizáveis no painel do bot.
 * Incluem status, etapas, cores e rótulos fixos.
 */

// Etapas reais do funil (em ordem de progressão)
export const ETAPAS_FUNIL = [
  "entrada",
  "abordagem",
  "levantamento",
  "proposta",
  "objecoes",
  "negociacao",
  "fechamento",
  "pos_venda",
  "reativacao",
  "encerramento",
] as const;

export type EtapaFunil = typeof ETAPAS_FUNIL[number];

// Cores padrão por etapa (para cards, kanban, etc.)
export const ETAPA_CORES: Record<EtapaFunil, string> = {
  entrada: "bg-blue-100",
  abordagem: "bg-blue-200",
  levantamento: "bg-yellow-100",
  proposta: "bg-green-100",
  objecoes: "bg-red-100",
  negociacao: "bg-orange-100",
  fechamento: "bg-purple-100",
  pos_venda: "bg-gray-100",
  reativacao: "bg-pink-100",
  encerramento: "bg-gray-300",
};

// Status genéricos de clientes (ex: usados em filtros)
export const STATUS_CLIENTE = ["ativo", "em análise", "fechado", "perdido"] as const;
export type StatusCliente = (typeof STATUS_CLIENTE)[number];

// API fallback (caso .env falhe)
export const DEFAULT_API_URL = "http://localhost:3000";
