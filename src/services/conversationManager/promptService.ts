import ProductService from '../ProductService';

/**
 * Gera um texto de prompt para o bot iniciar ou continuar uma
 * conversa de venda. O conteúdo do prompt depende das metas,
 * categorias e outras informações do produto. O objetivo é adaptar
 * a linguagem e a negociação ao perfil do produto e do cliente.
 */
export async function promptService(productId: number, tenantId: string) {
  const product = await ProductService.getProductById(productId);
  if (product.tenant_id !== tenantId) {
    throw new Error('Produto não pertence ao tenant informado');
  }
  const metas = product.metas_por_etapa
    ? Object.entries(product.metas_por_etapa)
        .map(([etapa, meta]) => `${etapa}: ${meta}`)
        .join('; ')
    : '';
  const categorias = product.categorias?.join(', ') ?? '';
  const formas = product.formasPagamento?.join(', ') ?? '';
  const preco = product.preco !== undefined ? `por R$${product.preco.toFixed(2)}` : '';
  return `Estamos oferecendo o produto "${product.nome}" ${preco}. Categorias: ${categorias}. Formas de pagamento aceitas: ${formas}. Metas de venda: ${metas}. Como posso ajudar?`;
}

export default promptService;