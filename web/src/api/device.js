/**
 * @module deviceApi
 * @description 设备管理相关的API接口
 */

import { protoRequest } from '../utils/request'

export const deviceApi = {
  /**
   * 检查设备状态
   * @async
   * @returns {Promise<Object>} 返回设备状态信息，包含deviceId等
   */
  checkDevice: (prefix = '') => {
    return protoRequest(prefix, `DeviceCheck`, null)
  },

  /**
   * 创建设备
   * @async
   * @param {Object} deviceContext - 设备创建所需的配置信息
   * @returns {Promise<Object>} 设备创建结果
   */
  createDevice: (deviceContext, prefix = '') => {
    return protoRequest(prefix, `DeviceCreate`, deviceContext)
  },

  /**
   * 销毁设备
   * @async
   * @param {string} deviceId - 设备ID
   * @returns {Promise<Object>} 设备销毁结果
   */
  destroyDevice: (deviceId, prefix = '') => {
    return protoRequest(prefix, `DeviceDestroy`, deviceId)
  },

  /**
   * 检查设备连接状态
   * @async
   * @param {string} deviceId - 设备ID
   * @returns {Promise<Object>} 返回连接状态信息，包含connectId等
   */
  checkDeviceConnect: (deviceId, prefix = '') => {
    return protoRequest(prefix, `DeviceConnectCheck`, deviceId)
  },

  /**
   * 创建设备连接
   * @async
   * @param {Object} connectContext - 连接创建所需的配置信息
   * @returns {Promise<Object>} 连接创建结果
   */
  createDeviceConnect: (connectContext, prefix = '') => {
    return protoRequest(prefix, `DeviceConnectCreate`, connectContext)
  },

  /**
   * 销毁设备连接
   * @async
   * @param {Object} destroyContext - 包含deviceId和connectId的销毁配置
   * @param {string} destroyContext.deviceId - 设备ID
   * @param {string} destroyContext.connectId - 连接ID
   * @returns {Promise<Object>} 连接销毁结果
   */
  destroyDeviceConnect: (destroyContext, prefix = '') => {
    return protoRequest(prefix, `DeviceConnectDestroy`, destroyContext)
  }
}
