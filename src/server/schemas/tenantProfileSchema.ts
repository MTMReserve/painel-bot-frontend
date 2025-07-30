//==========================================
// src/server/schemas/tenantProfileSchema.ts
//==========================================

import { z } from "zod";

// ✅ Novo schema exclusivo para atualização via PUT /tenant/me
export const tenantProfileUpdateSchema = z.object({
  nome_empresa: z.string().min(2),
  logo_url: z.string().url().optional(),
  telefone: z.string().optional(),
  email: z.string().email().optional(),

  cep: z.string().regex(/^\d{8}$/, "CEP deve conter 8 dígitos numéricos"),
  numero: z.string().nonempty("Número do endereço é obrigatório"),
  complemento: z.string().optional(),

  logradouro: z.string().min(2),
  bairro: z.string().optional(),
  cidade: z.string().min(2),
  estado: z.string().regex(/^[A-Z]{2}$/, "UF inválida"),
});

// ✅ Schema para validação de resposta do GET /tenant/me
export const tenantProfileSchema = z.object({
  tenant_id: z.string(),
  nome_empresa: z.string(),
  nome_completo: z.string(),
  cpf: z.string(),
  aceitou_termos_em: z.string().optional(),
  termo_versao: z.string().optional(),
  logo_url: z.string().nullable().optional(),
  plano: z.string().optional(),
  email: z.string().email().optional(),
  telefone: z.string().optional(),

  cep: z.string(),
  logradouro: z.string(),
  numero: z.string(),
  complemento: z.string().nullable().optional(),
  cidade: z.string(),
  estado: z.string(),
});

// ✅ Tipo exportado para uso no front
export type TenantProfileResponse = z.infer<typeof tenantProfileSchema>;
