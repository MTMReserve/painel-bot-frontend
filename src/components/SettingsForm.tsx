// ===============================
// File: src/components/SettingsForm.tsx
// ===============================

import { useState } from "react";

interface SettingsFormState {
  nomeEmpresa: string;
  emailSuporte: string;
  horarioAtendimento: string;
  logoUrl: string;
}

export default function SettingsForm() {
  const [form, setForm] = useState<SettingsFormState>({
    nomeEmpresa: "",
    emailSuporte: "",
    horarioAtendimento: "",
    logoUrl: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Dados de configurações salvos:", form);
    alert("Configurações salvas com sucesso!");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nome da Empresa</label>
        <input
          type="text"
          name="nomeEmpresa"
          value={form.nomeEmpresa}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email de Suporte</label>
        <input
          type="email"
          name="emailSuporte"
          value={form.emailSuporte}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Horário de Atendimento</label>
        <input
          type="text"
          name="horarioAtendimento"
          value={form.horarioAtendimento}
          onChange={handleChange}
          placeholder="Ex: Seg-Sex das 8h às 18h"
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Logo (URL)</label>
        <input
          type="text"
          name="logoUrl"
          value={form.logoUrl}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Salvar Configurações
      </button>
    </form>
  );
}
