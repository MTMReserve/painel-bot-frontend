// ==============================================
// File: src/client/pages/ResetarSenha.tsx
// ==============================================
 

import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "@client/services/api";

export default function ResetarSenha() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmacao, setConfirmacao] = useState("");
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async () => {
    if (!novaSenha || !confirmacao || novaSenha !== confirmacao) {
      setErro("As senhas não coincidem");
      return;
    }

    try {
      await api.post("/auth/resetar-senha", {
        token,
        novaSenha,
      });

      setMensagem("Senha redefinida com sucesso");
      setTimeout(() => navigate("/login"), 2000);
    } catch {
    setErro("Erro ao redefinir senha");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
        <h1 className="text-xl font-semibold mb-4 text-center">Redefinir Senha</h1>

        <input
          type="password"
          value={novaSenha}
          onChange={(e) => setNovaSenha(e.target.value)}
          placeholder="Nova senha"
          className="w-full p-2 border rounded mb-4"
        />

        <input
          type="password"
          value={confirmacao}
          onChange={(e) => setConfirmacao(e.target.value)}
          placeholder="Confirmar nova senha"
          className="w-full p-2 border rounded mb-4"
        />

        {erro && <p className="text-red-600 text-sm mb-2">{erro}</p>}
        {mensagem && <p className="text-green-600 text-sm mb-2">{mensagem}</p>}

        <button
          onClick={handleSubmit}
          className="w-full py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          Redefinir Senha
        </button>
      </div>
    </div>
  );
}
