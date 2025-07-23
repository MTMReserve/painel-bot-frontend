// ================================
// File: src/client/pages/TenantProfile.tsx
// ================================

import { useEffect, useState } from "react";
import { useTenantProfile } from "../hooks/useTenantProfile";
import { useUpdateTenant } from "../hooks/useUpdateTenant";

export default function TenantProfile() {
  const { tenant, isLoading } = useTenantProfile();
  const { updateTenant, isUpdating } = useUpdateTenant();

  // Estado do formulário com campos editáveis
  const [formData, setFormData] = useState({
    nome_empresa: "",
    logo_url: "",
  });
  const [isDirty, setIsDirty] = useState(false);
  const [edicaoHabilitada, setEdicaoHabilitada] = useState(true);

  // Estado para toast simples
  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  // Carrega dados iniciais do tenant
  useEffect(() => {
    if (tenant) {
      setFormData({
        nome_empresa: tenant.nome_empresa ?? "",
        logo_url: tenant.logo_url ?? "",
      });
    }
  }, [tenant]);

  // Desabilita edição após 10 minutos
  useEffect(() => {
    const timer = setTimeout(() => setEdicaoHabilitada(false), 10 * 60 * 1000);
    return () => clearTimeout(timer);
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsDirty(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    updateTenant(
  {
    nome_empresa: formData.nome_empresa,
    logo_url: formData.logo_url,
    cep: "",
    numero: "",
    logradouro: "",
    cidade: "",
    estado: "",
  },

      {
        onSuccess: () => {
          setToastMessage("Dados salvos com sucesso!");
          setToastVisible(true);
          setIsDirty(false);
          setTimeout(() => setToastVisible(false), 3000);
        },
        onError: () => {
          setToastMessage("Falha ao salvar. Tente novamente.");
          setToastVisible(true);
          setTimeout(() => setToastVisible(false), 3000);
        },
      }
    );
  }

  if (isLoading) {
    return <p className="p-4 text-gray-600">Carregando dados da empresa...</p>;
  }
  if (!tenant) {
    return <p className="p-4 text-red-500">Erro ao carregar perfil da empresa.</p>;
  }

  return (
    <div className="relative max-w-xl mx-auto mt-8 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold text-green-600 mb-6">Perfil da Empresa</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nome da Empresa */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Nome da Empresa</label>
          <input
            type="text"
            name="nome_empresa"
            value={formData.nome_empresa}
            onChange={handleChange}
            disabled={!edicaoHabilitada || isUpdating}
            className="w-full border rounded p-2 disabled:bg-gray-100"
          />
        </div>

        {/* Logo URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700">URL do Logo</label>
          <input
            type="url"
            name="logo_url"
            value={formData.logo_url}
            onChange={handleChange}
            disabled={!edicaoHabilitada || isUpdating}
            placeholder="https://..."
            className="w-full border rounded p-2 disabled:bg-gray-100"
          />
        </div>

        {/* Campos somente leitura */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Plano Contratado</label>
          <input
            type="text"
            value={tenant.plano}
            disabled
            className="w-full border rounded p-2 bg-gray-100 text-gray-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">E-mail</label>
          <input
            type="email"
            value={tenant.email}
            disabled
            className="w-full border rounded p-2 bg-gray-100 text-gray-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Telefone</label>
          <input
            type="text"
            value={tenant.telefone}
            disabled
            className="w-full border rounded p-2 bg-gray-100 text-gray-500"
          />
        </div>

        {/* Data do termo */}
        <div className="text-sm text-gray-500">
          <p>
            Termo aceito em: {tenant.aceitou_termos_em
              ? new Date(tenant.aceitou_termos_em).toLocaleString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "Ainda não aceito"}
          </p>
          <p>Versão do termo: {tenant.termo_versao || "N/A"}</p>
        </div>

        {/* Aviso de expiração */}
        {!edicaoHabilitada && (
          <p className="text-xs text-red-500 mt-2">
            Edição desabilitada após 10 minutos por segurança. Para alterações sensíveis, entre em contato com o suporte.
          </p>
        )}

        {/* Botão de salvar */}
        <button
          type="submit"
          disabled={!isDirty || isUpdating || !edicaoHabilitada}
          className={`mt-4 w-full px-4 py-2 rounded text-white ${
            isDirty && edicaoHabilitada ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {isUpdating ? "Salvando..." : "Salvar Alterações"}
        </button>
      </form>

      {/* Toast simples */}
      {toastVisible && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded shadow-lg">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
