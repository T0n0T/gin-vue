import { protoRequest, wsProtoRequest } from '../utils/request'

export const adapterApi = {
  // 检查适配器状态
  checkAdapter: (prefix = '') => {
    return protoRequest(`${prefix}/AdapterCheck`, null)
  },

  // 扫描适配器 (WebSocket 流式请求)
  scanAdapter: (scanRequest, onMessage, onError, prefix = '') => {
    return wsProtoRequest(`${prefix}/AdapterScan`, scanRequest, onMessage, onError)
  },

  // 配置适配器
  configureAdapter: (configureRequest, prefix = '') => {
    return protoRequest(`${prefix}/AdapterConfigure`, configureRequest)
  }
}
