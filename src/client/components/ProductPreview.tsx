import React from 'react';
import type { Product } from '../types/Product';

interface ProductPreviewProps {
  product: Product;
}

/**
 * Componente responsável por exibir um resumo do produto após ele
 * ser salvo. Ele apresenta as informações de maneira legível para o
 * cliente B2B revisar, utilizando simples elementos HTML. Este
 * componente é isolado para facilitar testes e reutilização.
 */
export const ProductPreview: React.FC<ProductPreviewProps> = ({ product }) => {
  if (!product) return null;
  return (
    <div className="border rounded p-4 bg-white shadow">
      <h2 className="text-xl font-bold mb-2">Preview do Produto</h2>
      <p>
        <strong>ID:</strong> {product.id}
      </p>
      <p>
        <strong>Nome:</strong> {product.nome}
      </p>
      {product.descricao && (
        <p>
          <strong>Descrição:</strong> {product.descricao}
        </p>
      )}
      {typeof product.preco !== 'undefined' && (
        <p>
          <strong>Preço:</strong> R$ {product.preco.toFixed(2)}
        </p>
      )}
      {product.categorias && product.categorias.length > 0 && (
        <p>
          <strong>Categorias:</strong> {product.categorias.join(', ')}
        </p>
      )}
      {product.formasPagamento && product.formasPagamento.length > 0 && (
        <p>
          <strong>Formas de Pagamento:</strong> {product.formasPagamento.join(', ')}
        </p>
      )}
      {product.metas_por_etapa && Object.keys(product.metas_por_etapa).length > 0 && (
        <div>
          <strong>Metas por Etapa:</strong>
          <ul className="list-disc list-inside">
            {Object.entries(product.metas_por_etapa).map(([etapa, meta]) => (
              <li key={etapa}>
                {etapa}: {meta}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductPreview;