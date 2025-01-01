import { channelApi } from '../api/channel'
import { api } from '../proto/wireless'

// Entry类定义
class Entry {
  constructor(devType, devID, connID) {
    this.devType = devType
    this.devID = devID
    this.connID = connID
    this.refCount = 0  // 引用计数
    this.chanID = null // 通道ID
  }
}

// Channel类定义
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
    this.entries = new Map()  // 存储Entry，key为devID_connID
    this.channels = new Map() // 存储Channel对象，key为topic
  }

  // 生成Entry的key
  getEntryKey(devID, connID) {
    return `${devID}_${connID}`
  }

  // 获取或创建Entry
  getOrCreateEntry(devType, devID, connID) {
    const key = this.getEntryKey(devID, connID)
    if (!this.entries.has(key)) {
      this.entries.set(key, new Entry(devType, devID, connID))
    }
    return this.entries.get(key)
  }

  /**
   * 初始化方法，使用pinia中的route表单数据重建entry和channel
   * @param {Array} routes - pinia中存储的所有route表单数据
   */
  init(routes) {
    for (const route of routes) {
      const upEntry = this.getOrCreateEntry(
        route.upEntry.devType,
        route.upEntry.conn.devID,
        route.upEntry.conn.connID
      )
      const downEntry = this.getOrCreateEntry(
        route.downEntry.devType,
        route.downEntry.conn.devID,
        route.downEntry.conn.connID
      )
      upEntry.refCount++
      downEntry.refCount++
    }
  }

  /**
   * 添加新的router并处理channel
   * @param {Object} routeForm - 路由表单对象
   * @returns {Promise<void>}
   */
  async addRouter(routeForm) {
    try {
      // 创建或更新Entry
      const upEntry = this.getOrCreateEntry(
        routeForm.upEntry.devType,
        routeForm.upEntry.conn.devID,
        routeForm.upEntry.conn.connID
      )
      const downEntry = this.getOrCreateEntry(
        routeForm.downEntry.devType,
        routeForm.downEntry.conn.devID,
        routeForm.downEntry.conn.connID
      )
      upEntry.refCount++
      downEntry.refCount++

      // 处理channel和topic
      await this.handleChannels(routeForm)
    } catch (error) {
      throw error
    }
  }

  // 生成topic名称
  getTopicName(upKey, downKey) {
    return `topic_${upKey}_${downKey}`
  }

  // 查找可复用的channel
  findReusableChannel(upKey, downKey) {
    for (const [topic, channel] of this.channels) {
      if (channel.upEntryKeys.has(upKey)) {
        return { channel, reuseType: 'up' }
      }
      if (channel.downEntryKeys.has(downKey)) {
        return { channel, reuseType: 'down' }
      }
    }
    return null
  }

  async handleChannels(routeForm) {
    try {
      const upKey = this.getEntryKey(routeForm.upEntry.conn.devID, routeForm.upEntry.conn.connID)
      const downKey = this.getEntryKey(routeForm.downEntry.conn.devID, routeForm.downEntry.conn.connID)
      const upEntry = this.entries.get(upKey)
      const downEntry = this.entries.get(downKey)

      // 查找可复用的channel
      const reusable = this.findReusableChannel(upKey, downKey)

      if (!reusable) {
        await this.createNewChannel(upKey, downKey, upEntry, downEntry)
      } else {
        await this.reuseChannel(reusable.channel, reusable.reuseType, upKey, downKey, upEntry, downEntry)
      }

      // 更新表单中的channel ID
      routeForm.upEntry.chanID = upEntry.chanID
      routeForm.downEntry.chanID = downEntry.chanID
      console.log('handle finished', routeForm)
    } catch (error) {
      throw error
    }
  }

  async createNewChannel(upKey, downKey, upEntry, downEntry) {
    try {
      const topicName = this.getTopicName(upKey, downKey)
      const channel = new Channel(topicName)

      // 创建上行channel
      const encodedUpCreateContext = api.wireless.v1.ChannelCreateContext.encode({
        topic: topicName,
        type: api.wireless.v1.ChannelType.Channel_TYPE_UP
      }).finish()
      const upChannelresponse = await channelApi.createChannel(encodedUpCreateContext, `${upEntry.devType}`)
      const upChannel = api.wireless.v1.ChannelID.decode(upChannelresponse)
      channel.upChanIDs.push(upChannel.ID)

      // 创建下行channel
      const encodedDownCreateContext = api.wireless.v1.ChannelCreateContext.encode({
        topic: topicName,
        type: api.wireless.v1.ChannelType.Channel_TYPE_DOWN
      }).finish()
      const downChannelresponse = await channelApi.createChannel(encodedDownCreateContext, `${downEntry.devType}`)
      const downChannel = api.wireless.v1.ChannelID.decode(downChannelresponse)
      channel.downChanIDs.push(downChannel.ID)

      // 绑定channels
      await this.bindChannels(channel.upChanIDs[0], channel.downChanIDs[0], upEntry, downEntry)

      // 更新channel信息
      channel.upEntryKeys.add(upKey)
      channel.downEntryKeys.add(downKey)
      this.channels.set(topicName, channel)
    } catch (error) {
      throw error
    }
  }

  async reuseChannel(channel, reuseType, upKey, downKey, upEntry, downEntry) {
    try {
      if (reuseType === 'up') {
        const encodedDownCreateContext = api.wireless.v1.ChannelCreateContext.encode({
          topic: channel.topic,
          type: api.wireless.v1.ChannelType.Channel_TYPE_DOWN
        }).finish()
        const downChannelresponse = await channelApi.createChannel(encodedDownCreateContext, `${downEntry.devType}`)
        const downChannel = api.wireless.v1.ChannelID.decode(downChannelresponse)
        channel.downChanIDs.push(downChannel.ID)
        await this.bindChannels(channel.upChanIDs[0], downChannel.ID, upEntry, downEntry)
        channel.downEntryKeys.add(downKey)
      } else {
        const encodedUpCreateContext = api.wireless.v1.ChannelCreateContext.encode({
          topic: channel.topic,
          type: api.wireless.v1.ChannelType.Channel_TYPE_UP
        }).finish()
        const upChannelresponse = await channelApi.createChannel(encodedUpCreateContext, `${upEntry.devType}`)
        const upChannel = api.wireless.v1.ChannelID.decode(upChannelresponse)
        channel.upChanIDs.push(upChannel.ID)
        await this.bindChannels(upChannel.ID, channel.downChanIDs[0], upEntry, downEntry)
        channel.upEntryKeys.add(upKey)
      }
    } catch (error) {
      throw error
    }
  }

  async bindChannels(upChanId, downChanId, upEntry, downEntry) {
    try {
      const encodedUpBindContext = api.wireless.v1.ChannelBindContext.encode({
        chanId: upChanId,
        devID: parseInt(upEntry.devID),
        connID: parseInt(upEntry.connID)
      }).finish()
      await channelApi.bindChannel(encodedUpBindContext, `${upEntry.devType}`)
      upEntry.chanID = upChanId

      const encodedDownBindContext = api.wireless.v1.ChannelBindContext.encode({
        chanId: downChanId,
        devID: parseInt(downEntry.devID),
        connID: parseInt(downEntry.connID)
      }).finish()
      await channelApi.bindChannel(encodedDownBindContext, `${downEntry.devType}`)
      downEntry.chanID = downChanId
    } catch (error) {
      throw error
    }
  }

  /**
   * 移除router
   * @param {Object} routeForm - 路由表单对象
   * @returns {Promise<void>}
   */
  async removeRouter(routeForm) {
    try {
      const upKey = this.getEntryKey(routeForm.upEntry.conn.devID, routeForm.upEntry.conn.connID)
      const downKey = this.getEntryKey(routeForm.downEntry.conn.devID, routeForm.downEntry.conn.connID)

      // 更新Entry引用计数
      const upEntry = this.entries.get(upKey)
      const downEntry = this.entries.get(downKey)

      if (upEntry) {
        upEntry.refCount--
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

      // 销毁channel
      await channelApi.destroyChannel(routeForm.upEntry.chanID)
      await channelApi.destroyChannel(routeForm.downEntry.chanID)
    } catch (error) {
      throw error
    }
  }

  async cleanupChannel(entryKey, direction) {
    try {
      for (const [topic, channel] of this.channels) {
        if (direction === 'up' && channel.upEntryKeys.has(entryKey)) {
          for (const chanId of channel.upChanIDs) {
            const entry = this.entries.get(entryKey)
            if (!entry) continue
            const encodedBindContext = api.wireless.v1.ChannelBindContext.encode({
              chanId: chanId,
              devID: parseInt(entry.devID),
              connID: parseInt(entry.connID)
            }).finish()
            await channelApi.unbindChannel(encodedBindContext, `${entry.devType}`)
            const encodedChannelContext = api.wireless.v1.ChannelID.encode({
              ID: chanId
            }).finish()
            await channelApi.destroyChannel(encodedChannelContext, `${entry.devType}`)
          }
          channel.upEntryKeys.delete(entryKey)
          if (channel.upEntryKeys.size === 0 && channel.downEntryKeys.size === 0) {
            this.channels.delete(topic)
          }
          break
        } else if (direction === 'down' && channel.downEntryKeys.has(entryKey)) {
          for (const chanId of channel.downChanIDs) {
            const entry = this.entries.get(entryKey)
            const encodedBindContext = api.wireless.v1.ChannelBindContext.encode({
              chanId: chanId,
              devID: parseInt(entry.devID),
              connID: parseInt(entry.connID)
            }).finish()
            await channelApi.unbindChannel(encodedBindContext, `${entry.devType}`)
            const encodedChannelContext = api.wireless.v1.ChannelID.encode({
              ID: chanId
            }).finish()
            await channelApi.destroyChannel(encodedChannelContext, `${entry.devType}`)
          }
          channel.downEntryKeys.delete(entryKey)
          if (channel.upEntryKeys.size === 0 && channel.downEntryKeys.size === 0) {
            this.channels.delete(topic)
          }
          break
        }
      }
    } catch (error) {
      throw error
    }
  }

  /**
   * 启用router
   * @param {Object} routeForm - 路由表单对象
   * @returns {Promise<void>}
   */
  async enableRouter(routeForm) {
    try {
      const encodedUpChannelId = api.wireless.v1.ChannelID.encode({
        ID: routeForm.upEntry.chanID
      }).finish()
      await channelApi.enableChannel(encodedUpChannelId, `${routeForm.upEntry.devType}`)

      const encodedDownChannelId = api.wireless.v1.ChannelID.encode({
        ID: routeForm.downEntry.chanID
      }).finish()
      await channelApi.enableChannel(encodedDownChannelId, `${routeForm.downEntry.devType}`)

      routeForm.status = 'enabled'
    } catch (error) {
      throw error
    }
  }

  /**
   * 禁用router
   * @param {Object} routeForm - 路由表单对象
   * @returns {Promise<void>}
   */
  async disableRouter(routeForm) {
    try {
      const encodedUpChannelId = api.wireless.v1.ChannelID.encode({
        ID: routeForm.upEntry.chanID
      }).finish()
      await channelApi.disableChannel(encodedUpChannelId, `${routeForm.upEntry.devType}`)

      const encodedDownChannelId = api.wireless.v1.ChannelID.encode({
        ID: routeForm.downEntry.chanID
      }).finish()
      await channelApi.disableChannel(encodedDownChannelId, `${routeForm.downEntry.devType}`)

      routeForm.status = 'disabled'
    } catch (error) {
      throw error
    }
  }
}
