//======================================
//src/server/services/ProductService.ts
//======================================

import { pool } from '../utils/db';
import { v4 as uuidv4 } from 'uuid';
import type { Product } from '../models/Product';
import type { RowDataPacket } from 'mysql2'; // 👈 necessário

export class ProductService {
  static async getAllByTenant(tenant_id: string): Promise<Product[]> {
    const [rows] = await pool.query<(Product & RowDataPacket)[]>(
      'SELECT * FROM products WHERE tenant_id = ?',
      [tenant_id]
    );
    return rows;
  }

  static async getById(id: string): Promise<Product | null> {
    const [rows] = await pool.query<(Product & RowDataPacket)[]>(
      'SELECT * FROM products WHERE id = ?',
      [id]
    );
    return rows[0] ?? null;
  }

    static async create(data: Partial<Product>): Promise<string> {
    const id = uuidv4();
    await pool.query(
      `
    INSERT INTO products (
    id, tenant_id, nome, descricao, preco, promocao, garantias, beneficios,
    formas_pagamento, instrucoes_pagamento, negociacao, entrega,
    instrucoes_entrega, local_realizacao, requires_address,
    definicao_fechamento, campos_obrigatorios, categoria, tags
    )

      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
        [
        id,
        data.tenant_id,
        data.nome,
        data.descricao,
        data.preco,
        data.promocao ?? null,
        data.garantias ?? null,
        JSON.stringify(data.beneficios ?? []),
        JSON.stringify(data.formasPagamento ?? []),
        data.instrucoesPagamento ?? '',
        JSON.stringify(data.negociacao ?? null),
        data.entrega ?? null,
        data.instrucoesEntrega ?? '',
        data.local_realizacao ?? null,
        data.requires_address ?? false,
        data.definicaoFechamento ?? '',
        JSON.stringify(data.camposObrigatoriosFechamento ?? []),
        data.categoria ?? null,
        JSON.stringify(data.tags ?? [])
        ]

    );
    return id;
  }

  static async update(id: string, data: Partial<Product>): Promise<void> {
    await pool.query(
      `
      UPDATE products
      SET
        nome = ?, descricao = ?, preco = ?, promocao = ?, garantias = ?, beneficios = ?,
        formasPagamento = ?, instrucoesPagamento = ?, negociacao = ?, entrega = ?,
        instrucoesEntrega = ?, local_realizacao = ?, requires_address = ?,
        definicaoFechamento = ?, camposObrigatoriosFechamento = ?, categoria = ?, tags = ?
      WHERE id = ?
      `,
      [
        data.nome,
        data.descricao,
        data.preco,
        data.promocao ?? null,
        data.garantias ?? null,
        JSON.stringify(data.beneficios ?? []),
        JSON.stringify(data.formasPagamento ?? []),
        data.instrucoesPagamento ?? '',
        JSON.stringify(data.negociacao ?? null),
        data.entrega ?? null,
        data.instrucoesEntrega ?? '',
        data.local_realizacao ?? null,
        data.requires_address ?? false,
        data.definicaoFechamento ?? '',
        JSON.stringify(data.camposObrigatoriosFechamento ?? []),
        data.categoria ?? null,
        JSON.stringify(data.tags ?? []),
        id,
      ]
    );
  }
}
