// ==============================================
// File: src/client/pages/RecuperarSenha.tsx
// ==============================================

import { useState } from "react";
import { api } from "@client/services/api";
import { useNavigate } from "react-router-dom";

export default function RecuperarSenha() {
  const [tenantId, setTenantId] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!tenantId.trim() || !email.trim()) {
      setErro("Preencha todos os campos.");
      return;
    }

    setLoading(true);
    setErro("");
    setMensagem("");

    try {
      await api.post("/auth/recuperar-senha", {
        tenant_id: tenantId,
        email,
      });

      setMensagem("Instruções de redefinição enviadas para seu e-mail.");
    } catch {
      setErro("Erro ao enviar instruções. Verifique os dados.");
      } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
        <h1 className="text-2xl font-semibold mb-4 text-center">Recuperar Senha</h1>

        <input
          type="text"
          value={tenantId}
          onChange={(e) => setTenantId(e.target.value)}
          placeholder="ID da empresa (tenant_id)"
          className="w-full p-2 border rounded mb-4"
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail cadastrado"
          className="w-full p-2 border rounded mb-4"
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />

        {erro && <p className="text-red-600 text-sm mb-2">{erro}</p>}
        {mensagem && <p className="text-green-600 text-sm mb-2">{mensagem}</p>}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full py-2 rounded text-white ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Enviando..." : "Enviar instruções"}
        </button>

        <div className="mt-4 text-center">
          <button
            onClick={() => navigate("/login")}
            className="text-sm text-blue-600 hover:underline"
          >
            Voltar para login
          </button>
        </div>
      </div>
    </div>
  );
}
