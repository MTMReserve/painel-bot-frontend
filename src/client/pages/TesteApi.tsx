//========================
// src/pages/TesteApi.tsx
//========================

import { useEffect, useState } from "react";
import { api } from "@/services/api";

export default function TesteApi() {
  const [mensagem, setMensagem] = useState("Carregando...");
  const [erro, setErro] = useState("");

  useEffect(() => {
    api.get("/clients")
      .then((res) => {
        setMensagem("✅ Conectado com sucesso! Dados recebidos:");
        console.log(res.data);
      })
      .catch((err) => {
        setErro("❌ Erro ao conectar com o back-end");
        console.error(err);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Teste de conexão com API</h1>
      {erro ? (
        <p className="text-red-600">{erro}</p>
      ) : (
        <p className="text-green-600">{mensagem}</p>
      )}
    </div>
  );
}
