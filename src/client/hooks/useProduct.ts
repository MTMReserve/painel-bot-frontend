import { useState, useEffect } from 'react';
import type { Product } from '../types/Product';

/**
 * Hook responsável por buscar os dados de um produto específico a
 * partir do id. Este hook simplifica o consumo da API de leitura e
 * encapsula estados internos de carregamento e erro.
 */
export function useProduct(id: string | number | undefined) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (id === undefined || id === null || id === '') {
      return;
    }
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) {
          throw new Error(`Erro ao buscar produto: ${response.statusText}`);
        }
        const data = (await response.json()) as Product;
        setProduct(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  return { product, loading, error };
}

export default useProduct;