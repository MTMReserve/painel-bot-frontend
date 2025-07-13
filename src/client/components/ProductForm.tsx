
//=======================================
//src/client/components/ProductForm.tsx
//=======================================

import { useState } from "react";
import { useCreateProduct } from "@/hooks/useCreateProduct";
import { useAuthStore } from "@/store/useAuthStore";
import type { FormaPagamento, TipoEntrega } from "@/types/Product";

const FORMAS_PAGAMENTO: FormaPagamento[] = [
  "pix",
  "debito",
  "credito",
  "boleto",
  "dinheiro",
  "transferencia",
  "link_pagamento",
  "outros",
];

const TIPOS_ENTREGA: TipoEntrega[] = [
  "retirada",
  "envio",
  "digital",
  "servico_local",
  "visita_cliente",
  "outros",
];

export function ProductForm() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [formasPagamento, setFormasPagamento] = useState<FormaPagamento[]>([]);
  const [entrega, setEntrega] = useState<TipoEntrega>("retirada");
  const [instrucoesPagamento, setInstrucoesPagamento] = useState("");
  const [instrucoesEntrega, setInstrucoesEntrega] = useState("");
  const [camposObrigatorios, setCamposObrigatorios] = useState<string>("");

  const createProduct = useCreateProduct();
  const tenantId = useAuthStore((state) => state.tenant_id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const campos = camposObrigatorios
      .split(",")
      .map((campo) => campo.trim())
      .filter(Boolean);

    if (!tenantId) {
      alert("Erro: tenant_id não encontrado. Faça login novamente.");
      return;
    }

    createProduct.mutate({
      tenant_id: tenantId,
      nome,
      descricao,
      preco,
      formas_pagamento: formasPagamento,
      entrega,
      instrucoes_pagamento: instrucoesPagamento,
      instrucoes_entrega: instrucoesEntrega,
      campos_obrigatorios: campos,
    });
  };

  const toggleFormaPagamento = (forma: FormaPagamento) => {
    setFormasPagamento((prev) =>
      prev.includes(forma)
        ? prev.filter((f) => f !== forma)
        : [...prev, forma]
    );
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl p-4 bg-white rounded shadow space-y-4">
      <h2 className="text-xl font-bold">Cadastrar Produto</h2>

      {/* Campo de tenant_id removido — será lido da store */}

      <input
        type="text"
        placeholder="Nome do produto"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />

      <textarea
        placeholder="Descrição"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        className="w-full p-2 border rounded"
        rows={3}
        required
      />

      <input
        type="text"
        placeholder="Preço"
        value={preco}
        onChange={(e) => setPreco(e.target.value)}
        className="w-full p-2 border rounded"
      />

      <fieldset className="space-y-1">
        <legend className="font-semibold">Formas de Pagamento</legend>
        {FORMAS_PAGAMENTO.map((forma) => (
          <label key={forma} className="block text-sm">
            <input
              type="checkbox"
              checked={formasPagamento.includes(forma)}
              onChange={() => toggleFormaPagamento(forma)}
              className="mr-2"
            />
            {forma}
          </label>
        ))}
      </fieldset>

      <select
        value={entrega}
        onChange={(e) => setEntrega(e.target.value as TipoEntrega)}
        className="w-full p-2 border rounded"
      >
        {TIPOS_ENTREGA.map((tipo) => (
          <option key={tipo} value={tipo}>
            {tipo}
          </option>
        ))}
      </select>

      <textarea
        placeholder="Instruções de pagamento"
        value={instrucoesPagamento}
        onChange={(e) => setInstrucoesPagamento(e.target.value)}
        className="w-full p-2 border rounded"
        rows={2}
      />

      <textarea
        placeholder="Instruções de entrega"
        value={instrucoesEntrega}
        onChange={(e) => setInstrucoesEntrega(e.target.value)}
        className="w-full p-2 border rounded"
        rows={2}
      />

      <input
        type="text"
        placeholder="Campos obrigatórios (separados por vírgula)"
        value={camposObrigatorios}
        onChange={(e) => setCamposObrigatorios(e.target.value)}
        className="w-full p-2 border rounded"
      />

      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
        disabled={createProduct.status === "pending"}
      >
        {createProduct.status === "pending" ? "Salvando..." : "Salvar Produto"}
      </button>

      {createProduct.isError && (
        <p className="text-red-600 text-sm">Erro ao salvar produto.</p>
      )}

      {createProduct.isSuccess && (
        <p className="text-green-600 text-sm">Produto salvo com sucesso!</p>
      )}
    </form>
  );
}
