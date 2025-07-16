// ===============================================
// File: src/client/validators/clientResponseSchema.ts
// ===============================================

import { z } from "zod";

export const clientResponseSchema = z.object({
  id: z.number(),
  name: z.string().nullable(),
  phone: z.string().nullable(),
  current_state: z.string().nullable(),
  etapa: z.string().nullable(),
  produto_id: z.string().nullable(),
  criado_em: z.string().nullable(),
  email: z.string().nullable(),

  necessidades: z.string().nullable().optional(),
  forma_pagamento: z.string().nullable().optional(),
  budget: z.string().nullable().optional(),
  negotiated_price: z.string().nullable().optional(),

  status: z.enum(["aberta", "fechada", "perdida"]).nullable().optional(),
  temperatura: z.enum(["quente", "morno", "frio"]).nullable().optional(),
  conversa_finalizada: z.boolean().optional(),
  retries: z.number().optional(),

  mensagens: z.array(
    z.object({
      id: z.string(),
      texto: z.string(),
      timestamp: z.string(),
      tipo: z.enum(["enviada", "recebida"]),
    })
  ),
});

export type ClientResponse = z.infer<typeof clientResponseSchema>;
