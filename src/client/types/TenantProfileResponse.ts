// ===============================
// File: src/client/types/TenantProfileResponse.ts
// ===============================
export interface TenantProfileResponse {
  tenant_id: string;
  nome_empresa: string;
  email?: string;
  telefone?: string;
  plano?: string;
  logo_url?: string;
  termo_versao?: string;
  aceitou_termos_em?: string;

  cep: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  cidade: string;
  estado: string;
}
