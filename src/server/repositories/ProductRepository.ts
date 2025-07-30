import type { ProductRepository as IProductRepository } from './productRepositoryTypes';
import type { Product } from '../models/Product';

/**
 * Implementação em memória de um repositório de produtos. Em um
 * ambiente real, este repositório faria consultas ao MySQL por meio
 * de uma biblioteca como mysql2/promise ou um ORM. Para fins de
 * demonstração e testes unitários, utilizamos um array em memória.
 */
class ProductRepository implements IProductRepository {
  private static products: Product[] = [];
  private static idCounter = 1;

  async create(product: Product): Promise<Product> {
    const newProduct: Product = {
      ...product,
      id: ProductRepository.idCounter++,
    };
    ProductRepository.products.push(newProduct);
    return newProduct;
  }

  async update(id: number, product: Product): Promise<Product> {
    const index = ProductRepository.products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error('Produto não encontrado');
    }
    const updated: Product = {
      ...ProductRepository.products[index],
      ...product,
      id,
    };
    ProductRepository.products[index] = updated;
    return updated;
  }

  async getById(id: number): Promise<Product | null> {
    const product = ProductRepository.products.find((p) => p.id === id);
    return product ?? null;
  }

  async findByName(tenant_id: string, nome: string): Promise<Product | null> {
    const product = ProductRepository.products.find(
      (p) => p.tenant_id === tenant_id && p.nome.toLowerCase() === nome.toLowerCase(),
    );
    return product ?? null;
  }
}

export default new ProductRepository();