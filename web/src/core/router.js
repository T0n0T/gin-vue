import { channelApi } from '../api/channel'
import { root } from '../proto/wireless' // 导入生成的 protobuf 定义

/**
 * @class Channel
 * @description 通道实例，负责通道的创建、绑定和使能
 */
export class Channel {
  /**
   * 创建通道实例
   * @param {DeviceManager} deviceManager - 设备管理器实例
   */
  constructor(deviceManager) {
    /** @type {DeviceManager} 设备管理器实例 */
    this.deviceManager = deviceManager
    /** @type {number|null} 通道ID */
    this.channelId = null
    
    // 获取 Proto 消息类型
    this.ChannelCreateContext = root.lookupType('api.wireless.v1.ChannelCreateContext')
    this.ChannelBindContext = root.lookupType('api.wireless.v1.ChannelBindContext')
    this.ChannelID = root.lookupType('api.wireless.v1.ChannelID')
  }

  /**
   * 创建并配置通道
   * @async
   * @param {string} topic - 通道主题
   * @param {string} type - 通道类型
   * @returns {Promise<string>} 返回通道ID
   * @throws {Error} 通道创建失败时抛出错误
   */
  async createChannel(topic, type) {
    try {
      // 1. 创建通道
      const createMessage = this.ChannelCreateContext.create({
        topic: topic,
        type: type
      })
      const channelResult = await this.channelCreate(createMessage)
      this.channelId = channelResult.ID

      // 2. 绑定通道到设备连接
      const bindMessage = this.ChannelBindContext.create({
        chanId: this.channelId,
        devID: this.deviceManager.deviceId,
        connID: this.deviceManager.connectId
      })
      await this.channelBind(bindMessage)

      // 3. 使能通道
      const enableMessage = this.ChannelID.create({
        ID: this.channelId
      })
      await this.channelEnable(enableMessage)

      return this.channelId
    } catch (error) {
      console.error('通道创建失败:', error)
      throw error
    }
  }

  /**
   * 创建通道
   * @async
   * @param {Object} params - 通道创建参数
   * @param {string} params.topic - 通道主题
   * @param {string} params.type - 通道类型
   * @returns {Promise<Object>} 返回包含channelId的结果对象
   */
  async channelCreate(params) {
    // 验证消息
    const errMsg = this.ChannelCreateContext.verify(params)
    if (errMsg) throw Error(errMsg)
    
    return channelApi.createChannel(params)
  }

  /**
   * 绑定通道到设备连接
   * @async
   * @param {Object} params - 通道绑定参数
   * @param {string} params.channelId - 通道ID
   * @param {string} params.deviceId - 设备ID
   * @param {string} params.connectId - 连接ID
   * @returns {Promise<void>}
   */
  async channelBind(params) {
    const errMsg = this.ChannelBindContext.verify(params)
    if (errMsg) throw Error(errMsg)
    
    return channelApi.bindChannel(params)
  }

  /**
   * 使能通道
   * @async
   * @param {string} channelId - 通道ID
   * @returns {Promise<void>}
   */
  async channelEnable(channelId) {
    const errMsg = this.ChannelID.verify(channelId)
    if (errMsg) throw Error(errMsg)
    
    return channelApi.enableChannel(channelId)
  }

  /**
   * 清理通道资源
   * @async
   * @returns {Promise<void>}
   */
  async destroy() {
    if (this.channelId) {
      const message = this.ChannelID.create({
        ID: this.channelId
      })
      await channelApi.destroyChannel(message)
      this.channelId = null
    }
  }
} 