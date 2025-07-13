//==========================
//src/pages/Login.tsx
//==========================

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';

export default function Login() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleLogin = () => {
    if (email.trim()) {
      const fakeTenantId = "abc"; // depois você pode tornar isso dinâmico
      localStorage.setItem("tenant_id", fakeTenantId); // 🧩 ESSENCIAL!
      localStorage.setItem("token", "fake-token");     // se for necessário no futuro
      login('fake-token', {
        id: 1,
        nome: 'Admin',
        email,
      }, fakeTenantId);
      navigate('/dashboard');
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
        <h1 className="text-2xl font-semibold mb-4 text-center">Login</h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu e-mail"
          className="w-full p-2 border rounded mb-4"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Entrar
        </button>
      </div>
    </div>
  );
}
