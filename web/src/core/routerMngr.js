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
 * Router管理器类
 * @class RouterManager
 */
export class RouterManager {
  constructor() {
    this.store = useRouterStore()
    this.entries = new Map()  // 存储Entry，key为devId_connId
    this.upChannels = new Map()  // 存储上行channel信息
    this.downChannels = new Map()  // 存储下行channel信息
    this.topics = new Map()  // 存储topic信息
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

  // 添加新的router并处理channel
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

  // 处理channel和topic的创建和绑定
  async handleChannels(router) {
    const upKey = this.getEntryKey(router.upEntry.devId, router.upEntry.connId)
    const downKey = this.getEntryKey(router.downEntry.devId, router.downEntry.connId)
    
    const upEntry = this.entries.get(upKey)
    const downEntry = this.entries.get(downKey)
    
    // 生成topic名称
    const topicName = `topic_${upKey}_${downKey}`
    
    // 创建上行channel
    if (!this.upChannels.has(upKey)) {
      // 创建并序列化ChannelCreateContext
      const createContext = $root.api.wireless.v1.ChannelCreateContext.create({
        topic: topicName,
        type: $root.api.wireless.v1.ChannelType.Channel_TYPE_UP
      })
      const encodedCreateContext = $root.api.wireless.v1.ChannelCreateContext.encode(createContext).finish()
      
      const upChannel = await channelApi.createChannel(encodedCreateContext, `/${upEntry.devType}`)
      this.upChannels.set(upKey, upChannel.ID)
    }

    // 创建下行channel
    if (!this.downChannels.has(downKey)) {
      const createContext = $root.api.wireless.v1.ChannelCreateContext.create({
        topic: topicName, 
        type: $root.api.wireless.v1.ChannelType.Channel_TYPE_DOWN
      })
      const encodedCreateContext = $root.api.wireless.v1.ChannelCreateContext.encode(createContext).finish()
      
      const downChannel = await channelApi.createChannel(encodedCreateContext, `/${downEntry.devType}`)
      this.downChannels.set(downKey, downChannel.ID)
    }

    // 绑定上行channel
    const upBindContext = $root.api.wireless.v1.ChannelBindContext.create({
      chanId: this.upChannels.get(upKey),
      devID: parseInt(router.upEntry.devId),
      connID: parseInt(router.upEntry.connId)
    })
    const encodedUpBindContext = $root.api.wireless.v1.ChannelBindContext.encode(upBindContext).finish()
    await channelApi.bindChannel(encodedUpBindContext, `/${upEntry.devType}`)

    // 绑定下行channel  
    const downBindContext = $root.api.wireless.v1.ChannelBindContext.create({
      chanId: this.downChannels.get(downKey),
      devID: parseInt(router.downEntry.devId), 
      connID: parseInt(router.downEntry.connId)
    })
    const encodedDownBindContext = $root.api.wireless.v1.ChannelBindContext.encode(downBindContext).finish()
    await channelApi.bindChannel(encodedDownBindContext, `/${downEntry.devType}`)
  }

  // 移除router
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
