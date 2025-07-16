// ================================
// File: src/client/pages/LoginError.tsx
// ================================

import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function LoginError() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/login');
    }, 5000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg text-center w-96">
        <h2 className="text-xl font-bold text-red-600 mb-4">Erro ao fazer login com Google</h2>
        <p className="text-gray-700 mb-2">
          Algo deu errado ao tentar autenticar sua conta.
        </p>
        <p className="text-gray-600 text-sm">
          Você será redirecionado para a tela de login em 5 segundos.
        </p>
        <button
          onClick={() => navigate('/login')}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Voltar agora
        </button>
      </div>
    </div>
  );
}