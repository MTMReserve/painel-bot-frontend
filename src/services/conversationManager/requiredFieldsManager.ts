import ProductService from '../ProductService';

/**
 * Gerencia os campos obrigatórios de uma conversa de venda. Em vez
 * de acessar um mapa estático (produtoMap), esta função busca o
 * produto diretamente no banco de dados através do ProductService.
 */
export async function requiredFieldsManager(productId: number, tenantId: string) {
  const product = await ProductService.getProductById(productId);
  if (product.tenant_id !== tenantId) {
    throw new Error('Produto não pertence ao tenant informado');
  }
  // Determina campos obrigatórios com base nas metas definidas.
  const required = product.metas_por_etapa
    ? Object.keys(product.metas_por_etapa)
    : [];
  return {
    requiredFields: required,
    product,
  };
}

export default requiredFieldsManager;