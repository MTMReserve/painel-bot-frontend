// =============================================
// File: src/client/components/SettingsForm.tsx
// =============================================

import { useState } from "react";

interface SettingsFormProps {
  initialName?: string;
  initialLogo?: string;
  onSave: (data: { nome: string; logo: string }) => void;
}

export default function SettingsForm({
  initialName = "",
  initialLogo = "",
  onSave,
}: SettingsFormProps) {
  const [nome, setNome] = useState(initialName);
  const [logo, setLogo] = useState(initialLogo);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ nome, logo });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Nome da Empresa
        </label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          URL do Logo
        </label>
        <input
          type="text"
          value={logo}
          onChange={(e) => setLogo(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
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
