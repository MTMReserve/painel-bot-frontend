// ==========================
// File: src/client/components/Header.tsx
// ==========================

import { useTenantStore } from "../store/useTenantStore";

export default function Header() {
  const { tenant, clearTenant } = useTenantStore();

  function handleLogout() {
    clearTenant();
    localStorage.clear();
    location.href = "/login";
  }

  return (
    <header className="bg-white shadow p-4 flex items-center justify-between">
      {/* Lado esquerdo: logo + saudação */}
      <div className="flex items-center gap-4">
        {tenant?.logo_url && (
          <img
            src={tenant.logo_url}
            alt="Logo da empresa"
            className="h-10 w-10 object-contain rounded"
          />
        )}
        <h1 className="text-xl font-bold text-green-600">
          {tenant?.nome_empresa
            ? `Bem-vindo, ${tenant.nome_empresa}`
            : "Painel Administrativo"}
        </h1>
      </div>

      {/* Lado direito: plano + versão + logout */}
      <div className="flex items-center gap-4">
        {tenant?.plano && (
          <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded font-medium">
            Plano: {tenant.plano.charAt(0).toUpperCase() + tenant.plano.slice(1)}
          </span>
        )}

        {tenant?.termo_versao && (
          <span className="text-xs text-gray-500">
            Termo: v{tenant.termo_versao}
          </span>
        )}

        <button
          onClick={handleLogout}
          className="text-sm text-red-600 border border-red-500 hover:bg-red-50 px-3 py-1 rounded"
        >
          Sair
        </button>
      </div>
    </header>
  );
}
