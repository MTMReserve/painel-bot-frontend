//=================================
//src/components/FilterSidebar.tsx
//=================================

import { useClientFilters } from "@client/store/useClientFilters";
import { ETAPAS_FUNIL, STATUS_CLIENTE } from "@client/config/constants";
import { useProducts } from "@client/hooks/useProducts";
import type { Product } from "@client/types/Product";

export function FilterSidebar() {
  const { data: produtos } = useProducts();

  const {
    etapa,
    status,
    produtoId,
    setEtapa,
    setStatus,
    setProdutoId,
  } = useClientFilters();

  return (
    <aside className="bg-white rounded-xl shadow p-4 w-full max-w-xs">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">Filtros</h2>

      {/* Etapa */}
      <label className="block mb-2 text-sm font-medium text-gray-600">
        Etapa do Funil
      </label>
      <select
        value={etapa ?? ""}
        onChange={(e) => setEtapa(e.target.value || null)}
        className="w-full border p-2 rounded mb-4"
      >
        <option value="">Todas</option>
        {ETAPAS_FUNIL.map((etapa) => (
          <option key={etapa} value={etapa}>
            {etapa}
          </option>
        ))}
      </select>

      {/* Status */}
      <label className="block mb-2 text-sm font-medium text-gray-600">
        Status do Cliente
      </label>
      <select
        value={status ?? ""}
        onChange={(e) => setStatus(e.target.value || null)}
        className="w-full border p-2 rounded mb-4"
      >
        <option value="">Todos</option>
        {STATUS_CLIENTE.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      {/* Produto */}
      <label className="block mb-2 text-sm font-medium text-gray-600">
        Produto
      </label>
      <select
        value={produtoId ?? ""}
        onChange={(e) => setProdutoId(e.target.value || null)}
        className="w-full border p-2 rounded mb-4"
      >
        <option value="">Todos</option>
        {produtos?.map((p: Product) => (
          <option key={p.id} value={p.id}>
            {p.nome}
          </option>
        ))}
      </select>

      <button
        onClick={() => {
          setEtapa(null);
          setStatus(null);
          setProdutoId(null);
        }}
        className="w-full mt-2 text-sm text-gray-500 underline hover:text-gray-700"
      >
        Limpar filtros
      </button>
    </aside>
  );
}
