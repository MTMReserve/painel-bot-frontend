/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@client': path.resolve(__dirname, 'src/client'),
      '@server': path.resolve(__dirname, 'src/server'), // ✅ necessário para os testes
    },
  },
  server: {
    proxy: {
      '/auth': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
  test: {
    globals: true,              // ✅ permite uso de describe/it/expect
    environment: 'node',        // ✅ backend puro (sem DOM)
    include: ['src/server/tests/**/*.test.ts'], // ✅ onde estão os testes
  },
});
