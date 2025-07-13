// ===============================
// File: src/components/Sidebar.tsx
// ===============================

import { Home, Users } from "lucide-react";
import MenuLink from "./MenuLink";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white p-4">
      <h2 className="text-xl font-bold mb-6">Painel</h2>
      <nav className="flex flex-col gap-3">
        <MenuLink to="/" icon={Home} label="Dashboard" />
        <MenuLink to="/clientes" icon={Users} label="Clientes" />
      </nav>
    </aside>
  );
}
