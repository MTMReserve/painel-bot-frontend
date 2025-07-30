// ================================
// File: src/client/types/UpdateTenantData.ts
// ================================

export interface UpdateTenantData {
  nome_empresa: string;
  logo_url?: string;
  telefone?: string;
  email?: string;

  cep: string;
  numero: string;
  complemento?: string;

  logradouro: string;
  bairro?: string;
  cidade: string;
  estado: string;
}
