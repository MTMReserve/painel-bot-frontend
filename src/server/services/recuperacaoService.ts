import { findTenantById } from "../repositories/TenantRepo";
import nodemailer from "nodemailer";
import crypto from "crypto";

const resetTokens = new Map<string, string>(); // simulado. Pode ir para banco depois.

export async function enviarEmailRecuperacao(tenant_id: string, email: string) {
  const tenant = await findTenantById(tenant_id);
  if (!tenant || tenant.email !== email) {
    throw new Error("Empresa ou e-mail não encontrados");
  }

  const token = crypto.randomBytes(20).toString("hex");
  resetTokens.set(token, tenant_id); // salvar em memória (teste)

  const link = `${process.env.FRONT_URL}/resetar-senha/${token}`;

  // transporte de e-mail (simples, adaptável)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Painel Bot" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Recuperação de Senha",
    html: `<p>Clique no link abaixo para redefinir sua senha:</p><p><a href="${link}">${link}</a></p>`,
  });
}

export function validarTokenESalvarNovaSenha(token: string, novaSenha: string) {
  const tenant_id = resetTokens.get(token);
  if (!tenant_id) throw new Error("Token inválido ou expirado");

  resetTokens.delete(token);
  return { tenant_id, novaSenha }; // Aqui você atualizaria no banco
}
