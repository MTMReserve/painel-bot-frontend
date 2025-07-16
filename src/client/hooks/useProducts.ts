// ============================
// File: src/hooks/useProducts.ts
// ============================

import { useQuery } from "@tanstack/react-query";
import { api } from "@client/services/api";
import { useAuthStore } from "@client/store/useAuthStore";
import type { Product } from "@client/types/Product";

/**
 * Hook para buscar produtos cadastrados no sistema.
 * Usa React Query para cache e reatividade.
 */
export function useProducts() {
  const tenantId = useAuthStore((state) => state.tenant_id);

  return useQuery<Product[]>({
    queryKey: ["products", tenantId],
    enabled: !!tenantId,
    queryFn: async () => {
      const response = await api.get<Product[]>(`/products?tenant_id=${tenantId}`);
      return response.data;
    },
  });
}
