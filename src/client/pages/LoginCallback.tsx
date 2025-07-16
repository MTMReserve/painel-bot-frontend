// ================================
// File: src/client/pages/LoginCallback.tsx
// ================================

import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@client/store/useAuthStore';

export default function LoginCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    const tenant_id = searchParams.get('tenant_id');

    if (tenant_id) {
      // Simula nome da empresa com base no tenant_id
      const nome_empresa = tenant_id;

      localStorage.setItem('tenant_id', tenant_id);
      login(undefined, { nome: nome_empresa }, tenant_id);
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  }, [searchParams, login, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-700">Redirecionando...</p>
    </div>
  );
}
