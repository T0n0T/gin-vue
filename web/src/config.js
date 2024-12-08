const env = import.meta.env

export const API_CONFIG = {
  GATEWAY_PREFIX: env.VITE_GATEWAY_PREFIX || '/api.wireless.v1',
  WS_PREFIX: env.VITE_WS_PREFIX || 'ws://localhost:8080/api.wireless.v1'
} 