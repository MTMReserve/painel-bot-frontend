//=================================
//src/components/FilterSidebar.tsx
//=================================

import { useFilterStore } from "@/store/useFilterStore";
import { ETAPAS_FUNIL, STATUS_CLIENTE } from "@/config/constants";
import { useProducts } from "@/hooks/useProducts";
import type { Product } from "@/types/Product";


export function FilterSidebar() {
  const { data: produtos } = useProducts();

  const {
    etapa,
    status,
    produtoId,
    setEtapa,
    setStatus,
    setProdutoId,
    resetFilters,
  } = useFilterStore();

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
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setProdutoId(e.target.value || null)}
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
        onClick={resetFilters}
        className="w-full mt-2 text-sm text-gray-500 underline hover:text-gray-700"
      >
        Limpar filtros
      </button>
    </aside>
  );
}
