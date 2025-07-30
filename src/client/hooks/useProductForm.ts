//=========================================
//src/client/hooks/useProductForm.ts
//=========================================

import { useState } from "react";
import { api } from "../services/api";
import type { ProductFormData } from "../schemas/productSchema";

export function useProductForm(id?: string) {
  const [product, setProduct] = useState<ProductFormData | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  async function fetchProduct() {
    try {
      const response = await api.get(`/products/${id}`);
      const data = response.data;
      setProduct({
        ...data,
        formas_pagamento_raw: data.formas_pagamento?.join(", ") || "",
      });
    } catch (error) {
      console.error("Erro ao buscar produto:", error);
    }
  }

  async function saveProduct(form: ProductFormData) {
    setIsSaving(true);
    try {
      if (id) {
        await api.put(`/products/${id}`, form);
      } else {
        await api.post("/products", form);
      }
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
    } finally {
      setIsSaving(false);
    }
  }

  function resetForm() {
    setProduct(null);
  }

  return {
    product,
    isSaving,
    fetchProduct,
    saveProduct,
    resetForm,
  };
}
