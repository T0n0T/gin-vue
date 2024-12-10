const env = import.meta.env

export const API_CONFIG = {
  BASE_URL: env.VITE_BASE_URL || 'http://localhost:8080',
  WS_PREFIX: env.VITE_WS_PREFIX || 'ws://localhost:8080',
  API_VERSION_PATH: env.VITE_API_VERSION_PATH || '/api.wireless.v1'
} 
