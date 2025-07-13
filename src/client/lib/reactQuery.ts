// ===============================
// File: src/lib/reactQuery.ts
// ===============================

import { QueryClient } from "@tanstack/react-query";

/**
 * Instância global do QueryClient para o React Query.
 * Pode ser compartilhada entre toda a aplicação.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});
