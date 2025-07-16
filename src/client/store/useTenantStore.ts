// ================================
// File: src/client/store/useTenantStore.ts
// ================================

import { create } from "zustand";
import type { TenantProfileResponse } from "../types/TenantProfileResponse";

interface TenantState {
  tenant: TenantProfileResponse | null;
  setTenant: (tenant: TenantProfileResponse) => void;
  clearTenant: () => void;
}

export const useTenantStore = create<TenantState>((set) => ({
  tenant: null,
  setTenant: (tenant) => set({ tenant }),
  clearTenant: () => set({ tenant: null })
}));
