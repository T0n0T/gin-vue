import { channelApi } from '../api/channel'
import { useRouterStore } from '../store/router'

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
  getOrCreateEntry(devId, connId) {
    const key = this.getEntryKey(devId, connId)
    if (!this.entries.has(key)) {
      this.entries.set(key, new Entry(devId, connId))
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
    const upEntry = this.getOrCreateEntry(newRouter.upEntry.devId, newRouter.upEntry.connId)
    const downEntry = this.getOrCreateEntry(newRouter.downEntry.devId, newRouter.downEntry.connId)
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
    
    // 生成topic名称
    const topicName = `topic_${upKey}_${downKey}`
    
    // 创建或获取上行channel
    if (!this.upChannels.has(upKey)) {
      const upChannel = await channelApi.createChannel({
        entryId: upKey,
        direction: 'up'
      })
      this.upChannels.set(upKey, upChannel)
    }

    // 创建或获取下行channel
    if (!this.downChannels.has(downKey)) {
      const downChannel = await channelApi.createChannel({
        entryId: downKey,
        direction: 'down'
      })
      this.downChannels.set(downKey, downChannel)
    }

    // 处理topic绑定
    if (!this.topics.has(topicName)) {
      this.topics.set(topicName, {
        publishers: [upKey],
        subscribers: [downKey]
      })
    }

    // 绑定channel到topic
    await channelApi.bindChannel({
      channelId: this.upChannels.get(upKey),
      topic: topicName,
      role: 'publisher'
    })

    await channelApi.bindChannel({
      channelId: this.downChannels.get(downKey),
      topic: topicName,
      role: 'subscriber'
    })
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
    
    if (channelId) {
      // 解绑所有相关topic
      for (const [topicName, topic] of this.topics.entries()) {
        if (direction === 'up' && topic.publishers.includes(entryKey)) {
          await channelApi.unbindChannel({
            channelId,
            topic: topicName
          })
          topic.publishers = topic.publishers.filter(p => p !== entryKey)
        } else if (direction === 'down' && topic.subscribers.includes(entryKey)) {
          await channelApi.unbindChannel({
            channelId,
            topic: topicName
          })
          topic.subscribers = topic.subscribers.filter(s => s !== entryKey)
        }

        // 如果topic没有发布者或订阅者，则删除
        if (topic.publishers.length === 0 || topic.subscribers.length === 0) {
          this.topics.delete(topicName)
        }
      }

      // 销毁channel
      await channelApi.destroyChannel(channelId)
      channelMap.delete(entryKey)
    }
  }
}
