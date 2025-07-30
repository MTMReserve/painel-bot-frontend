// ===========================================
// File: src/server/controllers/productController.ts
// ===========================================

import { Request, Response } from 'express';
import { ProductService } from '../services/ProductService';
import type { Product } from '../models/Product';

// GET /products?tenant_id=xxx
export async function getAllProductsHandler(req: Request, res: Response) {
  const { tenant_id } = req.query;

  if (!tenant_id || typeof tenant_id !== 'string') {
    return res.status(400).json({ erro: 'tenant_id obrigatório' });
  }

  try {
    const products = await ProductService.getAllByTenant(tenant_id);
    return res.json(products);
  } catch (err) {
    console.error('Erro ao buscar produtos:', err);
    return res.status(500).json({ erro: 'Erro interno' });
  }
}

// GET /products/:id
export async function getProductByIdHandler(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const product = await ProductService.getById(id);
    if (!product) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }
    return res.json(product);
  } catch (err) {
    console.error('Erro ao buscar produto por ID:', err);
    return res.status(500).json({ erro: 'Erro interno' });
  }
}

// POST /products
export async function createProductHandler(req: Request, res: Response) {
  const data: Partial<Product> = req.body;

  // Validação mínima obrigatória
  const obrigatorios = ['tenant_id', 'nome', 'descricao', 'preco', 'formasPagamento', 'definicaoFechamento', 'camposObrigatoriosFechamento'];
  for (const campo of obrigatorios) {
    if (!data[campo as keyof Product]) {
      return res.status(400).json({ erro: `Campo obrigatório: ${campo}` });
    }
  }

  try {
    const id = await ProductService.create(data);
    return res.status(201).json({ id });
  } catch (err) {
    console.error('Erro ao criar produto:', err);
    return res.status(500).json({ erro: 'Erro interno ao criar produto' });
  }
}

// PUT /products/:id
export async function updateProductHandler(req: Request, res: Response) {
  const { id } = req.params;
  const data: Partial<Product> = req.body;

  try {
    const existente = await ProductService.getById(id);
    if (!existente) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }

    await ProductService.update(id, data);
    return res.json({ mensagem: 'Produto atualizado com sucesso' });
  } catch (err) {
    console.error('Erro ao atualizar produto:', err);
    return res.status(500).json({ erro: 'Erro interno ao atualizar produto' });
  }
}
