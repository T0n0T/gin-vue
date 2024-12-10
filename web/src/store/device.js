import { defineStore } from 'pinia'
import { ref } from 'vue'
import { DeviceManager } from '../core/devMngr'

/**
 * 设备管理器Store
 * @typedef {Object} Device
 * @property {string} devID - 设备唯一标识符
 */

/**
 * 使用Pinia创建的设备管理Store
 * @returns {Object} 设备管理Store实例
 */
export const useDeviceStore = defineStore('device', () => {
    // 存储设备列表
    const devices = ref(new Map())
    // 存储DeviceManager实例
    const deviceManager = ref(null)

    // 初始化DeviceManager
    const initDeviceManager = (deviceType, deviceIdentify, connectIdentify) => {
        if (!deviceManager.value) {
            deviceManager.value = new DeviceManager(deviceType, deviceIdentify, connectIdentify)
        }
        return deviceManager.value
    }

    // 获取DeviceManager实例
    const getDeviceManager = () => {
        return deviceManager.value
    }

    // 添加设备
    const addDevice = (device) => {
        devices.value.set(device.devID, device)
    }

    // 获取设备
    const getDevice = (devID) => {
        return devices.value.get(devID)
    }

    // 移除设备
    const removeDevice = (devID) => {
        devices.value.delete(devID)
    }

    return {
        devices,
        deviceManager,
        getDeviceManager,
        initDeviceManager,
        addDevice,
        getDevice,
        removeDevice
    }
}, {
    persist: {
        paths: ['devices'] // 只持久化devices数据
    }
})