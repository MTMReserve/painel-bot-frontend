export interface Product {
  /**
   * Identificador único do produto. Este campo é opcional na criação
   * porque o banco de dados gerará um ID automaticamente. No retorno
   * da API, ele estará presente.
   */
  id?: number;
  /**
   * Identificador do tenant (empresa ou barbearia) ao qual o produto
   * pertence. Isso garante que cada B2B só visualize e edite seus
   * próprios produtos.
   */
  tenant_id: string;
  /**
   * Nome comercial do produto. Este campo é obrigatório e não pode
   * ficar em branco.
   */
  nome: string;
  /**
   * Texto de descrição do produto. Pode conter detalhes como sabor,
   * tamanho ou qualquer informação adicional útil para o cliente.
   */
  descricao?: string;
  /**
   * Preço sugerido de venda. Opcional porque alguns produtos podem
   * trabalhar com negociação dinâmica via bot. Quando definido,
   * deve ser um número positivo.
   */
  preco?: number;
  /**
   * Categorias de classificação (por exemplo: "cabelo", "barba",
   * "produtos", etc.). Usadas para facilitar filtros e exibição no
   * painel. Ao menos uma categoria deve ser fornecida.
   */
  categorias?: string[];
  /**
   * Lista das formas de pagamento aceitas para este produto.
   * Exemplos: "dinheiro", "cartão de crédito", "cartão de débito",
   * "PIX". Pelo menos uma forma deve ser definida.
   */
  formasPagamento?: string[];
  /**
   * Metas de vendas por etapa do funil. A chave representa a etapa
   * (ex.: "descoberta", "consideracao", "fechamento") e o valor
   * indica a meta quantitativa para aquela etapa. Estes valores
   * auxiliam o bot na criação de mensagens e follow‑ups.
   */
  metas_por_etapa?: {
    [etapa: string]: number;
  };
  /**
   * Campo genérico para acomodar dados opcionais que venham a ser
   * necessários no futuro (por exemplo, "cores disponíveis", "tamanho",
   * etc.). O tipo "any" permite flexibilidade, mas deve ser usado
   * com parcimônia para evitar inconsistências.
   */
  dataOpcional?: any;
}

export default Product;