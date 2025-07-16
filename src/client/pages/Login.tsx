//============================
//src/client/pages/Login.tsx
//============================

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@client/store/useAuthStore';
import { api } from '@client/services/api';
import axios from 'axios';

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

  const handleGoogleLogin = () => {
    // 🔄 Redireciona sem tenant_id. O back decide se exige ou não.
    window.location.href = import.meta.env.VITE_GOOGLE_AUTH_URL;
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
          <button
            onClick={handleGoogleLogin}
            className="w-full py-2 border border-gray-400 rounded hover:bg-gray-100 flex items-center justify-center gap-2"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.37 9.11 3.59l6.81-6.81C35.41 2.1 29.99 0 24 0 14.72 0 6.91 5.93 3.6 14.35l7.94 6.17C13.43 13.33 18.29 9.5 24 9.5z"
              />
              <path
                fill="#34A853"
                d="M46.47 24.3c0-1.52-.14-2.99-.4-4.4H24v8.34h12.62c-.54 2.9-2.14 5.37-4.54 7.07l7.18 5.57c4.18-3.85 6.61-9.52 6.61-16.58z"
              />
              <path
                fill="#4A90E2"
                d="M24 48c6.48 0 11.92-2.14 15.9-5.79l-7.18-5.57c-2 1.39-4.56 2.2-8.72 2.2-6.71 0-12.41-4.43-14.46-10.47l-8.01 6.15C6.88 43.9 14.77 48 24 48z"
              />
              <path
                fill="#FBBC05"
                d="M3.6 14.35A23.97 23.97 0 000 24c0 3.72.88 7.23 2.45 10.33l8.01-6.15a14.38 14.38 0 010-11.83l-6.86-5.1z"
              />
            </svg>
            <span>Entrar com Google</span>
          </button>
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
