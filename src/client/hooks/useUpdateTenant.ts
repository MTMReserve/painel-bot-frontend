// ================================
// File: src/client/hooks/useUpdateTenant.ts
// ================================

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/api";

// Interface com todos os campos que podem ser enviados
interface UpdateTenantData {
  nome_empresa: string;
  logo_url?: string;
  cep: string;
  numero: string;
  complemento?: string;
  logradouro: string;
  bairro?: string;
  cidade: string;
  estado: string;
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
