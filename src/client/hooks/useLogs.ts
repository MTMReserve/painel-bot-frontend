//======================
//src/hooks/useLogs.ts
//======================

import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

export function useLogs() {
  return useQuery({
    queryKey: ["logs"],
    queryFn: async () => {
      const response = await api.get("/logs");
      return response.data;
    },
  });
}
