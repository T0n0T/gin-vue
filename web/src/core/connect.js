import { deviceApi } from '../api/device'
import { root } from '../proto/wireless' // 导入生成的 protobuf 定义

/**
 * @class DeviceManager
 * @description 设备管理器，负责设备的创建、连接和资源管理
 */
export class DeviceManager {
    /**
     * 创建设备管理器实例
     */
    constructor() {
        /** @type {number|null} 设备ID */
        this.deviceId = null
        /** @type {number|null} 连接ID */
        this.connectId = null

        // 获取 Proto 消息类型
        this.DeviceCreateContext = root.lookupType('api.wireless.v1.DeviceCreateContext')
        this.DeviceID = root.lookupType('api.wireless.v1.DeviceID')
        this.ConnectCreateContext = root.lookupType('api.wireless.v1.ConnectCreateContext')
        this.ConnectDestroyContext = root.lookupType('api.wireless.v1.ConnectDestroyContext')
    }

    /**
     * 创建并初始化设备
     * @async
     * @param {Object} deviceContext - 设备创建所需的配置信息
     * @returns {Promise<string>} 返回设备ID
     * @throws {Error} 设备创建失败时抛出错误
     */
    async initDevice(deviceContext) {
        try {
            // 1. 创建设备消息
            const createMessage = this.DeviceCreateContext.create({
                deviceData: deviceContext
            })
            await deviceApi.createDevice(createMessage)

            // 2. 检查设备状态
            const checkResult = await deviceApi.checkDevice()
            if (checkResult && checkResult.deviceStatusList) {
                // 假设返回的第一个设备ID就是我们刚创建的
                const [deviceId] = Object.keys(checkResult.deviceStatusList)
                this.deviceId = parseInt(deviceId)
            } else {
                throw new Error('设备创建失败')
            }

            return this.deviceId
        } catch (error) {
            console.error('设备初始化失败:', error)
            throw error
        }
    }

    /**
     * 创建设备连接
     * @async
     * @param {Object} connectContext - 连接创建所需的配置信息
     * @returns {Promise<string>} 返回连接ID
     * @throws {Error} 连接创建失败时抛出错误
     */
    async createConnection(connectContext) {
        try {
            if (!this.deviceId) {
                throw new Error('请先初始化设备')
            }

            // 1. 创建连接消息
            const createMessage = this.ConnectCreateContext.create({
                devID: this.deviceId,
                connectData: connectContext
            })
            await deviceApi.createDeviceConnect(createMessage)

            // 2. 检查连接状态
            const deviceIdMessage = this.DeviceID.create({
                ID: this.deviceId
            })
            const checkResult = await deviceApi.checkDeviceConnect(deviceIdMessage)
            if (checkResult && checkResult.connectStatusList) {
                // 假设返回的第一个连接ID就是我们刚创建的
                const [connectId] = Object.keys(checkResult.connectStatusList)
                this.connectId = parseInt(connectId)
            } else {
                throw new Error('连接创建失败')
            }

            return this.connectId
        } catch (error) {
            console.error('连接创建失败:', error)
            throw error
        }
    }

    /**
     * 清理设备和连接资源
     * @async
     * @throws {Error} 资源清理失败时抛出错误
     */
    async destroy() {
        try {
            if (this.connectId) {
                const destroyMessage = this.ConnectDestroyContext.create({
                    devID: this.deviceId,
                    connID: this.connectId
                })
                await deviceApi.destroyDeviceConnect(destroyMessage)
            }
            if (this.deviceId) {
                const deviceMessage = this.DeviceID.create({
                    ID: this.deviceId
                })
                await deviceApi.destroyDevice(deviceMessage)
            }
        } catch (error) {
            console.error('资源清理失败:', error)
            throw error
        }
    }
}