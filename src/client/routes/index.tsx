// ============================
// File: src/client/routes/index.tsx
// ============================

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "@client/components/Layout";
import Dashboard from "@client/pages/Dashboard";
import ClientsList from "@client/pages/ClientsList";
import ClientDetail from "@client/pages/ClientDetail";
import TesteApi from "@client/pages/TesteApi";
import Login from "@client/pages/Login";
import Signup from "@client/pages/Signup";
import RecuperarSenha from "@client/pages/RecuperarSenha";
import ResetarSenha from "@client/pages/ResetarSenha";
import ProductsPage from "@client/pages/ProductsPage";
import ProtectedRoute from "./ProtectedRoute";
import PublicOnlyRoute from "./PublicOnlyRoute";
import { useAuthStore } from "@client/store/useAuthStore";
import TenantProfile from "@client/pages/TenantProfile";
import Contrato from "@client/pages/Contrato";
import LoginCallback from "../pages/LoginCallback";
import LoginError from "../pages/LoginError";
import Termos from "../pages/Termos";
import TesteEndereco from "../pages/TesteEndereco";
import ProductFormPage from "@client/pages/ProductFormPage";


export default function AppRoutes() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated());

  return (
    <BrowserRouter>
      <Routes>
        {/* 🔁 Callback do Google - precisa ser antes de ProtectedRoute */}
        <Route path="/login/callback" element={<LoginCallback />} />
        <Route path="/login-callback" element={<LoginCallback />} />

        {/* Rotas públicas que só podem ser acessadas se NÃO estiver logado */}
        <Route path="/teste-endereco" element={<TesteEndereco />} />
        <Route
          path="/login"
          element={
            <PublicOnlyRoute>
              <Login />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicOnlyRoute>
              <Signup />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/login/error"
          element={<LoginError />}
        />
        {/* Recuperação de Senha */}
        <Route
          path="/recuperar-senha"
          element={
            <PublicOnlyRoute>
              <RecuperarSenha />
            </PublicOnlyRoute>
          }
        />
        {/* Redefinição Senha */}
        <Route
          path="/resetar-senha/:token"
          element={
            <PublicOnlyRoute>
              <ResetarSenha />
            </PublicOnlyRoute>
          }
        />

        {/* ✅ Rota pública dos Termos de Serviço */}
        <Route path="/termos" element={<Termos />} />

        {/* Rotas protegidas */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/clientes" element={<ClientsList />} />
          <Route path="/clientes/:id" element={<ClientDetail />} />
          <Route path="/teste-api" element={<TesteApi />} />
          <Route path="/produtos" element={<ProductsPage />} />
          <Route path="/perfil" element={<TenantProfile />} />
          <Route path="/contrato" element={<Contrato />} />
          <Route path="/products/new" element={<ProductFormPage />} />
          <Route path="/products/:id/edit" element={<ProductFormPage />} />
        </Route>

        {/* Redirecionamento padrão */}
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}
