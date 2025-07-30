// ==============================
// File: src/server/models/Product.ts
// ==============================

export type FormaPagamento = 'pix' | 'debito' | 'credito' | 'boleto' | 'dinheiro';
export type TipoEntrega = 'retirada' | 'envio' | 'digital' | 'no_local';

export interface Negociacao {
  preco_base: number;
  desconto_pix: number; // Ex: 0.1 = 10%
  preco_com_desconto: number;
  condicao_para_desconto: string;
  observacoes?: string;
}

export interface Product {
  id: string;
  tenant_id: string;

  nome: string;
  descricao: string;
  preco: string;
  promocao?: string;
  garantias?: string;
  beneficios?: string[]; // lista de strings

  formasPagamento: FormaPagamento[];
  instrucoesPagamento?: string;

  negociacao?: Negociacao;

  entrega?: TipoEntrega;
  instrucoesEntrega?: string;
  local_realizacao?: string;
  requires_address?: boolean;

  definicaoFechamento: string;
  camposObrigatoriosFechamento: string[];

  categoria?: string;
  tags?: string[];

  created_at?: Date;
  updated_at?: Date;
}
