// ================================
// File: src/client/hooks/useTermo.ts
// ================================

import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";

interface Termo {
  versao: string;
  conteudo_md: string;
}

export function useTermo() {
  const { data, isLoading } = useQuery<Termo>({
    queryKey: ["termoAtual"],
    queryFn: async () => {
      const response = await api.get<Termo>("/tenant/termos");
      return response.data;
    }
  });

  return {
    termo: data,
    isLoading
  };
}
