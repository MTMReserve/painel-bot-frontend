//================
// vite.config.ts
//================

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@client': path.resolve(__dirname, 'src/client'),
    },
  },
    server: {
    proxy: {
      '/auth': {
        target: 'http://localhost:3001', //API backend
        changeOrigin: true,
      },
    },
  },
});

