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
    // Cabeceras CSP corregidas para permitir reCAPTCHA de Google
    headers: {
      'Content-Security-Policy':
        "default-src 'self'; " +
        "script-src 'unsafe-inline' 'unsafe-eval' 'self' https://www.google.com https://www.gstatic.com https://www.recaptcha.net; " +
        "style-src 'unsafe-inline' 'self' https://fonts.googleapis.com; " +
        "img-src 'self' data: http://localhost:3000 https:; " +
        "frame-src 'self' https://www.google.com https://recaptcha.google.com https://www.recaptcha.net; " +
        "connect-src 'self' http://localhost:3000 https://www.google.com https://www.gstatic.com;"
    }
  }
})