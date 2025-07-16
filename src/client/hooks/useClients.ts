// ===============================
// File: src/hooks/useClients.ts
// ===============================

import { useQuery } from "@tanstack/react-query";
import { api } from "@client/services/api";
import { useAuthStore } from "@client/store/useAuthStore";
import { useClientFilters } from "@client/store/useClientFilters"; // 👈 integrando Zustand
import type { Client } from "@client/types/Client";

/**
 * Hook para buscar clientes com base nos filtros globais.
 * Filtros vêm do Zustand (etapa, status, produtoId).
 * Inclui automaticamente o tenant_id.
 */
export function useClients() {
  const tenant_id = useAuthStore((s) => s.tenant_id);
  const { etapa, status, produtoId } = useClientFilters(); // ✅ obtendo filtros globais

  return useQuery<Client[]>({
    queryKey: ["clients", etapa, status, produtoId, tenant_id],
    queryFn: async () => {
      const response = await api.get<Client[]>("/clients", {
        params: {
          tenant_id,
          etapa,
          status,
          produto_id: produtoId,
        },
      });
      return response.data;
    },
    enabled: !!tenant_id,
    staleTime: 1000 * 60 * 5,
  });
}
