import { protoRequest } from '../utils/request'

export const channelApi = {
  // 创建通道
  createChannel: (createContext) => {
    return protoRequest('/ChannelCreate', createContext)
  },

  // 销毁通道
  destroyChannel: (channelId) => {
    return protoRequest('/ChannelDestroy', channelId)
  },

  // 绑定通道
  bindChannel: (bindContext) => {
    return protoRequest('/ChannelBind', bindContext)
  },

  // 解绑通道
  unbindChannel: (bindContext) => {
    return protoRequest('/ChannelUnbind', bindContext)
  },

  // 启用通道
  enableChannel: (channelId) => {
    return protoRequest('/ChannelEnable', channelId)
  },

  // 禁用通道
  disableChannel: (channelId) => {
    return protoRequest('/ChannelDisable', channelId)
  }
}
