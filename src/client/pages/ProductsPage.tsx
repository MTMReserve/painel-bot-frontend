// ==============================
// File: src/client/pages/ProductsPage.tsx
// ==============================

import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "@/components/ProductCard";

export default function ProductsPage() {
  const { data, isLoading, isError } = useProducts();

  return (
    <section className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Produtos Cadastrados</h2>

      {isLoading && <p>Carregando produtos...</p>}
      {isError && (
        <p className="text-red-600">
          Erro ao buscar produtos. Verifique se você está logado ou se o tenant está configurado corretamente.
        </p>
      )}
      {data?.length === 0 && <p>Nenhum produto cadastrado ainda.</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
