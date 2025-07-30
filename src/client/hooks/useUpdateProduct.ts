import { useState } from 'react';
import type { Product } from '../types/Product';

/**
 * Hook que encapsula a lógica de enviar uma requisição PUT para
 * atualizar um produto existente. Assim como useCreateProduct, ele
 * expõe estados de carregamento e erro para que o componente
 * consumidor possa fornecer feedback ao usuário.
 */
export function useUpdateProduct() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Atualiza o produto indicado por `id` com os dados fornecidos. O
   * back‑end deve retornar o produto atualizado. Em caso de erro, uma
   * exceção é lançada e o estado de erro é atualizado.
   */
  const updateProduct = async (id: string | number, product: Product): Promise<Product> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      if (!response.ok) {
        throw new Error(`Erro ao atualizar produto: ${response.statusText}`);
      }
      return (await response.json()) as Product;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateProduct, loading, error };
}

export default useUpdateProduct;