# 🔐 AUTENTICAÇÃO MULTI-TENANT — FLUXO ESTRUTURADO

## ✅ Objetivo

Permitir login seguro no painel SaaS via `tenant_id + senha`, validando credenciais no back-end e armazenando sessão no front-end.

---

## 🧩 Estrutura Geral

| Camada         | Arquivo                                | Função                                                                 |
|----------------|-----------------------------------------|------------------------------------------------------------------------|
| Rota API       | `src/server/routes/auth.routes.ts`      | Define endpoint `POST /auth/login`                                     |
| Controller     | `src/server/controllers/authController.ts` | Recebe a requisição, chama o serviço de autenticação                   |
| Serviço        | `src/server/services/AuthService.ts`    | Busca o tenant, compara senha usando `bcrypt`                         |
| Repositório    | `src/server/repositories/TenantRepo.ts` | Acessa o banco MySQL via `pool.query`                                 |
| Front-end      | `src/store/useAuthStore.ts`             | Armazena `token`, `user` e `tenant_id` em `localStorage`              |
| Interceptor    | `src/services/api.ts`                   | Injeta `token` e `tenant_id` em cada requisição Axios automaticamente |

---

## 🔄 Fluxo Completo de Login

```plaintext
Usuário → Front-end → POST /auth/login → Back-end → Banco MySQL
                                         ↘ bcrypt.compare
                                          ↘ resposta segura (sem hash)


1. Front envia POST:

POST /auth/login
{
  tenant_id: "abc123",
  senha: "minhaSenhaSegura"
}


2. Back-end:

Valida se tenant_id foi enviado
Busca senha_hash no banco (tenants table)
Usa bcrypt.compare(senha, senha_hash) para validar
Se for válida, responde com:

{
  tenant_id: "abc123",
  nome_empresa: "Minha Empresa",
  logo_url: "https://...",
  token: "abc123-token-simulado" // opcional
}

🔒 Importante: nunca retorna senha_hash nem ID interno.

🔁 Sessão no Front-end
O front salva:
Chave	Origem da resposta
token	res.token
tenant_id	res.tenant_id
user	{ nome_empresa, logo_url }

Gerenciado via Zustand no useAuthStore.ts.

🔐 Interceptor de Axios

Local: src/services/api.ts
Adiciona Authorization: Bearer <token> se existir
Adiciona tenant_id automaticamente como params em cada request

🚪 Logout Seguro

Chama useAuthStore.getState().logout()
Remove token, tenant_id e user do localStorage
Redireciona para tela de login

❌ Erros tratados

Situação	Código	Mensagem
Tenant inexistente	404	"Tenant não encontrado"
Senha inválida	401	"Credenciais inválidas"
Campos ausentes	400	"tenant_id e senha são obrigatórios"
Erro interno	500	"Erro ao autenticar"

🧪 Testes recomendados
Login válido
Login com tenant inválido
Login com senha errada
Login com campos ausentes

Segurança: senha nunca aparece na resposta

🔧 Requisitos de dependências

bcrypt: usado no back-end (npm i bcrypt)
zustand: já está instalado no front-end
mysql2/promise: já utilizado em utils/db.ts

📁 Estrutura dos arquivos

src/
├── server/
│   ├── routes/
│   │   └── auth.routes.ts        # POST /auth/login
│   ├── controllers/
│   │   └── authController.ts     # Requisição e resposta
│   ├── services/
│   │   └── AuthService.ts        # Lógica de verificação
│   ├── repositories/
│   │   └── TenantRepo.ts         # Consulta ao banco
│   └── models/
│       └── Tenant.ts             # Tipagem opcional
└── client/
    └── store/
        └── useAuthStore.ts       # Sessão e estado

🧠 Observações

Esse fluxo é 100% compatível com arquitetura SaaS multi-tenant
Pode ser expandido facilmente para usar JWT ou refresh tokens
Está pronto para proteger rotas privadas com base em tenant_id

