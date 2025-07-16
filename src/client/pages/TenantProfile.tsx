// ================================
// File: src/client/pages/TenantProfile.tsx
// ================================

import { useEffect, useState } from "react";
import { useTenantProfile } from "../hooks/useTenantProfile";
import { useUpdateTenant } from "../hooks/useUpdateTenant";

export default function TenantProfile() {
  const { tenant, isLoading } = useTenantProfile();
  const { updateTenant, isUpdating } = useUpdateTenant();

  const [formData, setFormData] = useState({
    nome_empresa: "",
    plano: "",
    email: "",
    telefone: ""
  });
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (tenant) {
      setFormData({
        nome_empresa: tenant.nome_empresa ?? "",
        plano: tenant.plano ?? "",
        email: tenant.email ?? "",
        telefone: tenant.telefone ?? ""
      });
    }
  }, [tenant]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsDirty(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    updateTenant(formData);
    setIsDirty(false);
  }

  if (isLoading) return <p className="p-4 text-gray-600">Carregando dados da empresa...</p>;
  if (!tenant) return <p className="p-4 text-red-500">Erro ao carregar perfil da empresa.</p>;

  return (
    <div className="max-w-xl mx-auto mt-8 p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold text-green-600 mb-6">Perfil da Empresa</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nome da Empresa</label>
          <input
            type="text"
            name="nome_empresa"
            value={formData.nome_empresa}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Plano Contratado</label>
          <select
            name="plano"
            value={formData.plano}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="mensal">Mensal</option>
            <option value="anual">Anual</option>
            <option value="ilimitado">Ilimitado</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">E-mail</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Telefone</label>
          <input
            type="text"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div className="text-sm text-gray-500">
          <p>Termo aceito em: {tenant.aceitou_termos_em || "Ainda não aceito"}</p>
          <p>Versão do termo: {tenant.termo_versao || "N/A"}</p>
        </div>

        <button
          type="submit"
          disabled={!isDirty || isUpdating}
          className={`mt-4 px-4 py-2 rounded text-white ${
            isDirty ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {isUpdating ? "Salvando..." : "Salvar Alterações"}
        </button>
      </form>
    </div>
  );
}
