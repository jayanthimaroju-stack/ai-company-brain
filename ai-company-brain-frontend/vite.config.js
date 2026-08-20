import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: true,
    proxy: {
      '/auth': { target: 'http://localhost:8080', changeOrigin: true },
      '/documents': { target: 'http://localhost:8080', changeOrigin: true },
      '/ai': { target: 'http://localhost:8080', changeOrigin: true },
      '/chat-history': { target: 'http://localhost:8080', changeOrigin: true },
      '/employees': { target: 'http://localhost:8080', changeOrigin: true }
    }
  }
})