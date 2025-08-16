import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5173, // default Vite port, adjust if needed
      timeout: 30000,
      overlay: true,
    },
    watch: {
      usePolling: true, // Ensures changes are picked up instantly
    },
  },
})
