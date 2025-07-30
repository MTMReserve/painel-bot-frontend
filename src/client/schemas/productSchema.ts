import { z } from 'zod';
import type { Product } from '../types/Product';

/**
 * Schema de validação para criação e edição de produtos no front‑end.
 * Utilizamos o Zod para garantir que os campos obrigatórios estejam
 * presentes e que os tipos estejam corretos antes de enviar ao back‑end.
 */
export const productSchema = z
  .object({
    tenant_id: z.string().nonempty({ message: 'Tenant é obrigatório' }),
    nome: z.string().nonempty({ message: 'Nome do produto é obrigatório' }),
    descricao: z.string().optional(),
    preco: z
      .number({ invalid_type_error: 'Preço deve ser numérico' })
      .nonnegative({ message: 'Preço deve ser positivo' })
      .optional(),
    categorias: z
      .array(z.string().nonempty())
      .min(1, { message: 'Informe ao menos uma categoria' }),
    formasPagamento: z
      .array(z.string().nonempty())
      .min(1, { message: 'Informe ao menos uma forma de pagamento' }),
    metas_por_etapa: z
      .record(z.string().min(1), z.number().nonnegative())
      .optional()
      .default({}),
  })
  .strict();

// Type derivado automaticamente a partir do schema para uso nos hooks
export type ProductInput = z.infer<typeof productSchema>;

/**
 * Valida um objeto do tipo ProductInput e lança erros se houverem
 * campos fora do padrão. Esta função pode ser utilizada dentro dos
 * componentes para validar antes de enviar ao servidor.
 */
export function validateProductInput(data: Product): ProductInput {
  return productSchema.parse(data);
}