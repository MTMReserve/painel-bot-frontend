// ================================
// File: src/client/hooks/useTenantProfile.ts
// ================================

import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import { useTenantStore } from "../store/useTenantStore";
import type { TenantProfileResponse } from "../types/TenantProfileResponse";

export function useTenantProfile() {
  const { setTenant } = useTenantStore();

  const { data, isLoading, isError } = useQuery<TenantProfileResponse>({
    queryKey: ["tenantProfile"],
    queryFn: async () => {
      const response = await api.get<TenantProfileResponse>("/tenant/me");
      setTenant(response.data); // salva no Zustand
      return response.data;
    }
  });

  return {
    tenant: data,
    isLoading,
    isError
  };
}
