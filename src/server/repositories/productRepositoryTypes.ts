import type { Product } from '../models/Product';

/**
 * Interface que descreve os métodos que um repositório de produtos
 * deve implementar. Ao utilizar uma interface, podemos trocar a
 * implementação (por exemplo, MySQL, PostgreSQL, memória) sem
 * impactar o restante do código.
 */
export interface ProductRepository {
  /**
   * Cria um novo produto no banco de dados e retorna o produto
   * resultante (incluindo o ID gerado).
   */
  create(product: Product): Promise<Product>;
  /**
   * Atualiza um produto existente identificado por `id` e retorna o
   * produto atualizado.
   */
  update(id: number, product: Product): Promise<Product>;
  /**
   * Recupera um produto pelo seu ID. Retorna `null` se não existir.
   */
  getById(id: number): Promise<Product | null>;
  /**
   * Procura um produto pelo nome dentro de um determinado tenant.
   * Utilizado para evitar duplicidades.
   */
  findByName(tenant_id: string, nome: string): Promise<Product | null>;
}