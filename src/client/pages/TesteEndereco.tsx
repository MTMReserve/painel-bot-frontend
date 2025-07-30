import { useState } from "react";
import EnderecoForm from "../components/EnderecoForm";

export default function TesteEndereco() {
  const [endereco, setEndereco] = useState({});

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-xl font-bold mb-4">Teste de Endereço</h1>
      <EnderecoForm onChange={setEndereco} />
      <pre className="mt-6 bg-gray-100 p-4 rounded">{JSON.stringify(endereco, null, 2)}</pre>
    </div>
  );
}
