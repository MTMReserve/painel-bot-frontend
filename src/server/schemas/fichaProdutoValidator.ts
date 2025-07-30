import { z } from 'zod';

/**
 * Schema de validação utilizado pelo back‑end para assegurar que os
 * dados recebidos atendam aos requisitos mínimos do bot. Este schema
 * espelha o productSchema do front‑end, mas reside no servidor para
 * permitir que o serviço seja utilizado de forma independente.
 */
export const fichaProdutoValidator = z
  .object({
    tenant_id: z.string().nonempty(),
    nome: z.string().nonempty(),
    descricao: z.string().optional(),
    preco: z.number().nonnegative().optional(),
    categorias: z.array(z.string().nonempty()).min(1),
    formasPagamento: z.array(z.string().nonempty()).min(1),
    metas_por_etapa: z.record(z.string().min(1), z.number().nonnegative()).optional().default({}),
  })
  .strict();

export type FichaProduto = z.infer<typeof fichaProdutoValidator>;