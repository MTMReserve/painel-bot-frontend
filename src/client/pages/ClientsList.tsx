// ===============================
// File: src/pages/ClientsList.tsx
// ===============================

import { Link } from "react-router-dom";
import { useClients } from "@client/hooks/useClients";

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

            <div className="flex flex-wrap gap-2 mt-2">
              {c.status && (
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium
                    ${
                      c.status === "aberta"
                        ? "bg-blue-100 text-blue-700"
                        : c.status === "fechada"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                >
                  {c.status}
                </span>
              )}

              {c.temperatura && (
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium
                    ${
                      c.temperatura === "quente"
                        ? "bg-red-200 text-red-800"
                        : c.temperatura === "morno"
                        ? "bg-yellow-200 text-yellow-800"
                        : "bg-blue-200 text-blue-800"
                    }`}
                >
                  {c.temperatura}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
