import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl' // <-- 1. Importas el plugin

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    basicSsl() // <-- 2. Lo agregas a la lista de plugins
  ],
  base: '/certimet-web/',
  server: {
    watch: {
      usePolling: true,
      interval: 100,
    }
  }
})