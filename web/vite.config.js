import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    host: true,
    listen: '0.0.0.0',
    proxy: {
      '/consul': {
        target: 'http://localhost:8500',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/consul/, '')
      }
    }
  }
})
