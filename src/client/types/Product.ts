// ===============================
// File: src/client/types/Product.ts
// ===============================

/**
 * Tipagem oficial do produto no front-end.
 * Derivado do back-end, adaptado para uso com React (strings em datas, sem tenant_id).
 * Usado em hooks, componentes, filtros e telas de visualização.
 */

export type FormaPagamento =
  | 'pix'
  | 'debito'
  | 'credito'
  | 'boleto'
  | 'dinheiro'
  | 'transferencia'
  | 'link_pagamento'
  | 'outros';

export type TipoEntrega =
  | 'retirada'
  | 'envio'
  | 'digital'
  | 'servico_local'
  | 'visita_cliente'
  | 'outros';

export interface Product {
  id: string;
  nome: string;
  descricao: string;
  preco: string;
  formas_pagamento: FormaPagamento[];
  instrucoes_pagamento: string;
  entrega: TipoEntrega;
  instrucoes_entrega: string;
  campos_obrigatorios: string[]; // Ex: ['cpf', 'forma_pagamento']
  created_at: string; // ISO 8601 (ex: 2025-07-11T13:00:00Z)
  updated_at: string;
}
