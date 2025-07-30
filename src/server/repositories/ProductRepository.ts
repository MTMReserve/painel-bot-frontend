// ========================================
// File: src/server/repositories/ProductRepository.ts
// ========================================

import { pool } from "../utils/db";
import { Product, Negociacao } from "../models/Product";
import type { RowDataPacket } from "mysql2/promise";

function parseJSON<T>(value: unknown): T | undefined {
  try {
    if (!value) return undefined;
    return JSON.parse(String(value)) as T;
  } catch {
    return undefined;
  }
}

function toJSONString(value: unknown): string | null {
  if (!value) return null;
  return JSON.stringify(value);
}

export async function getAllProductsByTenant(tenant_id: string): Promise<Product[]> {
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT * FROM products WHERE tenant_id = ? ORDER BY created_at DESC`,
    [tenant_id]
  );

  return rows.map((row) => ({
    id: row.id,
    tenant_id: row.tenant_id,
    nome: row.nome,
    descricao: row.descricao,
    preco: row.preco,
    promocao: row.promocao,
    garantias: row.garantias,
    beneficios: parseJSON<string[]>(row.beneficios) ?? [],
    formasPagamento: parseJSON<Product["formasPagamento"]>(row.formasPagamento) ?? [],
    instrucoesPagamento: row.instrucoesPagamento,
    negociacao: parseJSON<Negociacao>(row.negociacao),
    entrega: row.entrega,
    instrucoesEntrega: row.instrucoesEntrega,
    local_realizacao: row.local_realizacao,
    requires_address: !!row.requires_address,
    definicaoFechamento: row.definicaoFechamento,
    camposObrigatoriosFechamento: parseJSON<string[]>(row.camposObrigatoriosFechamento) ?? [],
    categoria: row.categoria,
    tags: parseJSON<string[]>(row.tags) ?? [],
    created_at: row.created_at,
    updated_at: row.updated_at,
  }));
}

export async function getProductById(id: string): Promise<Product | null> {
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT * FROM products WHERE id = ? LIMIT 1`,
    [id]
  );

  if (rows.length === 0) return null;

  const row = rows[0];

  return {
    id: row.id,
    tenant_id: row.tenant_id,
    nome: row.nome,
    descricao: row.descricao,
    preco: row.preco,
    promocao: row.promocao,
    garantias: row.garantias,
    beneficios: parseJSON<string[]>(row.beneficios) ?? [],
    formasPagamento: parseJSON<Product["formasPagamento"]>(row.formasPagamento) ?? [],
    instrucoesPagamento: row.instrucoesPagamento,
    negociacao: parseJSON<Negociacao>(row.negociacao),
    entrega: row.entrega,
    instrucoesEntrega: row.instrucoesEntrega,
    local_realizacao: row.local_realizacao,
    requires_address: !!row.requires_address,
    definicaoFechamento: row.definicaoFechamento,
    camposObrigatoriosFechamento: parseJSON<string[]>(row.camposObrigatoriosFechamento) ?? [],
    categoria: row.categoria,
    tags: parseJSON<string[]>(row.tags) ?? [],
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

export async function createProduct(product: Product): Promise<void> {
  const {
    id,
    tenant_id,
    nome,
    descricao,
    preco,
    promocao,
    garantias,
    beneficios,
    formasPagamento,
    instrucoesPagamento,
    negociacao,
    entrega,
    instrucoesEntrega,
    local_realizacao,
    requires_address,
    definicaoFechamento,
    categoria,
    tags,
    camposObrigatoriosFechamento,
  } = product;

  await pool.query(
    `INSERT INTO products (
      id, tenant_id, nome, descricao, preco, promocao, garantias,
      beneficios, formasPagamento, instrucoesPagamento, negociacao,
      entrega, instrucoesEntrega, local_realizacao, requires_address,
      definicaoFechamento, categoria, tags, camposObrigatoriosFechamento
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      tenant_id,
      nome,
      descricao,
      preco,
      promocao ?? null,
      garantias ?? null,
      toJSONString(beneficios),
      toJSONString(formasPagamento),
      instrucoesPagamento ?? null,
      toJSONString(negociacao),
      entrega ?? null,
      instrucoesEntrega ?? null,
      local_realizacao ?? null,
      requires_address ? 1 : 0,
      definicaoFechamento,
      categoria ?? null,
      toJSONString(tags),
      toJSONString(camposObrigatoriosFechamento),
    ]
  );
}

export async function updateProduct(product: Product): Promise<void> {
  const {
    id,
    tenant_id,
    nome,
    descricao,
    preco,
    promocao,
    garantias,
    beneficios,
    formasPagamento,
    instrucoesPagamento,
    negociacao,
    entrega,
    instrucoesEntrega,
    local_realizacao,
    requires_address,
    definicaoFechamento,
    categoria,
    tags,
    camposObrigatoriosFechamento,
  } = product;

  await pool.query(
    `UPDATE products SET
      nome = ?, descricao = ?, preco = ?, promocao = ?, garantias = ?,
      beneficios = ?, formasPagamento = ?, instrucoesPagamento = ?, negociacao = ?,
      entrega = ?, instrucoesEntrega = ?, local_realizacao = ?, requires_address = ?,
      definicaoFechamento = ?, categoria = ?, tags = ?, camposObrigatoriosFechamento = ?,
      updated_at = NOW()
    WHERE id = ? AND tenant_id = ?`,
    [
      nome,
      descricao,
      preco,
      promocao ?? null,
      garantias ?? null,
      toJSONString(beneficios),
      toJSONString(formasPagamento),
      instrucoesPagamento ?? null,
      toJSONString(negociacao),
      entrega ?? null,
      instrucoesEntrega ?? null,
      local_realizacao ?? null,
      requires_address ? 1 : 0,
      definicaoFechamento,
      categoria ?? null,
      toJSONString(tags),
      toJSONString(camposObrigatoriosFechamento),
      id,
      tenant_id,
    ]
  );
}
