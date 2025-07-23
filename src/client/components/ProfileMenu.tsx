//======================================
//src/client/components/ProfileMenu.tsx
//======================================

import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { ChevronDown, LogOut, User, Package, BadgeInfo } from "lucide-react";
import { api } from "@client/services/api";
import { useAuthStore } from "@client/store/useAuthStore";

export function ProfileMenu() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const [nomeEmpresa, setNomeEmpresa] = useState("Carregando...");
  const [menuAberto, setMenuAberto] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    api.get("/tenant/me")
      .then((res) => setNomeEmpresa(res.data.nome_empresa || "Minha empresa"))
      .catch(() => setNomeEmpresa("Minha empresa"));
  }, []);

  useEffect(() => {
    function handleClickFora(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setMenuAberto(false);
      }
    }

    document.addEventListener("mousedown", handleClickFora);
    return () => {
      document.removeEventListener("mousedown", handleClickFora);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setMenuAberto(!menuAberto)}
        className="flex items-center font-medium text-gray-700 hover:text-gray-900"
      >
        👤 Olá, {nomeEmpresa}
        <ChevronDown className="ml-2 h-4 w-4" />
      </button>

      {menuAberto && (
        <div className="absolute right-0 z-20 mt-2 w-56 origin-top-right rounded-md bg-white border shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1 text-sm text-gray-700">
            <button
              onClick={() => navigate("/perfil")}
              className="w-full px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
            >
              <User size={16} /> Meu cadastro
            </button>
            <button
              onClick={() => navigate("/produtos")}
              className="w-full px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
            >
              <Package size={16} /> Meus produtos
            </button>
            <button
              onClick={() => navigate("/plano")}
              className="w-full px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
            >
              <BadgeInfo size={16} /> Meu plano
            </button>
            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="w-full px-4 py-2 text-red-600 hover:bg-red-50 flex items-center gap-2"
            >
              <LogOut size={16} /> Sair
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
