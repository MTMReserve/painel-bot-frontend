import ProductService from '../ProductService';

/**
 * Gera um checklist de fechamento de venda com base no produto
 * selecionado. Este checklist pode incluir itens como confirmar
 * quantidade mínima, formas de pagamento disponíveis e metas por
 * etapa. O uso do ProductService garante que as informações estejam
 * atualizadas no banco de dados.
 */
export async function checklistFechamento(productId: number, tenantId: string) {
  const product = await ProductService.getProductById(productId);
  if (product.tenant_id !== tenantId) {
    throw new Error('Produto não pertence ao tenant informado');
  }
  const checklist: string[] = [];
  if (product.metas_por_etapa) {
    checklist.push(
      ...Object.entries(product.metas_por_etapa).map(
        ([etapa, meta]) => `Confirmar meta de ${etapa}: ${meta}`,
      ),
    );
  }
  if (product.formasPagamento && product.formasPagamento.length > 0) {
    checklist.push(
      `Confirmar formas de pagamento: ${product.formasPagamento.join(', ')}`,
    );
  }
  if (product.preco !== undefined) {
    checklist.push(`Confirmar preço: R$ ${product.preco.toFixed(2)}`);
  }
  return checklist;
}

export default checklistFechamento;