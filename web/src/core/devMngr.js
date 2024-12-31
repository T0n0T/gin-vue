import { deviceApi } from '../api/device'
import { adapterApi } from '../api/adapter'
import { useDeviceStore } from '../store/device'
import { api, google } from '../proto/wireless'
import { kvGet, kvPut, kvDelete } from '../utils/kv'

/**
 * 设备连接类
 * @class Connect
 * @property {number} connID - 连接ID
 * @property {boolean} status - 连接可用状态
 * @property {Object|null} connConfig - 连接配置信息
 */
export class Connect {
    constructor(connID, status = false) {
        this.connID = connID
        this.status = status // available状态
        this.connData = null
    }
}

/**
 * 设备状态枚举
 * @enum {string}
 */
export const DeviceStatus = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
}

/**
 * 设备类
 * @class Device
 * @property {number} devID - 设备ID
 * @property {string} status - 设备状态(active/inactive/retrying)
 * @property {Object|null} deviceHandle - 设备句柄
 * @property {Map} connectMap - 存储设备连接的Map
 */
export class Device {
    constructor(devID, status = DeviceStatus.INACTIVE, deviceHandle = null) {
        this.devID = devID
        this.status = status // active/inactive/retrying
        this.deviceHandle = deviceHandle
        this.connectMap = new Map() // 存储连接的Map
        this.deviceData = null // 存储设备创建时的数据
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
        this.store = useDeviceStore(deviceType)()
    }

    async adapterCheck() {
        try {
            const encodedContext = google.protobuf.Empty.encode({}).finish();

            // 调用API创建设备
            const response = await adapterApi.checkAdapter(encodedContext, this.deviceType)
            // 解码proto返回的数据
            const decodedResponse = api.wireless.v1.AdapterCheckResponse.decode(response)
            // 处理返回的连接状态列表
            // this.adapterState.AdapterName = decodedResponse.AdapterName
            // this.adapterState.isScanActivate = decodedResponse.isScanActivate
            // this.adapterState.isAlive = decodedResponse.isAlive
        } catch (error) {
            throw error
        }
    }

    async adapterScan(isScanActivate, scanResponseHandle, duration = 0) {
        try {
            const encodedScanRequest = api.wireless.v1.AdapterScanRequest.encode({
                isScanActivate: isScanActivate,
                duration: duration,
            }).finish();

            let adapterScanStop = null
            adapterScanStop = await adapterApi.scanAdapter(
                encodedScanRequest,
                (data) => {
                    if (!data || data.byteLength === 0) {
                        console.error('Received empty data for decoding');
                        return; // 直接返回，避免后续错误
                    }

                    const buffer = new Uint8Array(data);
                    const scanResponse = api.wireless.v1.AdapterScanResponse.decode(buffer);

                    // 检查 scanResponse 的结构
                    if (scanResponse && typeof scanResponse === 'object') {
                        if (scanResponse.ctx) {
                            scanResponseHandle(scanResponse.ctx);
                        } else {
                            console.error('scanResponse does not contain ctx:', scanResponse);
                        }
                    } else {
                        console.error('Decoded scanResponse is not an object:', scanResponse);
                    }
                },
                (error) => {
                    throw error
                },
                this.deviceType
            )
            return adapterScanStop
        } catch (error) {
            throw error
        }
    }

    async adapterConfiugure(data) {
        try {
            const encodedConfigRequest = api.wireless.v1.AdapterConfigureRequest.encode({
                ctx: data,
            }).finish();

            await adapterApi.configureAdapter(encodedConfigRequest, this.deviceType)
        } catch (error) {
            throw error
        }
    }

    /**
     * 创建设备
     * @param {Object} deviceData - 设备创建所需的数据
     * @throws {Error} 当设备创建失败时抛出错误
     * @returns {Promise<number>} 返回创建的设备ID
     */
    async deviceCreate(deviceData, deviceHandle) {
        try {
            const encodedContext = api.wireless.v1.DeviceCreateContext.encode({
                deviceData: deviceData
            }).finish();
            await deviceApi.createDevice(encodedContext, this.deviceType)
            const devID = this.deviceIdentify(deviceHandle)
            const device = new Device(
                devID,
                DeviceStatus.INACTIVE,
                deviceHandle,
            )
            device.deviceData = deviceData
            this.store.addDevice(device)
            return devID
        } catch (error) {
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
            const context = api.wireless.v1.DeviceID.create({
                ID: devID
            });
            const encodedContext = api.wireless.v1.DeviceID.encode(context).finish();

            await deviceApi.destroyDevice(encodedContext, this.deviceType)

            // 从pinia中移除设备
            this.store.removeDevice(devID)
        } catch (error) {
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
            const encodedContext = google.protobuf.Empty.encode({}).finish()
            const response = await deviceApi.checkDevice(encodedContext, this.deviceType)
            const decodedResponse = api.wireless.v1.DeviceCheckResponse.decode(response)
            const deviceStatusList = decodedResponse.deviceStatusList || {};

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
            for (const device of this.store.devices) {
                if (!deviceStatusList[device.devID]) {
                    device.status = DeviceStatus.INACTIVE
                }
            }
        } catch (error) {
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
    async deviceConnectCreate(devID, connectData, connSepc) {
        try {
            // 创建并序列化ConnectCreateContext  
            const encodedContext = api.wireless.v1.ConnectCreateContext.encode({
                devID: devID,
                connectData: connectData
            }).finish();

            // 调用API创建连接
            await deviceApi.createDeviceConnect(encodedContext, this.deviceType)

            // 生成连接ID并创建连接实例
            const connID = this.connectIdentify(connSepc)
            const connect = new Connect(connID, false)
            connect.connData = await kvGet(`${devID}/${connID}`)
            // 将连接添加到设备的connectMap中
            const device = this.store.getDevice(devID)
            if (device) {
                device.connectMap.set(connID, connect)
            }

            return connID
        } catch (error) {
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
            const encodedContext = api.wireless.v1.ConnectDestroyContext.encode({
                devID: devID,
                connID: connID
            }).finish();

            // 调用API销毁连接
            await deviceApi.destroyDeviceConnect(encodedContext, this.deviceType)

            // 从设备的connectMap中移除连接
            const device = this.store.getDevice(devID)
            if (device) {
                device.connectMap.delete(connID)
            }
        } catch (error) {
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
            // 创建并序列化ConnectCheckContext
            const encodedContext = api.wireless.v1.DeviceID.encode({
                ID: devID
            }).finish();

            // 调用API检查连接
            const response = await deviceApi.checkDeviceConnect(encodedContext, this.deviceType)

            // 解码proto返回的数据
            const decodedResponse = api.wireless.v1.ConnectCheckResponse.decode(response)
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
                    )
                    newConnect.connData = await kvGet(`${devID}/${connID}`)
                    console.log(newConnect.connData)
                    device.connectMap.set(parseInt(connID), newConnect)
                }
            }
        } catch (error) {
            throw error
        }
    }


    /**
     * 更新设备连接
     * @param {number} devID - 设备ID
     * @param {number} connID - 连接ID
     * @param {Object} connData - 连接配置数据
     * @throws {Error} 当配置连接失败时抛出错误
     * @returns {Promise<void>}
     */
    async deviceConnectUpdate(devID, connID, connData) {
        try {
            await kvPut(`${devID}/${connID}`, connData)
            const device = this.store.getDevice(devID)
            if (device) {
                const connect = device.connectMap.get(connID)
                if (connect) {
                    connect.connData = connData
                }
            }
        } catch (error) {
            throw error
        }
    }
}
