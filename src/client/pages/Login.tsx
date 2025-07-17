//============================
//src/client/pages/Login.tsx
//============================

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@client/store/useAuthStore';
import { api } from '@client/services/api';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import type { CredentialResponse } from '@react-oauth/google';


export default function Login() {
  const [tenantId, setTenantId] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleLogin = async () => {
    if (!tenantId.trim() || !senha.trim()) {
      setErro('Preencha todos os campos');
      return;
    }

    setLoading(true);
    setErro('');

    try {
      const response = await api.post('/auth/login', {
        identificador: tenantId,
        senha: senha,
      });

      const data = response.data;

      localStorage.setItem('tenant_id', data.tenant_id);
      localStorage.setItem('token', data.token);
      login(data.token, { nome: data.nome_empresa }, data.tenant_id);
      navigate('/dashboard');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        let msg = err.response?.data?.error || err.message || 'Erro ao fazer login';

        if (msg.includes('timeout')) {
          msg = 'Tempo de resposta excedido. Verifique sua conexão ou tente novamente.';
        }

        setErro(msg);
      } else {
        setErro('Erro desconhecido');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse: CredentialResponse) => {

    try {
      const { credential } = credentialResponse;

      if (!credential) {
        setErro("Erro ao obter credenciais do Google");
        return;
      }

      const response = await api.post('/auth/google', { credential });
      const data = response.data;

      localStorage.setItem('tenant_id', data.tenant_id);
      localStorage.setItem('token', data.token);
      login(data.token, { nome: data.nome_empresa }, data.tenant_id);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      setErro('Falha no login com Google');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
        <h1 className="text-2xl font-semibold mb-4 text-center">Login</h1>

        <input
          type="text"
          value={tenantId}
          onChange={(e) => setTenantId(e.target.value)}
          placeholder="Telefone, nome de usuário ou e-mail"
          className="w-full p-2 border rounded mb-4"
        />

        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Senha"
          className="w-full p-2 border rounded mb-4"
          onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
        />

        {erro && <p className="text-red-600 text-sm mb-2">{erro}</p>}

        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full py-2 rounded text-white ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600 mb-2">ou</p>
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={() => setErro('Erro ao autenticar com o Google')}
            useOneTap
          />
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600 mb-2">Primeira vez aqui?</p>
          <button
            onClick={() => navigate('/signup')}
            className="w-full py-2 border border-blue-500 text-blue-600 rounded hover:bg-blue-50"
          >
            Criar conta
          </button>
        </div>

        <div className="mt-4 text-center">
          <p
            onClick={() => navigate('/recuperar-senha')}
            className="text-xs text-gray-500 hover:underline cursor-pointer"
          >
            Esqueceu a senha?
          </p>
        </div>
      </div>
    </div>
  );
}
