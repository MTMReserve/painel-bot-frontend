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