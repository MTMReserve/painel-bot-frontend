// ===============================
// File: src/pages/Settings.tsx
// ===============================

import SettingsForm from "@/components/SettingsForm"

export default function SettingsPage() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Configurações da Empresa</h1>
      <SettingsForm />
    </div>
  );
}
