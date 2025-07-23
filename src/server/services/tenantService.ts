// ===========================================
// File: src/server/services/tenantService.ts
// ===========================================

import {
  findTenantById,
  updateTenantPlano,
  salvarAceiteTermo,
  updateTenantNomeEmpresa, // ✅ ainda usado no handler antigo
  updateTenantProfile as updateTenantProfileRepo // ✅ NOVO IMPORT
} from "../repositories/TenantRepo";
import { pool } from "../utils/db";
import type { Termo } from "../models/Termo";

// Retorna perfil da empresa
export async function getTenantProfile(tenant_id: string) {
  const tenant = await findTenantById(tenant_id);
  if (!tenant) throw new Error("Tenant não encontrado");

  return {
    tenant_id: tenant.tenant_id,
    nome_empresa: tenant.nome_empresa,
    logo_url: tenant.logo_url || undefined,
    plano: tenant.plano || "mensal",
    aceitou_termos_em: tenant.aceitou_termos_em || undefined,
    termo_versao: tenant.termo_versao || undefined,
    email: tenant.email || undefined,
    telefone: tenant.telefone || undefined,
    cep: tenant.cep,
    numero: tenant.numero,
    complemento: tenant.complemento || "",
    cidade: tenant.cidade,
    estado: tenant.estado,
    logradouro: tenant.logradouro,
    bairro: tenant.bairro || "",
  };
}

// Atualiza plano do tenant
export async function updatePlano(tenant_id: string, plano: string) {
  await updateTenantPlano(tenant_id, plano);
}

// Atualiza nome da empresa (usado apenas no handler antigo)
export async function updateNomeEmpresa(tenant_id: string, nome_empresa: string) {
  await updateTenantNomeEmpresa(tenant_id, nome_empresa);
}

// ✅ NOVO: Atualiza todos os campos do perfil
export async function updateTenantProfile(
  tenant_id: string,
  data: {
    nome_empresa: string;
    logo_url: string | null;
    cep: string;
    numero: string;
    complemento: string | null;
    cidade: string;
    estado: string;
    logradouro: string;
    bairro: string | null;
  }
) {
  await updateTenantProfileRepo(tenant_id, data);
}

// Busca termo ativo mais recente
export async function getTermoAtual() {
  const [rows] = await pool.query<Termo[]>(
    "SELECT versao, conteudo_md FROM termos_e_condicoes WHERE ativo = true ORDER BY id DESC LIMIT 1"
  );
  return rows[0];
}

// Registra aceite do contrato
export async function registrarAceite(tenant_id: string, versao: string) {
  await salvarAceiteTermo(tenant_id, versao);
}
