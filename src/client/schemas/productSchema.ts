//======================================
//src/client/schemas/productSchema.ts
//======================================

import { z } from "zod";

// Tipagem dos dados do formulário (front-end)
export type ProductFormData = {
  nome: string;
  descricao?: string;
  preco?: number;
  formas_pagamento_raw?: string;
  formas_pagamento?: string[];
  categoria?: string;
};

export const productSchema = z
  .object({
    nome: z.string().min(1, "O nome é obrigatório."),
    descricao: z.string().optional(),
    preco: z
      .number({ invalid_type_error: "O preço deve ser um número." })
      .positive("O preço deve ser maior que zero.")
      .optional(),
    formas_pagamento_raw: z.string().optional(),
    categoria: z.string().optional(),
  })
  .transform((data) => {
    const formas = data.formas_pagamento_raw
      ? data.formas_pagamento_raw
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s.length > 0)
      : [];
    return {
      ...data,
      formas_pagamento: formas,
    } satisfies ProductFormData;
  });
