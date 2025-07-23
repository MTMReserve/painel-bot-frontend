// ✅ src/client/hooks/useCampoExistente.ts 
import { useState } from "react";
import { api } from "@client/services/api";

export function useCampoExistente() {
  const [existente, setExistente] = useState(false);
  const [erro, setErro] = useState("");

  async function verificar(campo: "cpf" | "telefone" | "email" | "tenant_id", valor: string) {
    setErro("");
    try {
      const res = await api.get("/auth/verificar-existencia", {
        params: { campo, valor },
      });
      setExistente(res.data.existe);
      if (res.data.existe) {
        setErro(`${campo.toUpperCase()} já cadastrado`);
      }
    } catch {
      setErro("Erro ao verificar campo");
    }
  }

  return { existente, erro, verificar };
}
