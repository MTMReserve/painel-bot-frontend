// ===========================================
// File: src/client/types/TenantProfileResponse.ts
// ===========================================

export interface TenantProfileResponse {
  tenant_id: string;
  nome_empresa: string;
  nome_completo: string;
  cpf: string;
  aceitou_termos_em?: string;
  termo_versao?: string;
  logo_url?: string;
  plano: string;
  email?: string;
  telefone?: string;

  cep: string;
  logradouro: string;
  numero: string;
  complemento?: string | null;
  cidade: string;
  estado: string;
}
