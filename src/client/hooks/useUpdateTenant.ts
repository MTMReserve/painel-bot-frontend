// ================================
// File: src/client/hooks/useUpdateTenant.ts
// ================================

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/api";

interface UpdateTenantData {
  nome_empresa: string;
  plano: string;
}

export function useUpdateTenant() {
  const queryClient = useQueryClient();

  const { mutate: updateTenant, isPending: isUpdating } = useMutation({
    mutationFn: async (data: UpdateTenantData) => {
      await api.put("/tenant/me", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tenantProfile"] });

    }
  });

  return {
    updateTenant,
    isUpdating
  };
}
