import { useState } from 'react';
import type { Product } from '../types/Product';

/**
 * Hook responsável por enviar requisições POST para criação de produtos.
 * Ele mantém estados de loading e error para permitir feedback visual
 * ao usuário durante a submissão do formulário.
 */
export function useCreateProduct() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Envia uma requisição para criar um novo produto. Dispara uma
   * exceção em caso de falha, permitindo que o componente lidere com
   * o erro de forma apropriada. Retorna o produto criado a partir do
   * back‑end (incluindo o ID gerado).
   */
  const createProduct = async (product: Product): Promise<Product> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      if (!response.ok) {
        throw new Error(`Erro ao criar produto: ${response.statusText}`);
      }
      return (await response.json()) as Product;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createProduct, loading, error };
}

export default useCreateProduct;