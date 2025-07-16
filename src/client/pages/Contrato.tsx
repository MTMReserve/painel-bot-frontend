// ================================
// File: src/client/pages/Contrato.tsx
// ================================

import { useNavigate } from "react-router-dom";
import { useTermo } from "../hooks/useTermo";
import { useAceiteContrato } from "../hooks/useAceiteContrato";
import ReactMarkdown from "react-markdown";
import { useTenantStore } from "../store/useTenantStore";
import { useState } from "react";

export default function Contrato() {
  const navigate = useNavigate();
  const { tenant, setTenant } = useTenantStore();
  const { termo, isLoading } = useTermo();
  const { aceitarContrato, isAccepting } = useAceiteContrato();
  const [sucesso, setSucesso] = useState(false);

  async function handleAceite() {
    if (!termo?.versao || !tenant?.tenant_id) return;

    await aceitarContrato(termo.versao);
    setTenant({
      ...tenant,
      aceitou_termos_em: new Date().toISOString(),
      termo_versao: termo.versao
    });

    setSucesso(true);

    setTimeout(() => {
      navigate("/dashboard");
    }, 2000); // espera 2s para mostrar mensagem de sucesso
  }

  if (isLoading) return <p className="p-4">Carregando contrato...</p>;
  if (!termo) return <p className="p-4 text-red-500">Erro ao carregar o contrato.</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold text-green-600 mb-4">Contrato de Prestação de Serviço</h1>
      <p className="text-sm text-gray-500 mb-2">Versão: {termo.versao}</p>

      <div className="prose max-w-none text-justify text-sm text-gray-800 mb-6">
        <ReactMarkdown>{termo.conteudo_md}</ReactMarkdown>
      </div>

      {sucesso && (
        <div className="bg-green-100 border border-green-300 text-green-800 px-4 py-2 rounded mb-4">
          ✅ Contrato aceito com sucesso! Redirecionando para o painel...
        </div>
      )}

      <button
        onClick={handleAceite}
        disabled={isAccepting || sucesso}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
      >
        {isAccepting ? "Registrando aceite..." : "Aceitar contrato"}
      </button>
    </div>
  );
}
