import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'

export default defineConfig({
  plugins: [
    react(),
    basicSsl()
  ],
  base: '/certimet-web/',
  server: {
    https: true, // ya lo da basicSsl
    watch: {
      usePolling: true,
      interval: 100,
    },
    // 👇 Agregamos cabeceras para relajar CSP en desarrollo
    headers: {
      'Content-Security-Policy':
        "default-src 'self' https:; " +
        "script-src 'unsafe-inline' 'unsafe-eval' https:; " +
        "style-src 'unsafe-inline' https:; " +
        "img-src 'self' data: https:; " +
        "connect-src 'self' http://localhost:3000 https:;"
    }
  }
})