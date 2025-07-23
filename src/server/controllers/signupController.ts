//===========================================
//src/server/controllers/signupController.ts
//===========================================

import { Request, Response } from "express";
import { signupSchema } from "../schemas/signupSchema";
import { SignupRequest, SignupResponse } from "../dtos/signup.dto";
import bcrypt from "bcrypt";
import { pool } from "../utils/db";
import { ResultSetHeader } from "mysql2";

export async function signupHandler(req: Request, res: Response) {
  try {
    // Validação com Zod
    const parsed = signupSchema.safeParse(req.body);
    if (!parsed.success) {
      console.log("❌ Erro de validação no signup:", parsed.error.format());
      console.log("📦 req.body recebido:", req.body);
      return res.status(400).json({ errors: parsed.error.format() });
    }


    const data: SignupRequest = parsed.data;

    // Hashear a senha
    const senha_hash = await bcrypt.hash(data.senha, 10);

    // Inserir no banco com todos os campos

    await pool.execute<ResultSetHeader>(
      `INSERT INTO tenants (
        tipo_pessoa, tenant_id, senha_hash, nome_empresa, logo_url, plano,
        aceitou_termos_em,termo_versao,  email, telefone,
        cpf, nome_completo, data_nascimento,
        cnpj, razao_social, nome_fantasia, responsavel_legal_nome, responsavel_legal_cpf,
        cep, logradouro, bairro, numero, complemento, cidade, estado
      ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        data.tipo_pessoa, //1
        data.tenant_id, //2
        senha_hash, //3
        data.nome_empresa, //4
        data.logo_url ?? null, //5
        data.plano, //6
        data.aceitou_termos_em, //7
        data.termo_versao, //8
        data.email, //9
        data.telefone, //10
        data.cpf ?? null, //11
        data.nome_completo ?? null, //12
        data.data_nascimento ? new Date(data.data_nascimento) : null, //13
        data.cnpj ?? null, //14
        data.razao_social ?? null, //15
        data.nome_fantasia ?? null, //16
        data.responsavel_legal_nome ?? null, //17
        data.responsavel_legal_cpf ?? null, //18
        data.cep, //19
        data.logradouro, //20
        data.bairro ?? null, //21
        data.numero, //22
        data.complemento ?? null, //23
        data.cidade, //24
        data.estado //25
      ]
    );


    const response: SignupResponse = {
      tenant_id: data.tenant_id,
      nome_empresa: data.nome_empresa,
      logo_url: data.logo_url,
      plano: data.plano,
      termo_versao: data.termo_versao,
      aceitou_termos_em: data.aceitou_termos_em,
    };

    return res.status(201).json(response);
  } catch (error) {
    console.error("❌ Erro no signupHandler:", error instanceof Error ? error.message : error);
    console.error("📦 Stack trace:", error);
    return res.status(500).json({ message: "Erro interno no servidor." });
  }
}
