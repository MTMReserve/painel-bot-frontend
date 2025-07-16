# 📄 API SCHEMA — /clients/:id

> Última atualização: 2025-07-13

---

## 📌 Endpoint
`GET /clients/:id?tenant_id=abc`

---

## 📥 Requisição

### Parâmetros de rota:

- `id`: ID do cliente (número)

### Query string obrigatória:

- `tenant_id`: Identificador da empresa (string)

---

## 📤 Resposta (200 OK)

### Tipo: `ClientResponse`

```ts
{
  id: number;
  name: string | null;
  full_name: string | null;
  phone: string | null;
  current_state: string | null;
  needs: string | null;
  budget: number | null;
  negotiated_price: number | null;
  address: string | null;
  payment_method: string | null;
  produto_id: string | null;
  etapa: string | null;
  email: string | null;
  status: string | null;
  criado_em: string | null;

  mensagens: {
    id: string;
    texto: string;
    timestamp: string;
    tipo: "enviada" | "recebida";
  }[];
}


🧪 Validações esperadas
mensagens sempre presente como array (pode estar vazio)

Todos os campos nullable podem retornar null

Campos tipo limitados a "enviada" ou "recebida"

🧱 Referência cruzada
Origem: Tabela clients + tabela conversations

Importado por: ClientDetail.tsx


---

## ✅ 3. Validador dinâmico — `getClientSchema.ts`

📁 **Local sugerido:** `src/client/validators/getClientSchema.ts`

Requer: `zod` (já usado no projeto ou instale com `npm i zod`)




Uso recomendado no front-end para validação:

import { clientResponseSchema } from "@/validators/getClientSchema";

api.get(`/clients/${id}`, { params: { tenant_id } })
  .then((res) => {
    const parsed = clientResponseSchema.parse(res.data); // valida!
    setCliente(parsed);
  })
  .catch(console.error);


