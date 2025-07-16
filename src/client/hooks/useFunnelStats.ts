  //==============================
  //src/hooks/useFunnelStats.ts
  //==============================

import { useQuery } from "@tanstack/react-query";
import { api } from "@client/services/api";
import { useAuthStore } from "@client/store/useAuthStore";

export function useFunnelStats() {
  const tenant_id = useAuthStore((s) => s.tenant_id);

  return useQuery({
    queryKey: ["funnelStats", tenant_id],
    queryFn: async () => {
      const response = await api.get("/stats/funnel", {
        params: { tenant_id },
      });
      return response.data;
    },
    enabled: !!tenant_id, // Só faz a query se tiver tenant
  });
}

