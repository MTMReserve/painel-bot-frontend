//============================
//src/store/useFilterStore.ts
//============================

import { create } from "zustand";

interface FilterState {
  etapa: string | null;
  status: string | null;
  produtoId: string | null;
  setEtapa: (etapa: string | null) => void;
  setStatus: (status: string | null) => void;
  setProdutoId: (id: string | null) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  etapa: null,
  status: null,
  produtoId: null,
  setEtapa: (etapa) => set({ etapa }),
  setStatus: (status) => set({ status }),
  setProdutoId: (produtoId) => set({ produtoId }),
  resetFilters: () => set({ etapa: null, status: null, produtoId: null }),
}));
