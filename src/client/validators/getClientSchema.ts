// ==========================================
// File: src/client/validators/getClientSchema.ts
// ==========================================

import { z } from "zod";

export const mensagemSchema = z.object({
  id: z.string(),
  texto: z.string(),
  timestamp: z.string().datetime({ message: "timestamp inválido" }),
  tipo: z.enum(["enviada", "recebida"]),
});

export const clientResponseSchema = z.object({
  id: z.number(),
  name: z.string().nullable(),
  full_name: z.string().nullable(),
  phone: z.string().nullable(),
  current_state: z.string().nullable(),
  needs: z.string().nullable(),
  budget: z.number().nullable(),
  negotiated_price: z.number().nullable(),
  address: z.string().nullable(),
  payment_method: z.string().nullable(),
  produto_id: z.string().nullable(),
  etapa: z.string().nullable(),
  email: z.string().nullable(),
  status: z.string().nullable(),
  criado_em: z.string().nullable(),

  mensagens: z.array(mensagemSchema),
});
