// ================================
// File: src/routes/index.tsx
// ================================

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Dashboard from "@/pages/Dashboard";
import ClientsList from "@/pages/ClientsList";
import ClientDetail from "@/pages/ClientDetail"; // ✅ NOVO
import TesteApi from "@/pages/TesteApi";
import Login from "@/pages/Login";
import ProductsPage from "@/pages/ProductsPage"; 
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota pública */}
        <Route path="/login" element={<Login />} />

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
          <Route path="/clientes/:id" element={<ClientDetail />} /> {/* ✅ NOVO */}
          <Route path="/teste-api" element={<TesteApi />} />
          <Route path="/produtos" element={<ProductsPage />} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
