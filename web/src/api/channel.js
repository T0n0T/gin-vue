import { protoRequest } from '../utils/request'

export const channelApi = {
  // 创建通道
  createChannel: (createContext, prefix = '') => {
    return protoRequest(`${prefix}/ChannelCreate`, createContext)
  },

  // 销毁通道
  destroyChannel: (channelId, prefix = '') => {
    return protoRequest(`${prefix}/ChannelDestroy`, channelId)
  },

  // 绑定通道
  bindChannel: (bindContext, prefix = '') => {
    return protoRequest(`${prefix}/ChannelBind`, bindContext)
  },

  // 解绑通道
  unbindChannel: (bindContext, prefix = '') => {
    return protoRequest(`${prefix}/ChannelUnbind`, bindContext)
  },

  // 启用通道
  enableChannel: (channelId, prefix = '') => {
    return protoRequest(`${prefix}/ChannelEnable`, channelId)
  },

  // 禁用通道
  disableChannel: (channelId, prefix = '') => {
    return protoRequest(`${prefix}/ChannelDisable`, channelId)
  }
}
