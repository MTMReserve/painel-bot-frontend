// ===============================
// File: src/server/models/Tenant.ts
// ===============================

import type { RowDataPacket } from "mysql2";

export interface Tenant extends RowDataPacket {
  id: number;
  tenant_id: string;
  senha_hash: string;
  nome_empresa: string;
  logo_url?: string;
  criado_em: string;
  plano?: string;
  termo_versao?: string;
  aceitou_termos_em?: string;
}

// Interface para retorno seguro
export interface SafeTenant {
  tenant_id: string;
  nome_empresa: string;
  logo_url?: string;
  plano?: string;
  termo_versao?: string;
  aceitou_termos_em?: string;
  token?: string; // opcional, para futura expansão com JWT
}

// Interface para login
export interface LoginRequest {
  identificador: string; // pode ser tenant_id, email ou telefone
  senha: string;
}

export type LoginResponse = SafeTenant;

// ✅ Alias adicional para tipos globais
export type TenantRow = Tenant;
