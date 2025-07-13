// ===============================
// File: src/client/hooks/useCreateProduct.ts
// ===============================

import { useMutation } from "@tanstack/react-query";
import { api } from "@/services/api";
import type { Product } from "@/types/Product";

type CreateProductInput = Omit<Product, "id" | "created_at" | "updated_at"> & {
  tenant_id: string;
};

export function useCreateProduct() {
  return useMutation({
    mutationFn: async (input: CreateProductInput) => {
      const response = await api.post("/products", input);
      return response.data;
    },
  });
}
