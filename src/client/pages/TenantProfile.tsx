//=============================================
// src/client/pages/TenantProfile.tsx
//=============================================

import { useEffect, useState } from "react";
import { useTenantProfile } from "../hooks/useTenantProfile";
import { useUpdateTenant } from "../hooks/useUpdateTenant";
import EnderecoForm from "../components/EnderecoForm";
import type { TenantProfileResponse } from "../types/TenantProfileResponse";




export default function TenantProfile() {
const { tenant, isLoading } = useTenantProfile();
const tenantTyped = tenant as TenantProfileResponse;


  const { updateTenant, isUpdating } = useUpdateTenant();

  const [formData, setFormData] = useState({
    nome_empresa: "",
    logo_url: "",
    telefone: "",
    email: "",
  });

  const [endereco, setEndereco] = useState({
    cep: "",
    numero: "",
    complemento: "",
    logradouro: "",
    bairro: "",
    cidade: "",
    estado: "",
  });

  const [isDirty, setIsDirty] = useState(false);
  const [edicaoHabilitada, setEdicaoHabilitada] = useState(true);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

useEffect(() => {
  if (!tenant) return;

  // Checa se os dados já estão preenchidos para evitar re-execução
  const formDataIgual =
    formData.nome_empresa === (tenant.nome_empresa ?? "") &&
    formData.logo_url === (tenant.logo_url ?? "") &&
    formData.telefone === (tenant.telefone ?? "") &&
    formData.email === (tenant.email ?? "");

  const enderecoIgual =
    endereco.cep === (tenant.cep ?? "") &&
    endereco.numero === (tenant.numero ?? "") &&
    endereco.complemento === (tenant.complemento ?? "") &&
    endereco.logradouro === (tenant.logradouro ?? "") &&
    endereco.bairro === (tenant.bairro ?? "") &&
    endereco.cidade === (tenant.cidade ?? "") &&
    endereco.estado === (tenant.estado ?? "");

  if (!formDataIgual) {
    setFormData({
      nome_empresa: tenant.nome_empresa ?? "",
      logo_url: tenant.logo_url ?? "",
      telefone: tenant.telefone ?? "",
      email: tenant.email ?? "",
    });
  }

  if (!enderecoIgual) {
    setEndereco({
      cep: tenant.cep ?? "",
      numero: tenant.numero ?? "",
      complemento: tenant.complemento ?? "",
      logradouro: tenant.logradouro ?? "",
      bairro: tenant.bairro ?? "",
      cidade: tenant.cidade ?? "",
      estado: tenant.estado ?? "",
    });
  }

  // Opcional: Limpa flag dirty só se dados vieram novos
  if (!formDataIgual && !enderecoIgual) {
    setIsDirty(false);
  }
  }, [
    tenant,
    formData.nome_empresa,
    formData.logo_url,
    formData.telefone,
    formData.email,
    endereco.cep,
    endereco.numero,
    endereco.complemento,
    endereco.logradouro,
    endereco.bairro,
    endereco.cidade,
    endereco.estado,
  ]);

  // Timer de segurança (10 min)
  useEffect(() => {
    const timer = setTimeout(() => setEdicaoHabilitada(false), 10 * 60 * 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsDirty(true);
  };

  const handleEnderecoChange = (novoEndereco: typeof endereco) => {
    setEndereco(novoEndereco);
    setIsDirty(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const camposObrigatorios = [
      formData.nome_empresa,
      endereco.cep,
      endereco.numero,
      endereco.cidade,
      endereco.estado,
    ];

    if (camposObrigatorios.some((c) => !c || c.trim() === "")) {
      setToastMessage("Preencha todos os campos obrigatórios.");
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 3000);
      return;
    }

    updateTenant(
      {
        ...formData,
        ...endereco,
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
  };

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
          <label className="block text-sm font-medium text-gray-700">Nome da Empresa*</label>
          <input
            type="text"
            name="nome_empresa"
            value={formData.nome_empresa}
            onChange={handleInputChange}
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
            onChange={handleInputChange}
            disabled={!edicaoHabilitada || isUpdating}
            className="w-full border rounded p-2 disabled:bg-gray-100"
          />
        </div>

        {/* Telefone */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Telefone</label>
          <input
            type="text"
            name="telefone"
            value={formData.telefone}
            onChange={handleInputChange}
            disabled={!edicaoHabilitada || isUpdating}
            className="w-full border rounded p-2 disabled:bg-gray-100"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            disabled={!edicaoHabilitada || isUpdating}
            className="w-full border rounded p-2 disabled:bg-gray-100"
          />
        </div>

        {/* Nome completo do contratante */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Nome completo do responsável*</label>
          <input
            type="text"
            value={tenantTyped.nome_completo || ""}
            disabled
            className="w-full border rounded p-2 bg-gray-100"
          />
        </div>

        {/* CPF */}
        <div>
          <label className="block text-sm font-medium text-gray-700">CPF*</label>
          <input
            type="text"
            value={tenantTyped.cpf || ""}

            disabled
            className="w-full border rounded p-2 bg-gray-100"
          />
        </div>


        {/* Endereço */}
        <EnderecoForm initialValue={endereco} onChange={handleEnderecoChange} />

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
        <div className="text-sm text-gray-500 mt-4">
          <p>
            Termo aceito em:{" "}
            {tenant.aceitou_termos_em
              ? new Date(tenant.aceitou_termos_em).toLocaleString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "Ainda não aceito"}
          </p>
          <p>
            <a
              href={`/docs/termos/termo-${tenant.termo_versao || "v1.0"}.md`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 underline"
            >
              Visualizar termo aceito (versão {tenant.termo_versao || "N/A"})
            </a>
          </p>
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
