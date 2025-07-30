✅ Resumo das Decisões
Fonte de verdade: back-end (tabela tenants).

Formato do endereço: igual ao cadastro — o cliente informa CEP, número e complemento. Os demais campos (logradouro, bairro, cidade, estado) são preenchidos automaticamente após buscar o CEP.

Campos a remover do front-end: endereco, observacoes e qualquer outro campo que não exista na tabela tenants.

✅ Lista de Campos Permitidos para Edição no Perfil
Com base na tabela tenants, você pode permitir edição dos seguintes campos:

Comuns (para qualquer empresa):
nome_empresa

logo_url

telefone

email

Endereço (dividido em entrada de CEP, número, complemento):
cep

numero

complemento

⚠️ logradouro, bairro, cidade, estado são preenchidos automaticamente pela API de CEP e enviados ao backend, mas não são editáveis diretamente pelo usuário.

🔒 Campos não devem ser editáveis (bloqueados no frontend)
Esses campos são sensíveis para segurança, integridade de cobrança ou rastreabilidade:

tenant_id (identificador único)

plano (alterado apenas via painel/admin/webhook ASAAS)

cpf, cnpj, data_nascimento, razao_social, nome_fantasia, responsavel_legal_nome, responsavel_legal_cpf (dados jurídicos e fiscais)

criado_em, termo_versao, aceitou_termos_em, google_id, senha_hash

🧩 Regras para Implementação
Reutilizar o mesmo formato de endereço do Signup.tsx

Buscar CEP → preencher auto os campos ocultos (logradouro, bairro, cidade, estado).

Exibir inputs apenas para cep, numero, complemento.

Validar dados obrigatórios antes de salvar:

nome_empresa, cep, numero, cidade, estado são obrigatórios.

Ajustar o PUT /tenant/me no back para aceitar todos os campos válidos que você permitir editar (iremos revisar isso em seguida).

🔁 Etapas seguintes (para garantir tudo certo)
 Atualizar o formulário de TenantProfile.tsx para conter apenas os campos válidos (baseado no banco).

 Reaproveitar componente de endereço usado no Signup.tsx.

 Criar ou atualizar useUpdateTenant.ts para enviar os campos permitidos.

 Garantir que o back-end aceite atualização desses campos via PUT /tenant/me.

 Testar comportamento de atualização e exibição.

 Adicionar temporizador de edição se necessário (ex: bloqueio após 15 minutos? Um botão “Editar” que habilita os campos por 5 min? Podemos discutir isso).


 ======================================================================================================================================================================================================================================

 ✅ ANÁLISE E PLANO DE REESTRUTURAÇÃO DO PERFIL TENANT
📁 ARQUIVOS EXISTENTES RELACIONADOS
Função	Arquivo
Página de perfil do tenant	src/client/pages/TenantProfile.tsx
Componente de endereço (referência)	src/client/pages/Signup.tsx
Hook de busca e envio de perfil	src/client/hooks/useTenantProfile.ts, useUpdateTenant.ts
Tipagem da resposta	src/client/types/TenantProfileResponse.ts
API cliente	src/client/services/api.ts
Tipagem no servidor	src/server/types/TenantProfileResponse.ts, src/server/models/Tenant.ts
Endpoint de update	src/server/controllers/tenantController.ts
Service backend	src/server/services/tenantService.ts
Validação backend	src/server/schemas/tenantProfileSchema.ts

📌 MÓDULOS A AJUSTAR, REAPROVEITAR OU CRIAR
1. 🛠️ FRONT-END
🔄 A refatorar:
TenantProfile.tsx

Remover campos inválidos: endereco, observacoes, etc.

Mostrar apenas: nome_empresa, logo_url, telefone, email, cep, numero, complemento

Campos como logradouro, bairro, cidade, estado: preenchidos automaticamente e ocultos

useUpdateTenant.ts

Garantir que envie apenas os campos válidos

Atualizar o tipo UpdateTenantData (se não existir, criar em types/UpdateTenantData.ts)

TenantProfileResponse.ts

Validar se está compatível com Tenant.ts (back-end)

♻️ A reutilizar:
Lógica de endereço de Signup.tsx

Buscar CEP → preencher auto

Reutilizar ou extrair componente EnderecoForm.tsx contendo:

Inputs visíveis: cep, numero, complemento

Campos ocultos: logradouro, bairro, cidade, estado

🆕 A criar:
components/EnderecoForm.tsx (reutilizável)

types/UpdateTenantData.ts (separado para enviar ao back)

2. 🛠️ BACK-END
🔄 A revisar/ajustar:
tenantController.ts:

Verificar PUT /tenant/me (deve aceitar todos os campos permitidos)

tenantService.ts:

Validar sanitização dos campos

Garantir que campos sensíveis não possam ser alterados:

tenant_id, cpf, plano, senha_hash, etc.

tenantProfileSchema.ts:

Validar se aceita os novos campos (cep, numero, complemento, etc.)

Pode exigir ajustes para bater com a ficha vinda do front

Tenant.ts:

Confirmar que todos os campos existem

Campos: cep, logradouro, bairro, cidade, estado, numero, complemento

✅ RESUMO FINAL DAS TAREFAS
🔧 REESTRUTURAR
 TenantProfile.tsx com campos válidos e inputs corretos

 useUpdateTenant.ts para envio limpo e validado

 TenantProfileResponse.ts com os campos reais

🧱 REUTILIZAR / EXTRAIR
 Lógica de busca de endereço do Signup.tsx

 Criar EnderecoForm.tsx para reaproveitar nos dois pontos

🛡️ AJUSTAR BACKEND
 tenantController.ts: verificar endpoint PUT /tenant/me

 tenantService.ts: sanitizar entrada e proteger campos

 tenantProfileSchema.ts: aceitar e validar os campos reais do banco

🔍 TESTAR
 Edição funcionando com busca de CEP

 Campos protegidos bloqueados

 Dados atualizados no banco com segurança

 ===================================================================================================================

 📅 CRONOGRAMA DE EXECUÇÃO (BAIXO RISCO)
🔁 Fase 1 — Diagnóstico e Validação (Hoje)
Objetivo: Mapear tudo que será alterado sem afetar o sistema.

Tarefa	Arquivo	Ação
✅ Validar campos reais do banco	models/Tenant.ts	Confirmar quais campos existem
✅ Validar schema e controller	tenantProfileSchema.ts, tenantController.ts	Verificar se aceitam os campos
✅ Validar resposta atual	TenantProfileResponse.ts front/back	Confirmar estrutura correta
✅ Validar uso do CEP no Signup	Signup.tsx	Mapear para reutilização

🧩 Fase 2 — Criação isolada de novo componente (Endereço)
Duração estimada: 2 horas
Risco: Baixíssimo (nada integrado ainda)

Tarefa	Arquivo	Ação
📄 Criar components/EnderecoForm.tsx	novo	Input de cep, numero, complemento
⚙️ Reutilizar lógica de busca de CEP	Signup.tsx	Adaptar para componente externo
📦 Exportar dados para o formulário pai	EnderecoForm.tsx → props	Emitir valores dos campos ocultos (logradouro, etc.)

✅ Após isso, você pode testar esse componente sozinho, sem integrar ainda.

✍️ Fase 3 — Refatoração do TenantProfile com os novos campos
Duração estimada: 2–3 horas
Risco: Moderado (impacta tela ativa, mas com campos reduzidos)

Tarefa	Arquivo	Ação
🧼 Remover campos inválidos do perfil	TenantProfile.tsx	endereco, observacoes, etc.
🆕 Usar <EnderecoForm /> no formulário	TenantProfile.tsx	Com dados enviados ao salvar
💡 Validar campos obrigatórios	TenantProfile.tsx	nome_empresa, cep, cidade, estado
💾 Conectar com useUpdateTenant.ts	hook	Enviar apenas campos válidos

🛠️ Fase 4 — Ajustes e testes no Back-End
Duração estimada: 1 hora
Risco: Baixo (endpoint já existe)

Tarefa	Arquivo	Ação
🔍 Revisar PUT /tenant/me	tenantController.ts	Garantir campos aceitos
🛡️ Sanitizar campos proibidos	tenantService.ts	Não permitir alterar tenant_id, etc.
✅ Validar com schema	tenantProfileSchema.ts	Aceitar cep, numero, cidade etc.

🧪 Fase 5 — Testes e simulações (pré-merge)
Duração estimada: 1–2 horas
Risco: Nenhum, apenas testes

Tarefa	Teste	Esperado
✔️ Editar nome, telefone, logo	Perfil	Atualiza com sucesso
✔️ Buscar CEP → auto preencher	Endereço	Campos ocultos preenchidos
❌ Tentar alterar tenant_id, plano, cpf	Rejeitado	Backend ignora esses campos
🧼 Campos não usados não devem estar no payload	Ex: observacoes	Não enviados no PUT

🔐 Fase 6 — Deploy e monitoramento (opcional)
Sugestão: Deploy parcial em ambiente de homologação

====================================================================================================================

✅ Diagnóstico: Campos Reais da Tabela tenants
🟢 Campos Permitidos para Edição
Esses campos são seguros e relevantes para o perfil, e podem ser editados no front-end:

Categoria	Campos
Empresa	nome_empresa
Logo	logo_url
Contato	telefone, email
Endereço	cep, numero, complemento
(Ocultos, auto preenchidos)	logradouro, cidade, estado

🔒 Campos Sensíveis (Não Editáveis)
Esses campos não devem ser alterados via front-end por questões de segurança, integridade jurídica ou rastreabilidade:

Categoria	Campos
Identificador	tenant_id
Autenticação	senha_hash, google_id, token
Jurídico (PF e PJ)	cpf, nome_completo, data_nascimento
cnpj, razao_social, nome_fantasia, responsavel_legal_nome, responsavel_legal_cpf
Contrato e plano	plano, termo_versao, aceitou_termos_em
Data de criação	criado_em

🚫 Campos inexistentes no modelo
Os seguintes campos foram usados anteriormente no front e devem ser removidos, pois não existem no back-end:

endereco

observacoes

🧩 Conclusão da Etapa 1.1 — Diagnóstico de Campos
Etapa	Status	Observações
✔️ Validar campos no Tenant.ts	✅ Concluído	Estrutura conferida com base na interface Tenant
🚫 Remover campos inválidos	⚠️ Pendente	endereco, observacoes precisam ser removidos do front
🔒 Bloquear campos sensíveis	⚠️ Pendente	Confirmar proteção no front e backend

====================================================================================================================

✅ ANÁLISE ESTRUTURADA DO Signup.tsx
🔍 1. Campos atualmente usados
Campo	Origem	Presente no banco?	Editável no perfil?
tenant_id	formulário	✅ Sim	❌ Não
nome_empresa	formulário	✅ Sim	✅ Sim
email	formulário	✅ Sim	✅ Sim
telefone	formulário	✅ Sim	✅ Sim
senha, confirmarSenha	formulário	🔒 Hash	❌ Não
aceitouTermos, termo_versao	formulário	✅ Sim	❌ Não
cep, logradouro, bairro, numero, complemento, cidade, estado	endereço	✅ Sim	✅ Parcial (CEP, número, complemento)
tipo_pessoa	formulário	✅ Sim	❌ Não
Pessoa Física: cpf, nome_completo, data_nascimento	formulário	✅ Sim	❌ Não
Pessoa Jurídica: cnpj, razao_social, nome_fantasia, responsavel_legal_nome, responsavel_legal_cpf	formulário	✅ Sim	❌ Não
plano	formulário	✅ Sim	❌ Não
logo_url	ausente	✅ Sim	✅ Deve ser incluído no perfil

🔁 O que será reutilizado no TenantProfile.tsx
Componente/Bloco	Motivo
📦 cep com busca automática via viacep	✅ Será reutilizado como base no componente EnderecoForm.tsx
🧾 Campos logradouro, bairro, cidade, estado	✅ Serão preenchidos automaticamente e não editáveis
📫 Inputs numero e complemento	✅ Editáveis no perfil
☑️ Validações em tempo real + setErrosPorCampo	✅ Excelente padrão a ser mantido

⚠️ O que deve ser extraído para componente reutilizável
🔨 Novo componente: EnderecoForm.tsx
Função: Formulário modular de endereço, com:

CEP buscado por viaCEP

Campos ocultos (auto-preenchidos): logradouro, bairro, cidade, estado

Campos visíveis: cep, numero, complemento

Comunicação via props com o formulário pai (ex: onChange, value)

🔧 O que será refatorado ou descartado no perfil
Elemento do Signup.tsx	Ação no TenantProfile.tsx
senha, confirmarSenha, aceitouTermos, tipo_pessoa, plano	❌ Remover do perfil
tenant_id, cpf, cnpj, etc.	❌ Mostrar como readOnly ou não mostrar
logo_url	✅ Incluir no perfil com campo para link ou upload de imagem
form.nome_empresa, form.telefone, form.email	✅ Manter, com reaproveitamento de validação e estilos

📋 Conclusão da Fase 1.2 — Diagnóstico do Signup.tsx
Ação	Status
✔️ Validar estrutura atual	✅ Concluído
✅ Identificar partes reaproveitáveis	✅ Concluído
🔨 Planejar extração para componente reutilizável	✅ Endereço isolado como EnderecoForm.tsx
🧹 Planejar o que será removido do TenantProfile.tsx	✅ Campos sensíveis e de criação

====================================================================================================================

✅ RELATÓRIO DA FASE 1 — Diagnóstico e Validação
Objetivo: Mapear toda a estrutura atual relacionada ao perfil do tenant, sem causar impacto no sistema, e definir com segurança as ações futuras para permitir edição de perfil empresarial no painel.

🔍 1.1 — Validação da Estrutura Real da Tabela tenants (Tenant.ts)
Arquivo analisado: src/server/models/Tenant.ts

✅ Conclusões:
A tabela tenants possui os seguintes campos permitidos para edição:

nome_empresa, logo_url, telefone, email

cep, numero, complemento (visíveis)

logradouro, bairro, cidade, estado (ocultos, auto-preenchidos)

Campos sensíveis que não devem ser editados:

tenant_id, senha_hash, plano, cpf, cnpj, google_id, termo_versao, aceitou_termos_em, criado_em

🧠 Tarefa gerada:
 Remover do front campos inexistentes (endereco, observacoes)

 Garantir que apenas campos autorizados sejam enviados no PUT

🔍 1.2 — Validação do Schema tenantProfileSchema.ts e Controller tenantController.ts
Arquivos analisados:

src/server/schemas/tenantProfileSchema.ts

src/server/controllers/tenantController.ts

✅ Conclusões:
O schema atual (tenantProfileSchema) aceita campos indevidos (tenant_id, plano) e não aceita os campos que o front vai enviar.

O handler PUT /tenant/me atualiza apenas nome_empresa e ignora o restante do perfil.

Nenhuma validação Zod é aplicada no controller atualmente.

🧠 Tarefas geradas:
 Criar novo schema tenantProfileUpdateSchema com os campos reais permitidos.

 Substituir o updateTenantProfileHandler para usar esse novo schema.

 Criar a função updateTenantProfile no tenantService.ts para aplicar os dados.

🔍 1.3 — Validação da Resposta TenantProfileResponse.ts
Arquivos envolvidos:

src/client/types/TenantProfileResponse.ts

src/server/types/TenantProfileResponse.ts (espelho seguro)

✅ Conclusões:
O tipo está de acordo com os dados exibidos no painel.

Mas não serve como base para envio de atualização, apenas para exibição.

Não há tipo claro de envio ainda (sugestão: criar UpdateTenantData.ts no front).

🧠 Tarefas geradas:
 Criar novo tipo UpdateTenantData no front para envio seguro ao back.

 Ajustar hook useUpdateTenant.ts para usar esse tipo e enviar dados corretos.

🔍 1.4 — Validação da Lógica de CEP no Signup.tsx
Arquivo analisado: src/client/pages/Signup.tsx

✅ Conclusões:
A lógica de busca de CEP preenche corretamente os campos ocultos (logradouro, bairro, cidade, estado) com base no cep.

Os campos numero e complemento são editáveis.

A lógica pode ser reaproveitada isoladamente em um novo componente reutilizável.

🧠 Tarefas geradas:
 Criar componente EnderecoForm.tsx com:

Entrada de cep, numero, complemento

Preenchimento automático dos campos ocultos

Comunicação com o componente pai via props/eventos

📌 Tarefas Geradas pela Fase 1 (Consolidadas)
Tarefa	Tipo	Fase de Execução
Remover campos fictícios do front (endereco, observacoes)	Refatoração	Fase 3
Criar schema tenantProfileUpdateSchema com os campos reais	Backend	Fase 4
Substituir updateTenantProfileHandler para aceitar múltiplos campos	Backend	Fase 4
Criar updateTenantProfile() no tenantService.ts	Backend	Fase 4
Criar tipo UpdateTenantData.ts no front-end	Tipagem	Fase 3
Refatorar hook useUpdateTenant.ts para usar o novo tipo	Hook Front	Fase 3
Criar componente EnderecoForm.tsx reutilizável	Frontend	Fase 2

🧩 Situação Final da Fase 1
Etapa	Status	Observação
Validação dos campos do banco	✅	Confirmado no Tenant.ts
Validação do schema e controller	✅	Exige refatoração controlada futura
Validação da resposta	✅	Tipagem correta para exibição, não envio
Validação do uso do CEP	✅	Lógica 100% reaproveitável

===================================================================================================================

✅ Objetivo do EnderecoForm.tsx
Componente de formulário reutilizável que:

Recebe e exibe os campos:

cep, numero, complemento

Busca o endereço completo via API pública (viacep)

Preenche automaticamente os campos ocultos:

logradouro, bairro, cidade, estado

Envia os dados para o componente pai via onChange

===========================================================================================

✅ Conclusão da Fase 2 — Componente Endereço
Tarefa	Status	Observações
📄 Criar EnderecoForm.tsx	✅	Componente funcional e reutilizável
⚙️ Reutilizar lógica de CEP	✅	100% baseada no Signup.tsx
📦 Exportar dados para o formulário pai via props	✅	Já integrado com onChange()
🧪 Teste visual com página separada (/teste-endereco)	✅	Campos dinâmicos exibidos corretamente