import type { FichaProduto } from '../schemas/fichaProdutoValidator';
import ProductRepository from '../repositories/ProductRepository';

/**
 * Camada de negócio responsável por validar regras adicionais antes
 * de interagir com o repositório. Esta classe encapsula lógica de
 * deduplicação, preenchimento de campos padrão e outras operações
 * necessárias para manter a integridade dos produtos.
 */
class ProductService {
  /**
   * Cria um novo produto após validar duplicidade e regras de
   * negócio. Lança erro se um produto com o mesmo nome já existir
   * dentro do tenant informado.
   */
  async createProduct(data: FichaProduto) {
    // Verifica duplicidade pelo nome e tenant
    const existing = await ProductRepository.findByName(data.tenant_id, data.nome);
    if (existing) {
      throw new Error('Produto duplicado: já existe um produto com este nome');
    }
    // Opcionalmente aqui poderiam ser aplicadas outras regras de negócio,
    // como garantir metas mínimas ou transformar campos vazios em
    // estruturas compatíveis.
    return await ProductRepository.create(data);
  }

  /**
   * Atualiza um produto existente. Se o produto não for encontrado,
   * lança um erro. As regras de deduplicidade não se aplicam aqui
   * porque supõe‑se que o ID provém do próprio produto existente.
   */
  async updateProduct(id: number, data: FichaProduto) {
    return await ProductRepository.update(id, data);
  }

  /**
   * Recupera um produto pelo ID. Lança erro se não existir.
   */
  async getProductById(id: number) {
    const product = await ProductRepository.getById(id);
    if (!product) {
      throw new Error('Produto não encontrado');
    }
    return product;
  }
}

export default new ProductService();