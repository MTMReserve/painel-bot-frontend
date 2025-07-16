// ===============================
// File: src/client/pages/Signup.tsx
// ===============================

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@client/services/api';
import { useAuthStore } from '@client/store/useAuthStore';
import axios from 'axios';

export default function Signup() {
  const [tenantId, setTenantId] = useState('');
  const [nomeEmpresa, setNomeEmpresa] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async () => {
    if (!tenantId || !nomeEmpresa || !senha || !confirmarSenha) {
      setErro('Preencha todos os campos');
      return;
    }

    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem');
      return;
    }

    try {
      setLoading(true);
      setErro('');

      const response = await api.post('/auth/register', {
        tenant_id: tenantId,
        nome_empresa: nomeEmpresa,
        senha: senha,
      });

      const data = response.data;

      localStorage.setItem('tenant_id', data.tenant_id);
      localStorage.setItem('token', data.token);

      login(data.token, { nome: data.nome_empresa }, data.tenant_id);

      navigate('/dashboard');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const msg = err.response?.data?.error || err.message || 'Erro ao cadastrar';
        setErro(msg);
      } else {
        setErro('Erro desconhecido');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
        <h1 className="text-2xl font-semibold mb-4 text-center">Criar Conta</h1>

        <input
          type="text"
          value={tenantId}
          onChange={(e) => setTenantId(e.target.value)}
          placeholder="ID da empresa (único)"
          className="w-full p-2 border rounded mb-3"
        />

        <input
          type="text"
          value={nomeEmpresa}
          onChange={(e) => setNomeEmpresa(e.target.value)}
          placeholder="Nome da empresa"
          className="w-full p-2 border rounded mb-3"
        />

        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Senha"
          className="w-full p-2 border rounded mb-3"
        />

        <input
          type="password"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
          placeholder="Confirmar senha"
          className="w-full p-2 border rounded mb-3"
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        />

        {erro && <p className="text-red-600 text-sm mb-3">{erro}</p>}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full py-2 rounded text-white ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {loading ? 'Cadastrando...' : 'Cadastrar empresa'}
        </button>
      </div>
    </div>
  );
}
