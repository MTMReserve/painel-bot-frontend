// ==========================
// File: src/client/components/Header.tsx
// ==========================

import { useTenantStore } from "../store/useTenantStore";
import { ProfileMenu } from "./ProfileMenu";

export default function Header() {
  const { tenant } = useTenantStore();

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

      {/* Lado direito: plano + versão + menu de perfil */}
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

        {/* Novo menu de perfil com logout, cadastro, produtos, contrato */}
        <ProfileMenu />
      </div>
    </header>
  );
}
