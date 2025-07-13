// ===============================
// File: src/pages/ClientsList.tsx
// ===============================

import { Link } from "react-router-dom";
import { useClients } from "@/hooks/useClients";

export default function ClientsList() {
  const { data: clientes = [], isLoading, isError } = useClients();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-green-600 mb-4">Clientes</h1>

      {isLoading && <p className="text-gray-600">Carregando clientes...</p>}
      {isError && <p className="text-red-500">Erro ao buscar clientes.</p>}

      {!isLoading && clientes.length === 0 && (
        <p className="text-gray-600">Nenhum cliente encontrado.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clientes.map((c) => (
          <Link
            key={c.id}
            to={`/clientes/${c.id}`}
            className="border p-4 rounded-lg shadow hover:bg-gray-50 transition"
          >
            <h2 className="text-lg font-semibold text-blue-600">{c.name}</h2>
            <p className="text-sm text-gray-700">{c.phone}</p>
            {c.current_state && (
              <p className="text-xs text-gray-500 mt-1">
                Etapa: {c.current_state}
              </p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
