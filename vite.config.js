import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react()
  ],
  // ¡ESTE ES EL CAMBIO CLAVE PARA PRODUCCIÓN!
  base: '/', 
  
  // Esto se ignora en producción (build), pero déjalo por si corres en modo preview
  server: {
    watch: {
      usePolling: true,
      interval: 100,
    },
    // Cabeceras CSP fusionadas: URLs de producción + URLs de desarrollo + permisos para reCAPTCHA
    headers: {
      'Content-Security-Policy':
        "default-src 'self'; " +
        "script-src 'unsafe-inline' 'unsafe-eval' 'self' https://www.google.com https://www.gstatic.com https://www.recaptcha.net; " +
        "style-src 'unsafe-inline' 'self' https://fonts.googleapis.com; " +
        // 👇 Se agregó http://localhost:3000 para permitir imágenes en local
        "img-src 'self' data: https://api.certimet.pe http://localhost:3000 https:; " + 
        "frame-src 'self' https://www.google.com https://recaptcha.google.com https://www.recaptcha.net; " +
        // 👇 Se agregó http://localhost:3000 para permitir llamadas a la API en local
        "connect-src 'self' https://api.certimet.pe http://localhost:3000 https://www.google.com https://www.gstatic.com;"
    }
  }
})