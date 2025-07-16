// ================================
// File: src/client/hooks/useAceiteContrato.ts
// ================================

import { useMutation } from "@tanstack/react-query";
import { api } from "../services/api";

export function useAceiteContrato() {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (versao: string) => {
      await api.post("/tenant/aceite", { versao });
    }
  });

  return {
    aceitarContrato: mutateAsync,
    isAccepting: isPending
  };
}
