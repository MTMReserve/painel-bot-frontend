DOCUMENTO DE ALINHAMENTO FINAL — INTEGRAÇÃO FRONT-END × BACK-END DO BOT
Este documento define as regras de integração e responsabilidades de cada camada (front/back), respeitando as decisões tomadas no cronograma técnico e no questionário de funcionalidades.

🧭 1. OBJETIVO
Criar um painel web usado por empresas clientes (B2B) do bot SaaS, permitindo que visualizem, filtrem, analisem e respondam conversas com clientes (B2C) que interagem com o bot via WhatsApp.

🔌 2. PRINCÍPIOS DE INTEGRAÇÃO
O painel nunca define dados do funil, apenas exibe e organiza os dados salvos pelo bot.

Toda a lógica de negócio (extração, etapas, temperatura, status, etc.) é de responsabilidade do back-end do bot.

O front deve ser reativo, visual e analítico, sem alterar regras do funil.

📊 3. DADOS PRINCIPAIS VINDOS DO BACK
Campo	Origem	Função no painel
id	Mongo/MySQL	Identificador único
nome	extraído do bot	Exibir no card e detalhe
current_state	lógica do bot	Etapa no funil (entrada → fechamento)
status	IA + heurística	Exibe ativo, perdido, reengajado, fechado
temperatura	IA (perfil)	Frio, morno ou quente (visual e filtro)
produto_id	ficha de produto	Associar à linha de produto
ultima_interacao	logs do bot	Exibir data/hora
ultima_mensagem_cliente	logs do bot	Resumo na listagem
ultima_resposta_bot	logs do bot	Última fala do bot
dados_extraidos	extração dinâmica	Campos como pagamento, necessidade, objeção

🧩 4. FUNCIONALIDADES CRÍTICAS DO PAINEL
✅ Visualização:
Cards por etapa

Gráficos de funil (Bar + Pie)

Kanban com drag-and-drop (apenas leitura)

Lista de conversas com:

Nome

Última mensagem

Etapa, status, temperatura

Data da última interação

✅ Filtros:
Por etapa (current_state)

Por status

Por temperatura

Por data da última interação

Por tags (ex: VIP, urgente)

Por nome/telefone

Por produto (produto_id)

✅ Detalhamento de cliente:
Chat com histórico (somente leitura ou leitura+resposta, conforme permissões)

Dados extraídos ao lado (produto, necessidade, pagamento, objeção)

Visualização do funil percorrido (futuro)

Transcrição de áudios (futuro)

🔐 5. PERMISSÕES E MULTIUSUÁRIOS
Cada empresa terá múltiplos logins (admin, leitura, produto específico)

O painel poderá limitar visualizações com base em permissões

Filtros personalizados serão salvos por usuário

⚠️ 6. O QUE NÃO PODE SER DECIDIDO PELO FRONT
Ação	Motivo
Mudar etapa do cliente	Isso depende de regras internas do bot
Mudar temperatura	Só a IA pode recalcular
Editar dados extraídos manualmente	São campos validados automaticamente
Criar mensagens automáticas	Só o bot decide o que enviar
Atribuir atendente	Ainda não implementado na IA

✏️ 7. O QUE O FRONT PODE DECIDIR LIVREMENTE
Item	Justificativa
Layout dos cards, gráficos, componentes	Estética do painel
Cores e ícones por etapa/status	Padrão visual
Agrupamento visual por filtros	Interface
Responsividade (desktop/mobile)	UI
Exibição de chips ou labels	Apenas leitura
Criação de tags visuais	Não alteram comportamento da IA

🧠 8. RESUMO DE MÓDULOS ATUAIS QUE DEVEM SER ALIMENTADOS PELO BACK
Componente Front	Depende de	Observação
Dashboard.tsx	GET /stats/funnel	Já definido
Kanban.tsx	GET /clients?filtros	Requer endpoint com filtros
ClientsList.tsx	GET /clients	Com paginação opcional
ClientDetail.tsx	GET /clients/:id/messages	Histórico real com dados extraídos

