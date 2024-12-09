import { deviceApi } from '../api/device'
import { useDeviceStore } from '../store/device'
import { root } from '../proto/wireless'

/**
 * 设备连接类
 * @class Connect
 * @property {number} connID - 连接ID
 * @property {boolean} status - 连接可用状态
 * @property {Object|null} connConfig - 连接配置信息
 */
class Connect {
    constructor(connID, status = false, connConfig = null) {
        this.connID = connID
        this.status = status // available状态
        this.connConfig = connConfig
    }
}

/**
 * 设备状态枚举
 * @enum {string}
 */
export const DeviceStatus = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    RETRYING: 'retrying'
}

/**
 * 设备类
 * @class Device
 * @property {number} devID - 设备ID
 * @property {string} status - 设备状态(active/inactive/retrying)
 * @property {Object|null} deviceHandle - 设备句柄
 * @property {Map} connectMap - 存储设备连接的Map
 */
class Device {
    constructor(devID, status = DeviceStatus.INACTIVE, deviceHandle = null) {
        this.devID = devID
        this.status = status // active/inactive/retrying
        this.deviceHandle = deviceHandle
        this.connectMap = new Map() // 存储连接的Map
    }
}

/**
 * 设备管理器类
 * @class DeviceManager
 * @property {string} deviceType - 设备类型
 * @property {Function} deviceIdentify - 设备标识生成函数
 * @property {Function} connectIdentify - 连接标识生成函数
 * @property {Object} store - Pinia存储实例
 */
export class DeviceManager {
    constructor(deviceType, deviceIdentify, connectIdentify) {
        this.deviceType = deviceType
        this.deviceIdentify = deviceIdentify
        this.connectIdentify = connectIdentify
        this.store = useDeviceStore()
    }

    /**
     * 创建设备
     * @param {Object} deviceData - 设备创建所需的数据
     * @throws {Error} 当设备创建失败时抛出错误
     * @returns {Promise<number>} 返回创建的设备ID
     */
    async deviceCreate(deviceData) {
        try {
            // 创建并序列化DeviceCreateContext
            const context = root.api.wireless.v1.DeviceCreateContext.create({
                deviceData: deviceData
            });
            const encodedContext = root.api.wireless.v1.DeviceCreateContext.encode(context).finish();

            // 调用API创建设备
            await deviceApi.createDevice(encodedContext)

            // 生成设备ID并创建设备实例
            const devID = this.deviceIdentify(deviceData)
            const device = new Device(devID)

            // 存储到pinia
            this.store.addDevice(device)

            return devID
        } catch (error) {
            console.error('Failed to create device:', error)
            throw error
        }
    }

    /**
     * 销毁设备
     * @param {number} devID - 设备ID
     * @throws {Error} 当设备销毁失败时抛出错误
     * @returns {Promise<void>}
     */
    async deviceDestroy(devID) {
        try {
            // 调用API销毁设备
            await deviceApi.destroyDevice({ ID: devID })

            // 从pinia中移除设备
            this.store.removeDevice(devID)
        } catch (error) {
            console.error('Failed to destroy device:', error)
            throw error
        }
    }

    /**
     * 检查所有设备状态
     * @throws {Error} 当检查设备失败时抛出错误
     * @returns {Promise<void>}
     * @description 
     * 1. 调用API获取所有设备状态
     * 2. 解码proto返回的数据
     * 3. 更新现有设备状态或创建新的设备实例
     */
    async deviceCheck() {
        try {
            // 调用API检查设备
            const response = await deviceApi.checkDevice()

            // 解码proto返回的数据
            const decodedResponse = root.api.wireless.v1.DeviceCheckResponse.decode(response)
            // 处理返回的连接状态列表
            const deviceStatusList = decodedResponse.deviceStatusList || {}

            for (const [devID, deviceHandle] of Object.entries(deviceStatusList)) {
                const device = this.store.getDevice(parseInt(devID))

                if (device) {
                    // 更新已存在设备的状态
                    device.status = DeviceStatus.ACTIVE
                    device.deviceHandle = deviceHandle
                } else {
                    // 创建新的设备实例
                    const newDevice = new Device(
                        parseInt(devID),
                        DeviceStatus.ACTIVE,
                        deviceHandle
                    )
                    this.store.addDevice(newDevice)
                }
            }
        } catch (error) {
            console.error('Failed to check devices:', error)
            throw error
        }
    }

    /**
     * 创建设备连接
     * @param {number} devID - 设备ID
     * @param {Object} connectData - 连接创建所需的数据
     * @throws {Error} 当创建连接失败时抛出错误
     * @returns {Promise<number>} 返回创建的连接ID
     */
    async deviceConnectCreate(devID, connectData) {
        try {
            // 创建并序列化ConnectCreateContext  
            const context = root.api.wireless.v1.ConnectCreateContext.create({
                devID: devID,
                connectData: connectData
            });
            const encodedContext = root.api.wireless.v1.ConnectCreateContext.encode(context).finish();

            // 调用API创建连接
            await deviceApi.createDeviceConnect(encodedContext)

            // 生成连接ID并创建连接实例
            const connID = this.connectIdentify(connectData)
            const connect = new Connect(connID, false)

            // 将连接添加到设备的connectMap中
            const device = this.store.getDevice(devID)
            if (device) {
                device.connectMap.set(connID, connect)
            }

            return connID
        } catch (error) {
            console.error('Failed to create device connection:', error)
            throw error
        }
    }

    /**
     * 销毁设备连接
     * @param {number} devID - 设备ID
     * @param {number} connID - 连接ID
     * @throws {Error} 当销毁连接失败时抛出错误
     * @returns {Promise<void>}
     */
    async deviceConnectDestroy(devID, connID) {
        try {
            // 创建proto的ConnectDestroyContext
            const context = {
                devID: devID,
                connID: connID
            }

            // 调用API销毁连接
            await deviceApi.destroyDeviceConnect(context)

            // 从设备的connectMap中移除连接
            const device = this.store.getDevice(devID)
            if (device) {
                device.connectMap.delete(connID)
            }
        } catch (error) {
            console.error('Failed to destroy device connection:', error)
            throw error
        }
    }

    /**
     * 检查设备的连接状态
     * @param {number} devID - 设备ID
     * @throws {Error} 当检查连接失败时抛出错误
     * @returns {Promise<void>}
     * @description 
     * 1. 调用API获取设备的所有连接状态
     * 2. 解码proto返回的数据
     * 3. 更新现有连接的状态或创建新的连接实例
     */
    async deviceConnectCheck(devID) {
        try {
            // 调用API检查连接
            const response = await deviceApi.checkDeviceConnect({ ID: devID })

            // 解码proto返回的数据
            const decodedResponse = root.api.wireless.v1.ConnectCheckResponse.decode(response)
            // 处理返回的连接状态列表
            const connectStatusList = decodedResponse.connectStatusList || {}
            const device = this.store.getDevice(devID)

            if (!device) return

            for (const [connID, connectStatus] of Object.entries(connectStatusList)) {
                const connect = device.connectMap.get(parseInt(connID))

                if (connect) {
                    // 更新已存在连接的状态
                    connect.status = connectStatus.status
                    connect.connSpec = connectStatus.connectSpec
                } else {
                    // 创建新的连接实例
                    const newConnect = new Connect(
                        parseInt(connID),
                        connectStatus.status,
                        connectStatus.connectSpec
                    )
                    device.connectMap.set(parseInt(connID), newConnect)
                }
            }
        } catch (error) {
            console.error('Failed to check device connections:', error)
            throw error
        }
    }
}