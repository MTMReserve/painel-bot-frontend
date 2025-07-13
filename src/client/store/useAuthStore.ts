// =============================== 
// File: src/store/useAuthStore.ts
// ===============================

import { create } from "zustand";

interface User {
  id: number;
  nome: string;
  email: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  tenant_id: string | null;
  login: (token: string, user: User, tenant_id: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: localStorage.getItem("token"),
  user: (() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      console.warn("Erro ao carregar user do localStorage:", e);
      return null;
    }
  })(),
  tenant_id: localStorage.getItem("tenant_id") || null,

  login: (token, user, tenant_id) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("tenant_id", tenant_id);
    set({ token, user, tenant_id });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("tenant_id");
    set({ token: null, user: null, tenant_id: null });
  },

  isAuthenticated: () => {
    const { token, user } = get();
    return !!token && !!user;
  },
}));
