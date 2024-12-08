import { protoRequest, wsProtoRequest } from '../utils/request'

export const adapterApi = {
  // 检查适配器状态
  checkAdapter: () => {
    return protoRequest('/AdapterCheck', null)
  },

  // 扫描适配器 (WebSocket 流式请求)
  scanAdapter: (scanRequest, onMessage, onError) => {
    return wsProtoRequest('/AdapterScan', scanRequest, onMessage, onError)
  },

  // 配置适配器
  configureAdapter: (configureRequest) => {
    return protoRequest('/AdapterConfigure', configureRequest)
  }
}
