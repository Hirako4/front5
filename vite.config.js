// vite.config.js
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  // Базовый путь — нужен для корректной работы при размещении в подпапке
  base: '/front5/',

  plugins: [
    vue(),
                            vueDevTools(),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },

  // (Опционально) явно укажем порт для dev-сервера, если нужно
  server: {
    port: 5173,
    strictPort: true,
    // Чтобы SPA-роуты (типа /profile/123) работали в dev-режиме при использовании base
    // Vite автоматически обрабатывает это, но если будут проблемы — раскомментируй:
    // host: 'localhost'
  },

  // (Опционально) для preview-режима
  preview: {
    port: 5173,
    strictPort: true
  }
})
