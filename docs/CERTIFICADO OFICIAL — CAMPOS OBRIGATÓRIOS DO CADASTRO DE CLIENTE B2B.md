---

# 📄 CERTIFICADO OFICIAL — CAMPOS OBRIGATÓRIOS DO CADASTRO DE CLIENTE B2B

> Versão: v1.0.1
> Data: 2025-07-17
> Responsável: MTM Produtos Digitais
> Projeto: SaaS de Automação de Vendas com Bot (painel multi-tenant)

---

## 🎯 Objetivo

Definir de forma oficial e padronizada todos os **campos obrigatórios e opcionais** que devem ser exigidos no **cadastro de uma empresa ou profissional (cliente B2B)** que contrata a plataforma da MTM Produtos Digitais.

Este certificado será utilizado como referência para a construção da base de dados, criação do endpoint de cadastro, validação no front-end, e segurança jurídica da empresa.

---

## 🔒 Princípios Legais e Contratuais

Todos os dados listados aqui visam atender:

* Código Civil Brasileiro (identificação das partes no contrato)
* Código de Defesa do Consumidor (CDC)
* Marco Civil da Internet
* Lei Geral de Proteção de Dados (LGPD)
* Práticas recomendadas de SaaS e billing recorrente (ASAAS, Stripe, etc.)

---

## 🧾 CAMPOS OBRIGATÓRIOS

### 🧠 Identificação do tipo de contratante

| Campo         | Tipo                  | Obrigatório | Observações                                     |
| ------------- | --------------------- | ----------- | ----------------------------------------------- |
| `tipo_pessoa` | enum: `CPF` ou `CNPJ` | ✅           | Define se é PF ou PJ e ativa campos específicos |

### 📇 Dados comuns obrigatórios (ambos os tipos)

| Campo               | Tipo          | Obrigatório | Observações                   |
| ------------------- | ------------- | ----------- | ----------------------------- |
| `email`             | string        | ✅           | Canal oficial de comunicação  |
| `telefone`          | string        | ✅           | Preferencialmente WhatsApp    |
| `senha`             | string (hash) | ✅           | Criptografada com bcrypt      |
| `confirmar_senha`   | string        | ✅           | Apenas front-end              |
| `plano`             | enum          | ✅           | Gratuito, Mensal, Anual, etc. |
| `aceitou_termos_em` | datetime      | ✅           | Data do aceite dos termos     |
| `termo_versao`      | string        | ✅           | Versão do contrato vigente    |

### 📍 Endereço físico obrigatório

| Campo         | Tipo   | Obrigatório | Observações                          |
| ------------- | ------ | ----------- | ------------------------------------ |
| `cep`         | string | ✅           | Validação automática via API externa |
| `logradouro`  | string | ✅           | Rua, avenida, etc.                   |
| `numero`      | string | ✅           | Número da residência ou empresa      |
| `complemento` | string | ❌           | Opcional                             |
| `cidade`      | string | ✅           | Município                            |
| `estado`      | string | ✅           | UF                                   |

### 👤 Se Pessoa Física (CPF)

| Campo             | Tipo   | Obrigatório | Observações                                  |
| ----------------- | ------ | ----------- | -------------------------------------------- |
| `cpf`             | string | ✅           | Validação obrigatória com dígito verificador |
| `nome_completo`   | string | ✅           | Nome civil do responsável                    |
| `data_nascimento` | date   | ✅           | Para maior segurança jurídica                |

### 🏢 Se Pessoa Jurídica (CNPJ)

| Campo                    | Tipo   | Obrigatório | Observações                                  |
| ------------------------ | ------ | ----------- | -------------------------------------------- |
| `cnpj`                   | string | ✅           | Validação obrigatória com dígito verificador |
| `razao_social`           | string | ✅           | Nome jurídico oficial                        |
| `nome_fantasia`          | string | ✅           | Nome comercial exibido no painel             |
| `responsavel_legal_nome` | string | ✅           | Pessoa que responde legalmente               |
| `responsavel_legal_cpf`  | string | ✅           | CPF do responsável                           |

### 🌐 Dados de interface e branding

| Campo          | Tipo   | Obrigatório | Observações                                 |
| -------------- | ------ | ----------- | ------------------------------------------- |
| `tenant_id`    | string | ✅           | Exibido como "Nome de Usuário" na interface |
| `nome_empresa` | string | ✅           | Usado para personalização no painel         |
| `logo_url`     | string | ❌           | Opcional, personalização visual             |

---

## 🧪 Campos adicionais recomendados (opcional)

| Campo                          | Tipo   | Utilidade                              |
| ------------------------------ | ------ | -------------------------------------- |
| `instagram_url`                | string | Pode ajudar o bot a entender a empresa |
| `site_url`                     | string | Complemento de branding                |
| `quantidade_clientes_estimado` | number | Para análise futura de planos          |
| `codigo_indicacao`             | string | Para rastrear afiliados ou campanhas   |

---

## 🛡️ Segurança e validação recomendadas

* Verificar CPF/CNPJ automaticamente com validador.
* Verificar e-mail com envio de código.
* Salvar IP, user-agent e data/hora do cadastro.
* Salvar histórico de versão do contrato aceito.
* **Autenticação em dois fatores** será implementada separadamente no módulo de segurança do sistema (pós-cadastro).

---

## 🔄 Fluxo a seguir após este certificado

1. **Criação da estrutura no banco de dados** (migrando tabela `tenants` para novo padrão)
2. **Criação dos endpoints de cadastro (`POST /auth/signup`)** com validações
3. **Construção do formulário no front-end (Signup.tsx)** com UX validando tipo de pessoa
4. **Geração de contrato personalizado com campos do cadastro**
5. **Integração com ASAAS ou sistema de cobrança para ativar plano**

---

Este documento é oficial e regerá toda a arquitetura de cadastro dos contratantes da plataforma MTM.

**Versão válida até que uma nova versão seja publicada com aceite obrigatório.**

---
