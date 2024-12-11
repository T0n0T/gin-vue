import { channelApi } from '../api/channel'
import { useRouterStore } from '../store/router'
import { $root } from '../proto/wireless'

// Entry类定义
class Entry {
  constructor(devType, devId, connId) {
    this.devType = devType
    this.devId = devId
    this.connId = connId
    this.refCount = 0  // 引用计数
  }
}

/**
 * @typedef {Object} RouterEntry
 * @property {string} devType - 设备类型
 * @property {string} devId - 设备ID
 * @property {string} connId - 连接ID
 */

/**
 * @typedef {Object} Router
 * @property {string} id - 路由唯一标识符
 * @property {RouterEntry} upEntry - 上行设备入口
 * @property {RouterEntry} downEntry - 下行设备入口
 */

// 新增 Channel 类定义
class Channel {
  constructor(topic) {
    this.topic = topic
    this.upChanIDs = []    // 存储上行channel ID数组
    this.downChanIDs = []  // 存储下行channel ID数组
    this.upEntryKeys = new Set()    // 存储使用此channel的上行连接key
    this.downEntryKeys = new Set()  // 存储使用此channel的下行连接key
  }
}

/**
 * Router管理器类
 * @class RouterManager
 */
export class RouterManager {
  constructor() {
    this.store = useRouterStore()
    this.entries = new Map()  // 存储Entry，key为devId_connId
    this.channels = new Map() // 存储Channel对象，key为topic
  }

  // 生成Entry的key
  getEntryKey(devId, connId) {
    return `${devId}_${connId}`
  }

  // 获取或创建Entry
  getOrCreateEntry(devType, devId, connId) {
    const key = this.getEntryKey(devId, connId)
    if (!this.entries.has(key)) {
      this.entries.set(key, new Entry(devType, devId, connId))
    }
    return this.entries.get(key)
  }

  /**
   * 添加新的router并处理channel
   * @param {Router} newRouter - 要添加的新路由
   * @returns {Promise<void>}
   */
  async addRouter(newRouter) {
    // 检查是否已存在相同的router
    const existingRouter = this.store.routes.find(r => 
      r.upEntry.devId === newRouter.upEntry.devId && 
      r.upEntry.connId === newRouter.upEntry.connId &&
      r.downEntry.devId === newRouter.downEntry.devId &&
      r.downEntry.connId === newRouter.downEntry.connId
    )
    
    if (existingRouter) return

    // 创建或更新Entry
    const upEntry = this.getOrCreateEntry(
      newRouter.upEntry.devType,
      newRouter.upEntry.devId, 
      newRouter.upEntry.connId
    )
    const downEntry = this.getOrCreateEntry(
      newRouter.downEntry.devType,
      newRouter.downEntry.devId, 
      newRouter.downEntry.connId
    )
    upEntry.refCount++
    downEntry.refCount++

    // 处理channel和topic
    await this.handleChannels(newRouter)
    
    // 添加到store
    this.store.addRoute(newRouter)
  }

  // 生成topic名称
  getTopicName(upKey, downKey) {
    return `topic_${upKey}_${downKey}`
  }

  // 查找可复用的channel
  findReusableChannel(upKey, downKey) {
    for (const [topic, channel] of this.channels) {
      // 如果上行连接已经作为上行连接出现过
      if (channel.upEntryKeys.has(upKey)) {
        return { channel, reuseType: 'up' }
      }
      // 如果下行连接已经作为下行连接出现过
      if (channel.downEntryKeys.has(downKey)) {
        return { channel, reuseType: 'down' }
      }
    }
    return null
  }

  async handleChannels(router) {
    const upKey = this.getEntryKey(router.upEntry.devId, router.upEntry.connId)
    const downKey = this.getEntryKey(router.downEntry.devId, router.downEntry.connId)
    const upEntry = this.entries.get(upKey)
    const downEntry = this.entries.get(downKey)
    
    // 查找可复用的channel
    const reusable = this.findReusableChannel(upKey, downKey)
    
    if (!reusable) {
      // 没有可复用的channel，创建新的channel
      await this.createNewChannel(upKey, downKey, upEntry, downEntry)
    } else {
      // 复用已有channel
      await this.reuseChannel(reusable.channel, reusable.reuseType, upKey, downKey, upEntry, downEntry)
    }
  }

  async createNewChannel(upKey, downKey, upEntry, downEntry) {
    const topicName = this.getTopicName(upKey, downKey)
    const channel = new Channel(topicName)
    
    // 创建上行channel
    const upCreateContext = $root.api.wireless.v1.ChannelCreateContext.create({
      topic: topicName,
      type: $root.api.wireless.v1.ChannelType.Channel_TYPE_UP
    })
    const encodedUpCreateContext = $root.api.wireless.v1.ChannelCreateContext.encode(upCreateContext).finish()
    const upChannel = await channelApi.createChannel(encodedUpCreateContext, `/${upEntry.devType}`)
    channel.upChanIDs.push(upChannel.ID)
    
    // 创建下行channel
    const downCreateContext = $root.api.wireless.v1.ChannelCreateContext.create({
      topic: topicName,
      type: $root.api.wireless.v1.ChannelType.Channel_TYPE_DOWN
    })
    const encodedDownCreateContext = $root.api.wireless.v1.ChannelCreateContext.encode(downCreateContext).finish()
    const downChannel = await channelApi.createChannel(encodedDownCreateContext, `/${downEntry.devType}`)
    channel.downChanIDs.push(downChannel.ID)
    
    // 绑定channels
    await this.bindChannels(channel.upChanIDs[0], channel.downChanIDs[0], upEntry, downEntry)
    
    // 更新channel信息
    channel.upEntryKeys.add(upKey)
    channel.downEntryKeys.add(downKey)
    this.channels.set(topicName, channel)
  }

  async reuseChannel(channel, reuseType, upKey, downKey, upEntry, downEntry) {
    if (reuseType === 'up') {
      // 复用上行连接，创建新的下行channel
      const downCreateContext = $root.api.wireless.v1.ChannelCreateContext.create({
        topic: channel.topic,
        type: $root.api.wireless.v1.ChannelType.Channel_TYPE_DOWN
      })
      const encodedDownCreateContext = $root.api.wireless.v1.ChannelCreateContext.encode(downCreateContext).finish()
      const downChannel = await channelApi.createChannel(encodedDownCreateContext, `/${downEntry.devType}`)
      channel.downChanIDs.push(downChannel.ID)
      
      // 绑定新的下行channel
      await this.bindChannels(channel.upChanIDs[0], downChannel.ID, upEntry, downEntry)
      channel.downEntryKeys.add(downKey)
    } else {
      // 复用下行连接，创建新的上行channel
      const upCreateContext = $root.api.wireless.v1.ChannelCreateContext.create({
        topic: channel.topic,
        type: $root.api.wireless.v1.ChannelType.Channel_TYPE_UP
      })
      const encodedUpCreateContext = $root.api.wireless.v1.ChannelCreateContext.encode(upCreateContext).finish()
      const upChannel = await channelApi.createChannel(encodedUpCreateContext, `/${upEntry.devType}`)
      channel.upChanIDs.push(upChannel.ID)
      
      // 绑定新的上行channel
      await this.bindChannels(upChannel.ID, channel.downChanIDs[0], upEntry, downEntry)
      channel.upEntryKeys.add(upKey)
    }
  }

  async bindChannels(upChanId, downChanId, upEntry, downEntry) {
    // 绑定上行channel
    const upBindContext = $root.api.wireless.v1.ChannelBindContext.create({
      chanId: upChanId,
      devID: parseInt(upEntry.devId),
      connID: parseInt(upEntry.connId)
    })
    const encodedUpBindContext = $root.api.wireless.v1.ChannelBindContext.encode(upBindContext).finish()
    await channelApi.bindChannel(encodedUpBindContext, `/${upEntry.devType}`)

    // 绑定下行channel
    const downBindContext = $root.api.wireless.v1.ChannelBindContext.create({
      chanId: downChanId,
      devID: parseInt(downEntry.devId),
      connID: parseInt(downEntry.connId)
    })
    const encodedDownBindContext = $root.api.wireless.v1.ChannelBindContext.encode(downBindContext).finish()
    await channelApi.bindChannel(encodedDownBindContext, `/${downEntry.devType}`)
  }

  /**
   * 移除router
   * @param {Router} router - 要移除的路由
   * @returns {Promise<void>}
   */
  async removeRouter(router) {
    const upKey = this.getEntryKey(router.upEntry.devId, router.upEntry.connId)
    const downKey = this.getEntryKey(router.downEntry.devId, router.downEntry.connId)
    
    // 更新Entry引用计数
    const upEntry = this.entries.get(upKey)
    const downEntry = this.entries.get(downKey)
    
    if (upEntry) {
      upEntry.refCount--
      // 清理未使用的Entry
      if (upEntry.refCount === 0) {
        await this.cleanupChannel(upKey, 'up')
        this.entries.delete(upKey)
      }
    }

    if (downEntry) {
      downEntry.refCount--
      if (downEntry.refCount === 0) {
        await this.cleanupChannel(downKey, 'down')
        this.entries.delete(downKey)
      }
    }

    // 从store中移除
    this.store.deleteRoute(router.id)
  }

  // 清理channel相关资源
  async cleanupChannel(entryKey, direction) {
    const channelMap = direction === 'up' ? this.upChannels : this.downChannels
    const channelId = channelMap.get(entryKey)
    const entry = this.entries.get(entryKey)
    
    if (channelId) {
      // 解绑channel
      const bindContext = $root.api.wireless.v1.ChannelBindContext.create({
        chanId: channelId,
        devID: parseInt(entry.devId),
        connID: parseInt(entry.connId)
      })
      const encodedBindContext = $root.api.wireless.v1.ChannelBindContext.encode(bindContext).finish()
      await channelApi.unbindChannel(encodedBindContext, `/${entry.devType}`)

      // 销毁channel
      const channelContext = $root.api.wireless.v1.ChannelID.create({
        ID: channelId
      })
      const encodedChannelContext = $root.api.wireless.v1.ChannelID.encode(channelContext).finish()
      await channelApi.destroyChannel(encodedChannelContext, `/${entry.devType}`)

      // 从Map中移除
      channelMap.delete(entryKey)
    }
  }
}
