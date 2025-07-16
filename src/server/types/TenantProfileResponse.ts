// ===========================================
// File: src/server/types/TenantProfileResponse.ts
// ===========================================

export interface TenantProfileResponse {
  tenant_id: string;
  nome_empresa: string;
  logo_url?: string;
  plano: string;
  aceitou_termos_em?: string;
  termo_versao?: string;
}
