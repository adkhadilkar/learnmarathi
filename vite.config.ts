import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Served from a project subpath on GitHub Pages: https://<user>.github.io/learnmarathi/
export default defineConfig({
  base: '/learnmarathi/',
  plugins: [react(), tailwindcss()],
  server: { host: true },
})
