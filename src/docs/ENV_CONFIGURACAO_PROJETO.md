# 📦 CONFIGURAÇÃO DE VARIÁVEIS DE AMBIENTE (.env) — Front-end e Back-end

✅ Arquivo 1: src/client/.env.local
⚠️ Este arquivo será usado apenas pelo Vite no front-end, então TODAS as variáveis precisam começar com VITE_. Ele é visível no navegador, então nunca coloque segredos aqui.

# ================================
# 🔐 CONFIGURAÇÕES DO FRONT-END
# Arquivo: src/client/.env.local
# Usado apenas pelo Vite no navegador
# ================================

# 🧠 ID do cliente Google para login com botão (Google One Tap, GoogleLogin)
VITE_GOOGLE_CLIENT_ID=1074707258345-633o9t074sbb03f92uv5057idmf606mf.apps.googleusercontent.com

# 🌍 API base (Back-end). Usado pelos hooks (ex: axios.create) no front-end
VITE_API_URL=http://localhost:3001


✅ Arquivo 2: src/server/.env.server
⚙️ Este arquivo será usado apenas pelo Node.js/Express (backend). Pode conter informações sensíveis. Será lido com dotenv.config() no back-end.

# ================================
# 🛠️ CONFIGURAÇÕES DO BACK-END
# Arquivo: src/server/.env.server
# Usado apenas pelo Node/Express
# ================================

# 🔐 Chave secreta do Google OAuth (NÃO visível no front)
GOOGLE_CLIENT_ID=1074707258345-633o9t074sbb03f92uv5057idmf606mf.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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

# 🌐 URL que o Google irá redirecionar após login com sucesso
GOOGLE_REDIRECT_URI=http://localhost:5173/login-callback

# 🧩 JWT opcional (caso venha a usar autenticação via token)
JWT_SECRET=minha_chave_secreta_para_assinar_jwt

# 🧵 Configuração do banco de dados (MySQL)
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=bot_whatsapp

✅ O que é necessário garantir:
O Vite já lê automaticamente o .env.local, então não precisa configurar nada.

O back-end precisa de um carregamento explícito com:

// Em src/server/index.ts ou app.ts
import dotenv from 'dotenv';
dotenv.config({ path: './src/server/.env.server' });


===============================================================

# 📄 Variáveis de Ambiente — painel-bot

Este documento lista todas as variáveis de ambiente utilizadas no projeto.

## ✅ Variáveis em uso

| Variável        | Local     | Descrição                                      |
|----------------|-----------|-----------------------------------------------|
| `SMTP_USER`    | Back-end  | Login do e-mail usado para envio de e-mails   |
| `SMTP_PASS`    | Back-end  | Senha ou token do e-mail                      |
| `FRONT_URL`    | Back-end  | URL base do front-end para gerar links        |

## ❌ Variáveis definidas, mas não utilizadas

| Variável                  | Status     |
|---------------------------|------------|
| `VITE_GOOGLE_CLIENT_ID`   | Não usada  |
| `VITE_GOOGLE_AUTH_URL`    | Não usada  |
| `VITE_API_URL`            | Não usada  |
| `JWT_SECRET`              | Não usada  |
| `DATABASE_URL`            | Não usada  |
| `EMAIL_HOST`              | Não usada  |
| `EMAIL_PORT`              | Não usada  |
| `EMAIL_USER`              | Não usada  |
| `EMAIL_PASS`              | Não usada  |

---

## 🧼 Sugestão

- Remover variáveis não usadas dos `.env`
- Atualizar leitura via `env.server.ts`
- Criar `env.client.ts` com apenas `VITE_` se necessário no futuro
