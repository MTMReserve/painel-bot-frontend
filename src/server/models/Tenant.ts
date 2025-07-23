// ===============================
// File: src/server/models/Tenant.ts
// ===============================

import type { RowDataPacket } from "mysql2";

export interface Tenant extends RowDataPacket {
  id: number;
  tipo_pessoa: "CPF" | "CNPJ";
  tenant_id: string;
  senha_hash: string;
  nome_empresa: string;
  logo_url?: string;
  criado_em: string;
  plano?: string;
  termo_versao?: string;
  aceitou_termos_em?: string;
  email?: string;
  telefone?: string;
  google_id?: string;

  // Pessoa Física
  cpf?: string;
  nome_completo?: string;
  data_nascimento?: string;

  // Pessoa Jurídica
  cnpj?: string;
  razao_social?: string;
  nome_fantasia?: string;
  responsavel_legal_nome?: string;
  responsavel_legal_cpf?: string;

  // Endereço
  cep: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  cidade: string;
  estado: string;
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
