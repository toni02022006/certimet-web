import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react()
    // Eliminamos basicSsl()
  ],
  base: '/certimet-web/',
  server: {
    // Eliminamos https: true
    watch: {
      usePolling: true,
      interval: 100,
    },
    // Ajustamos las cabeceras CSP para permitir que las imágenes vengan de localhost:3000
    headers: {
      'Content-Security-Policy':
        "default-src 'self'; " +
        "script-src 'unsafe-inline' 'unsafe-eval' 'self'; " +
        "style-src 'unsafe-inline' 'self' https://fonts.googleapis.com; " +
        "img-src 'self' data: http://localhost:3000 https:; " + // <- Aquí agregamos http://localhost:3000
        "connect-src 'self' http://localhost:3000;"
    }
  }
})