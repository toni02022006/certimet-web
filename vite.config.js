import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react()
  ],
  // ¡ESTE ES EL CAMBIO CLAVE PARA PRODUCCIÓN!
  base: '/', 
  
  // Esto se ignora en producción, pero déjalo para tu desarrollo local
  server: {
    watch: {
      usePolling: true,
      interval: 100,
    },
    headers: {
      'Content-Security-Policy':
        "default-src 'self'; " +
        "script-src 'unsafe-inline' 'unsafe-eval' 'self'; " +
        "style-src 'unsafe-inline' 'self' https://fonts.googleapis.com; " +
        "img-src 'self' data: https://api.certimet.pe https:; " + 
        "connect-src 'self' https://api.certimet.pe;"
    }
  }
})