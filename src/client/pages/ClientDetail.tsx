// ===============================================
// File: src/client/pages/ClientDetail.tsx
// ===============================================

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { useAuthStore } from "@/store/useAuthStore";
import type { Client } from "@/types/Client";
import { ArrowLeft } from "lucide-react";

export default function ClientDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const tenant_id = useAuthStore((s) => s.tenant_id);

  const [cliente, setCliente] = useState<Client | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (!id || !tenant_id) return;

    api
      .get(`/clients/${id}`, {
        params: { tenant_id },
      })
      .then((res) => setCliente(res.data))
      .catch((err) => {
        console.error("Erro ao buscar cliente:", err);
        setErro("Erro ao buscar cliente.");
      });
  }, [id, tenant_id]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate("/clientes")}
          className="text-sm text-gray-600 hover:text-green-600 flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Voltar para a lista
        </button>
      </div>

      <h1 className="text-3xl font-bold text-green-700 mb-4">Detalhes do Cliente</h1>

      {erro && <p className="text-red-500">{erro}</p>}

      {!cliente && !erro && <p className="text-gray-500">Carregando cliente...</p>}

      {cliente && (
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold">Informações Básicas</h2>
            <div className="mt-2 text-gray-800 space-y-1">
              <p><strong>Nome:</strong> {cliente.name}</p>
              <p><strong>Telefone:</strong> {cliente.phone}</p>
              {cliente.email && <p><strong>Email:</strong> {cliente.email}</p>}
              {cliente.produto_id && <p><strong>Produto:</strong> {cliente.produto_id}</p>}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold">Histórico de Conversa</h2>
            <div className="bg-white border p-4 rounded-lg shadow max-h-[400px] overflow-y-auto">
              {cliente.mensagens && cliente.mensagens.length > 0 ? (
                cliente.mensagens.map((msg) => (
                  <div
                    key={msg.id}
                    className={`mb-3 p-3 rounded-lg text-sm shadow-sm ${
                      msg.tipo === "enviada"
                        ? "bg-green-100 text-right"
                        : "bg-gray-100 text-left"
                    }`}
                  >
                    <p>{msg.texto}</p>
                    <p className="text-xs text-gray-500 mt-1">{msg.timestamp}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Nenhuma mensagem registrada.</p>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
