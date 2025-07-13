// ==============================
// File: src/client/components/ProductCard.tsx
// ==============================

import type { Product } from "@/types/Product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="border rounded p-4 shadow bg-white space-y-2">
      <h3 className="text-lg font-bold">{product.nome}</h3>
      <p className="text-sm text-gray-600">{product.descricao}</p>
      <p className="text-sm">💲 Preço: {product.preco || "Não informado"}</p>
      <p className="text-sm">📦 Entrega: {product.entrega}</p>
      <p className="text-sm">
        💳 Pagamentos: {product.formas_pagamento.length > 0
          ? product.formas_pagamento.join(", ")
          : "Nenhuma forma definida"}
      </p>
      <p className="text-xs text-gray-400">
        Atualizado em: {new Date(product.updated_at).toLocaleString()}
      </p>
    </div>
  );
}
