import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd(), '')
  return {
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
        '/service': {
          target: env.VITE_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/service/, '')
        },
        '/consul': {
          target: env.VITE_CONSUL_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/consul/, '')
        }
      }
    },
    define: {
      'process.env': {
        WS_PREFIX: env.VITE_WS_PREFIX,
        API_VERSION_PATH: env.VITE_API_VERSION_PATH
      }
    }
  }
})
