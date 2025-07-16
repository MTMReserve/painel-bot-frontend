// ===============================
// File: src/client/store/useAuthStore.ts
// ===============================

import { create } from "zustand";

interface User {
  nome: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  tenant_id: string | null;
  login: (token: string | undefined, user: User, tenant_id: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => {
  // Carregamento seguro dos dados do localStorage
  let user: User | null = null;
  try {
    const raw = localStorage.getItem("user");
    if (raw) user = JSON.parse(raw);
  } catch (e) {
    console.warn("Erro ao carregar 'user' do localStorage:", e);
  }

  return {
    token: localStorage.getItem("token"),
    tenant_id: localStorage.getItem("tenant_id"),
    user,

    login: (token, user, tenant_id) => {
      if (token) {
        localStorage.setItem("token", token);
      } else {
        localStorage.removeItem("token");
      }
      localStorage.setItem("tenant_id", tenant_id);
      localStorage.setItem("user", JSON.stringify(user));
      set({ token: token || null, user, tenant_id });
    },

    logout: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("tenant_id");
      localStorage.removeItem("user");
      set({ token: null, user: null, tenant_id: null });
    },

    isAuthenticated: () => {
      const { tenant_id, user } = get();
      return !!tenant_id && !!user;
    },
  };
});
