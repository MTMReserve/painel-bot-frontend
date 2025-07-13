// ===========================
// src/services/api.ts
// ===========================

import axios from "axios";

// ✅ Validação explícita para evitar falhas silenciosas
const baseURL = import.meta.env.VITE_API_URL;

if (!baseURL) {
  throw new Error("❌ VITE_API_URL não definido no .env");
}

export const api = axios.create({
  baseURL,
  timeout: 10000,
});

// ✅ Interceptor de requisição: adiciona token no cabeçalho se existir
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    const tenant_id = localStorage.getItem("tenant_id");

    // Cabeçalho com token
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Injeta tenant_id automaticamente nos params
    if (tenant_id) {
      if (!config.params) config.params = {};
      config.params.tenant_id = tenant_id;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
