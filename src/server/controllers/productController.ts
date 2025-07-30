import { Request, Response } from 'express';
import ProductService from '../services/ProductService';
import { fichaProdutoValidator } from '../schemas/fichaProdutoValidator';

/**
 * Controller responsável por receber requisições HTTP, validar os
 * dados de entrada e delegar as ações para a camada de serviço. O
 * controller também trata erros lançados pelo serviço e retorna
 * códigos HTTP apropriados ao cliente.
 */
class ProductController {
  /**
   * Handler para criação de produtos via POST /products. Valida o
   * payload usando Zod e responde com o objeto criado em caso de
   * sucesso.
   */
  async createProduct(req: Request, res: Response) {
    try {
      const data = fichaProdutoValidator.parse(req.body);
      const product = await ProductService.createProduct(data);
      return res.status(201).json(product);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  /**
   * Handler para atualização de produtos via PUT /products/:id. Valida
   * o payload e o ID, chamando a camada de serviço para atualizar.
   */
  async updateProduct(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const data = fichaProdutoValidator.parse(req.body);
      const product = await ProductService.updateProduct(id, data);
      return res.status(200).json(product);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  /**
   * Handler para leitura de produto via GET /products/:id. Busca o
   * produto na camada de serviço e retorna 404 se não existir.
   */
  async getProductById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const product = await ProductService.getProductById(id);
      return res.status(200).json(product);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }
}

export default new ProductController();