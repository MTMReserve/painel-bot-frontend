import { z } from "zod";

export const tenantProfileSchema = z.object({
  tenant_id: z.string(),
  nome_empresa: z.string(),
  logo_url: z.string().optional(),
  plano: z.string(),
  aceitou_termos_em: z.string().optional(),
  termo_versao: z.string().optional()
});
