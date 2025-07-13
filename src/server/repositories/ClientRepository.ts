// ==========================================
// File: src/server/repositories/ClientRepository.ts
// ==========================================

import { pool } from "../utils/db";
import { RowDataPacket } from "mysql2";

// Tipagem do cliente com base na tabela `clients`
export interface Client extends RowDataPacket {
  id: number;
  name: string | null;
  full_name: string | null;
  phone: string | null;
  current_state: string | null;
  needs: string | null;
  budget: number | null;
  negotiated_price: number | null;
  address: string | null;
  payment_method: string | null;
  produto_id: string | null;
  etapa: string | null;
  email: string | null;
  status: string | null;
  criado_em: string | null;
}

// Tipagem estendida com histórico de mensagens
export interface ClientWithMessages extends Client {
  mensagens: {
    id: string;
    texto: string;
    timestamp: string;
    tipo: "enviada" | "recebida";
  }[];
}

// Tipagem explícita para mensagens do cliente
interface MensagemCliente extends RowDataPacket {
  id: string;
  texto: string;
  timestamp: string;
  tipo: "enviada" | "recebida";
}


export const ClientRepository = {
  async findById(id: number, tenant_id: string): Promise<Client | null> {
    const [rows] = await pool.query<Client[]>(
      "SELECT * FROM clients WHERE id = ? AND tenant_id = ?",
      [id, tenant_id]
    );

    const cliente = Array.isArray(rows) ? rows[0] : null;
    return cliente || null;
  },

  async findByIdWithMessages(id: number, tenant_id: string): Promise<ClientWithMessages | null> {
    const [clienteRows] = await pool.query<Client[]>(
      "SELECT * FROM clients WHERE id = ? AND tenant_id = ?",
      [id, tenant_id]
    );

    const cliente = Array.isArray(clienteRows) ? clienteRows[0] : null;
    if (!cliente) return null;

    const [mensagemRows] = await pool.query<MensagemCliente[]>(
      `
      SELECT id, message AS texto, created_at AS timestamp,
        CASE direction
          WHEN 'sent' THEN 'enviada'
          WHEN 'received' THEN 'recebida'
          ELSE 'recebida'
        END AS tipo
      FROM conversations
      WHERE client_id = ?
      ORDER BY created_at ASC
      `,
      [id]
    );

    return {
      ...cliente,
      mensagens: mensagemRows || [],
    };
  },

  async findAll(filters: {
    tenant_id: string;
    etapa?: string;
    status?: string;
    produto_id?: string;
  }): Promise<Client[]> {
    const { tenant_id, etapa, status, produto_id } = filters;

    let query = "SELECT * FROM clients WHERE tenant_id = ?";
    const values: unknown[] = [tenant_id];

    if (etapa) {
      query += " AND current_state = ?";
      values.push(etapa);
    }

    if (status) {
      query += " AND status = ?";
      values.push(status);
    }

    if (produto_id) {
      query += " AND produto_id = ?";
      values.push(produto_id);
    }

    const [rows] = await pool.query<Client[]>(query, values);
    return rows;
  },
};
