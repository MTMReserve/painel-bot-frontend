// ================================
// File: src/client/hooks/useTenantProfile.ts
// ================================

import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import { useTenantStore } from "../store/useTenantStore";
import type { TenantProfileResponse } from "../types/TenantProfileResponse";

export function useTenantProfile() {
  const { tenant, setTenant } = useTenantStore();

  useQuery<TenantProfileResponse>({
    queryKey: ["tenantProfile"],
    queryFn: async () => {
      const response = await api.get("/tenant/me");
      setTenant(response.data); // ✅ Salva uma única vez no Zustand
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // ✅ evita revalidação constante
    refetchOnWindowFocus: false, // ✅ impede re-busca automática ao focar a aba
  });

  return {
    tenant,              // ✅ usa Zustand, objeto estável
    isLoading: !tenant,  // ✅ carrega até Zustand ter dados
    isError: false,      // pode ser ajustado se quiser tratar erro real
  };
}
