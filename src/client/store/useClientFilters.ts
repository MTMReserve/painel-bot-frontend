// ===============================
// File: src/store/useClientFilters.ts
// ===============================

import { create } from 'zustand';

interface ClientFiltersState {
  etapa: string | null;
  status: string | null;
  produtoId: string | null;
  setEtapa: (etapa: string | null) => void;
  setStatus: (status: string | null) => void;
  setProdutoId: (produtoId: string | null) => void;
}

export const useClientFilters = create<ClientFiltersState>((set) => ({
  etapa: null,
  status: null,
  produtoId: null,
  setEtapa: (etapa) => set({ etapa }),
  setStatus: (status) => set({ status }),
  setProdutoId: (produtoId) => set({ produtoId }),
}));
