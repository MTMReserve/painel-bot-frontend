//=============================
// src/components/MenuLink.tsx
//=============================

import { NavLink } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

interface MenuLinkProps {
  to: string;
  label: string;
  icon: LucideIcon;
}

export default function MenuLink({ to, label, icon: Icon }: MenuLinkProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-800 transition-colors ${
          isActive ? "bg-gray-800 font-bold" : ""
        }`
      }
    >
      <Icon size={20} />
      <span>{label}</span>
    </NavLink>
  );
}
