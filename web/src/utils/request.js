import axios from 'axios'
import { API_CONFIG } from '../config'

/**
 * 创建一个预配置的 axios 实例，用于处理 protobuf 请求。
 * @constant {import('axios').AxiosInstance}
 * @description 这个实例预配置了基础URL和 protobuf 相关的请求头。
 * 所有通过这个实例发送的请求都将使用这些基本配置。
 */
const request = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: {
    'Content-Type': 'application/proto'
  }
})

/**
 * 发送一个基于protobuf的HTTP请求。
 * @param {string} prefix - 请求路径的前缀，例如 'ble'。
 * @param {string} url - 请求的URL，例如 'api.wireless.v1/DeviceCreate'。
 * @param {Object|null} [data=null] - 要发送的数据对象，必须实现serializeBinary方法。
 * @param {string} [method='POST'] - HTTP请求方法。
 * @returns {Promise<Object>} 返回一个Promise，解析为响应数据。
 * @throws {Error} 如果请求失败。
 */
export const protoRequest = async (prefix, url, data = null, method = 'POST') => {
  try {
    const fullUrl = `${prefix}/${API_CONFIG.API_VERSION_PATH}/${url}`
    const response = await request({
      url: fullUrl,
      method,
      data: data,
    })
    return response.data
  } catch (error) {
    console.error('Proto request failed:', error)
    throw error
  }
}

/**
 * 发送一个基于protobuf的WebSocket请求。
 * @param {string} prefix - WebSocket路径的前缀，例如 'ble'。
 * @param {string} url - WebSocket的URL，例如 'api.wireless.v1/DeviceCreate'。
 * @param {Object|null} [data=null] - 要发送的数据对象，必须实现serializeBinary方法。
 * @param {function} onMessage - 当接收到消息时调用的回调函数。
 * @param {function} [onError] - 当发生错误时调用的回调函数。
 * @returns {Object} 返回一个对象，包含关闭WebSocket的方法和WebSocket实例。
 */
export const wsProtoRequest = (prefix, url, data = null, onMessage, onError) => {
  const fullUrl = `${prefix}stream/${API_CONFIG.API_VERSION_PATH}/${url}`
  const wsUrl = `${API_CONFIG.WS_PREFIX}/${fullUrl}`
  const ws = new WebSocket(wsUrl)
  
  ws.onopen = () => {
    if (data) {
      ws.send(data)
    }
  }

  ws.onmessage = (event) => {
    onMessage(event.data)
  }

  ws.onerror = (error) => {
    console.error('WebSocket error:', error)
    onError?.(error)
  }

  return {
    close: () => ws.close(),
    ws
  }
}

export default request 