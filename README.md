# 🧠 Painel do Bot — Front-End SaaS (React + Vite + TypeScript)

> Painel administrativo completo para gerenciamento de leads, produtos, estatísticas e mensagens, com suporte multi-tenant, integração com API de bot WhatsApp e arquitetura modular escalável.

📅 Última atualização: **2025-07-13**  
📁 Diretório-base: `C:/projetos/omotim-front/painel-bot`

---

## ✨ Tecnologias

- React + Vite + TypeScript
- TailwindCSS
- Zustand (global store)
- Axios + React Query
- Express.js + MySQL
- Monorepo (client + server)
- Roteamento com React Router
- Backend REST com autenticação por `tenant_id`

---

## 📁 Estrutura do Projeto

src/
├── client/ ← Front-end (React/Vite)
│ ├── pages/ # Telas (Dashboard, Login, etc)
│ ├── components/ # UI reutilizável
│ ├── hooks/ # Hooks com React Query
│ ├── config/ # Variáveis (env.ts, constants.ts)
│ ├── routes/ # React Router + rotas protegidas
│ ├── store/ # Zustand (auth, filtros)
│ ├── services/ # Axios (api.ts)
│ └── types/ # Tipagens (Client, Product)
│
├── server/ ← Back-end (Express)
│ ├── controllers/ # Lógica REST (ex: clientsController)
│ ├── routes/ # Endpoints (GET/POST /products etc)
│ ├── config/ # env.server.ts
│ ├── utils/ # db.ts (MySQL)
│ └── middlewares/ # (reservado para auth, validação futura)



---

## ✅ Funcionalidades Implementadas

### 🔐 Autenticação e Multi-Tenant
- Login via `tenant_id` (mock: "abc")
- Dados isolados por empresa (tenant)
- Persistência no localStorage via Zustand

### 📦 Produto Dinâmico (SaaS)
- Cadastro e listagem de produtos
- Campos validados: formas de pagamento, entrega, obrigatórios
- Tipagem: `Product.ts`, tela: `ProductsPage.tsx`

### 👥 Clientes
- Listagem filtrada por etapa/status
- Hook: `useClients.ts`
- Tela: `ClientsList.tsx`
- Integração com API: `/clients?tenant_id=...`

### 📊 Dashboard
- Tela: `Dashboard.tsx`
- Hook: `useFunnelStats.ts`
- Exibe dados do funil por tenant

### 🔎 Cliente Detalhado
- Rota `/clientes/:id`
- Tela: `ClientDetail.tsx`
- Histórico real de mensagens
- Consumo da tabela `conversations`

### ⚙️ Configurações da Empresa
- Página `/configuracoes`
- Formulário mock para dados como nome, horário e endereço

---

## 🚀 Scripts Úteis

```bash
# Instalação
pnpm install

# Rodar projeto (front)
pnpm dev

# Compilar back-end (Express)
tsc --project tsconfig.node.json

# Lint
pnpm lint


📘 Configurações Técnicas
Alias @/ configurado em vite.config.ts e tsconfig.app.json

tsconfig.node.json isola compilação do back-end

Imports convertidos de ../ para @/

Estrutura 100% compatível com deploy separado (Vercel/Render)

📂 Tipagem do Produto

type Product = {
  id: string;
  tenant_id: string;
  nome: string;
  descricao: string;
  preco: string;
  formas_pagamento: string[];
  entrega: 'retirada' | 'delivery';
  instrucoes_pagamento: string;
  instrucoes_entrega: string;
  campos_obrigatorios: string[];
  created_at: string;
  updated_at: string;
};


📌 Próximas Tarefas
 Ativar rota /clientes/:id com botão de navegação

 Conectar FilterSidebar.tsx com Zustand global

 Ativar Kanban.tsx com @hello-pangea/dnd

 Criar BarChart.tsx e PieChart.tsx (Recharts)

 Adicionar colunas status e temperatura no banco

 Rota de edição de produtos

🧪 Testes Confirmados
Funcionalidade	Status
Login com tenant_id	✅
Cadastro/listagem de produtos por tenant	✅
Endpoint /clients?tenant_id=abc	✅
Dashboard renderiza sem erros	✅
Tela /configuracoes funcionando	✅
Navegação para /clientes/:id com dados	✅

📄 Histórico Técnico
Verifique o changelog completo em:
📁 docs/changelog.md

Inclui:

Separação client/ e server/

Criação do alias @/

Reestruturação de imports

Migração para SaaS multi-tenant

Novo módulo de produto e clientes

🤝 Colaboração
Este projeto foi desenvolvido por Maurício Freitas com foco em escalabilidade e performance comercial.
A arquitetura suporta múltiplos clientes B2B, com integração total ao bot de vendas via WhatsApp.

