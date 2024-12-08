import axios from 'axios'
import { API_CONFIG } from '../config'

const request = axios.create({
  baseURL: API_CONFIG.GATEWAY_PREFIX,
  headers: {
    'Content-Type': 'application/proto'
  }
})

export const protoRequest = async (url, data = null, method = 'POST') => {
  try {
    const response = await request({
      url,
      method,
      data: data ? data.serializeBinary() : null,
    })
    return response.data
  } catch (error) {
    console.error('Proto request failed:', error)
    throw error
  }
}

export const wsProtoRequest = (url, data = null, onMessage, onError) => {
  const wsUrl = `${API_CONFIG.WS_PREFIX}${url}`
  const ws = new WebSocket(wsUrl)
  
  ws.onopen = () => {
    if (data) {
      ws.send(data.serializeBinary())
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