// ==============================
// File: src/client/utils/validators.ts
// ==============================

import axios from "axios";

/**
 * Valida se um CPF é válido usando o algoritmo oficial.
 */
export function validateCPF(cpf: string): string | null {
  const cleaned = cpf.replace(/[^\d]/g, "");
  if (!/^\d{11}$/.test(cleaned)) return "CPF inválido";

  const allEqual = /^(\d)\1+$/.test(cleaned);
  if (allEqual) return "CPF inválido";

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleaned.charAt(i)) * (10 - i);
  }
  let check1 = (sum * 10) % 11;
  if (check1 === 10) check1 = 0;
  if (check1 !== parseInt(cleaned.charAt(9))) return "CPF inválido";

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleaned.charAt(i)) * (11 - i);
  }
  let check2 = (sum * 10) % 11;
  if (check2 === 10) check2 = 0;
  if (check2 !== parseInt(cleaned.charAt(10))) return "CPF inválido";

  return null;
}

/**
 * Valida formato básico de e-mail.
 */
export function validateEmail(email: string): string | null {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email) ? null : "E-mail inválido";
}

/**
 * Valida formato de telefone (10 ou 11 dígitos).
 */
export function validatePhone(phone: string): string | null {
  const cleaned = phone.replace(/[^\d]/g, "");
  if (!/^(\d{10}|\d{11})$/.test(cleaned)) {
    return "Telefone inválido";
  }
  return null;
}

/**
 * Valida nome completo (mínimo 2 palavras e 5 letras).
 */
export function validateNomeCompleto(nome: string): string | null {
  const palavras = nome.trim().split(/\s+/);
  if (palavras.length < 2) return "Digite nome completo (nome e sobrenome)";
  if (nome.length < 5) return "Nome muito curto";
  return null;
}

/**
 * Valida nome da empresa com mínimo de 3 caracteres.
 */
export function validateEmpresa(nome: string): string | null {
  return nome.trim().length < 3 ? "Nome da empresa inválido" : null;
}

/**
 * Valida se data de nascimento não é futura.
 */
export function validateDate(data: string): string | null {
  const hoje = new Date();
  const nascimento = new Date(data);

  if (isNaN(nascimento.getTime())) return "Data inválida";
  if (nascimento > hoje) return "Data de nascimento não pode ser futura";

  return null;
}

/**
 * Verifica se o tenant_id está disponível via API.
 * Espera uma rota GET /auth/validar-tenant/:id que retorna { disponivel: boolean }
 */
export async function validateTenantDisponivel(
  tenantId: string
): Promise<string | null> {
  if (tenantId.trim().length < 3) return "Nome de usuário muito curto";

  try {
    const res = await axios.get(`/auth/validar-tenant/${tenantId}`);
    if (res.data?.disponivel === false) {
      return "Nome de usuário já está em uso";
    }
    return null;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return `Erro ao validar nome de usuário: ${error.message}`;
    }
    return "Erro ao validar nome de usuário";
  }
}

/**
 * Verifica se as senhas digitadas são iguais.
 */
export function validateSenhaIguais(
  senha: string,
  confirmar: string
): string | null {
  return senha !== confirmar ? "As senhas não coincidem" : null;
}

/**
 * Valida se uma senha é forte.
 * Requisitos: pelo menos 8 caracteres, incluindo letra, número e caractere especial.
 */
export function validarSenhaForte(senha: string): boolean {
  const regexForte = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).{8,}$/;
  return regexForte.test(senha);
}
