// ===============================
// File: src/server/schemas/signupSchema.ts
// ===============================

import { z } from "zod";

// Regex simples para CPF e CNPJ (somente números ou com máscara)
const cpfRegex = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/;
const cnpjRegex = /^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}$/;
const cepRegex = /^\d{5}-?\d{3}$/;
const estadoRegex = /^[A-Z]{2}$/;

export const signupSchema = z
  .object({
    tipo_pessoa: z.enum(["CPF", "CNPJ"]),

    tenant_id: z
      .string()
      .min(3, "O nome de usuário deve ter pelo menos 3 caracteres.")
      .max(50)
      .regex(/^[a-z0-9_-]+$/i, "Use apenas letras, números, hífens ou underlines."),

    senha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
    confirmar_senha: z.string(),

    email: z.string().email("E-mail inválido."),
    telefone: z.string().min(8, "Telefone inválido."),
    google_id: z.string().optional(), // ✅ ← Adicione esta linha

    plano: z.string().min(1),
    termo_versao: z.string().min(1),
    aceitou_termos_em: z.string().datetime(),

    nome_empresa: z.string().min(2, "Nome da empresa é obrigatório."),
    logo_url: z.string().url().optional(),


    // Endereço
    cep: z.string().regex(cepRegex, "CEP inválido."),
    logradouro: z.string().min(2),
    bairro: z.string().min(2),
    numero: z.string().min(1),
    complemento: z.string().optional(),
    cidade: z.string().min(2),
    estado: z.string().regex(estadoRegex, "UF inválido."),

    // Pessoa Física
    cpf: z.string().optional(),
    nome_completo: z.string().optional(),
    data_nascimento: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data deve estar no formato YYYY-MM-DD").optional(),

    // Pessoa Jurídica
    cnpj: z.string().optional(),
    razao_social: z.string().optional(),
    nome_fantasia: z.string().optional(),
    responsavel_legal_nome: z.string().optional(),
    responsavel_legal_cpf: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.senha !== data.confirmar_senha) {
      ctx.addIssue({
        code: "custom",
        message: "As senhas não coincidem.",
        path: ["confirmar_senha"],
      });
    }

    if (data.tipo_pessoa === "CPF") {
      if (!data.cpf || !cpfRegex.test(data.cpf)) {
        ctx.addIssue({ code: "custom", path: ["cpf"], message: "CPF inválido ou ausente." });
      }
      if (!data.nome_completo) {
        ctx.addIssue({ code: "custom", path: ["nome_completo"], message: "Nome completo é obrigatório." });
      }
      if (!data.data_nascimento) {
        ctx.addIssue({ code: "custom", path: ["data_nascimento"], message: "Data de nascimento é obrigatória." });
      }
    }

    if (data.tipo_pessoa === "CNPJ") {
      if (!data.cnpj || !cnpjRegex.test(data.cnpj)) {
        ctx.addIssue({ code: "custom", path: ["cnpj"], message: "CNPJ inválido ou ausente." });
      }
      if (!data.razao_social) {
        ctx.addIssue({ code: "custom", path: ["razao_social"], message: "Razão social é obrigatória." });
      }
      if (!data.nome_fantasia) {
        ctx.addIssue({ code: "custom", path: ["nome_fantasia"], message: "Nome fantasia é obrigatório." });
      }
      if (!data.responsavel_legal_nome) {
        ctx.addIssue({ code: "custom", path: ["responsavel_legal_nome"], message: "Nome do responsável legal é obrigatório." });
      }
      if (!data.responsavel_legal_cpf || !cpfRegex.test(data.responsavel_legal_cpf)) {
        ctx.addIssue({ code: "custom", path: ["responsavel_legal_cpf"], message: "CPF do responsável legal inválido ou ausente." });
      }
    }
  });

// Tipo inferido para uso nos controllers
export type SignupRequest = z.infer<typeof signupSchema>;
