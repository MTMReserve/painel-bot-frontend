/**
 * Interface que define a estrutura de um produto no banco de dados.
 * No back‑end usamos esta interface para tipar objetos que transitam
 * entre as camadas de serviço e repositório.
 */
export interface Product {
  id?: number;
  tenant_id: string;
  nome: string;
  descricao?: string;
  preco?: number;
  categorias?: string[];
  formasPagamento?: string[];
  metas_por_etapa?: {
    [etapa: string]: number;
  };
  dataOpcional?: any;
}

export default Product;