import { Router } from 'express';
import productController from '../controllers/productController';

/**
 * Define as rotas relacionadas a produtos. Este módulo exporta um
 * objeto Router que pode ser importado e utilizado pelo servidor
 * principal da API.
 */
const router = Router();

// Cria um produto
router.post('/products', (req, res) => productController.createProduct(req, res));
// Atualiza um produto existente
router.put('/products/:id', (req, res) => productController.updateProduct(req, res));
// Busca produto por ID
router.get('/products/:id', (req, res) => productController.getProductById(req, res));

export default router;