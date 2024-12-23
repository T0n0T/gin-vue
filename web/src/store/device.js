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
export const useDeviceStore = (deviceType) => defineStore(deviceType, () => {
    // 存储设备列表
    const devices = ref(new Map())

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
        addDevice,
        getDevice,
        removeDevice
    }
}, {
    persist: {
        paths: ['devices'] // 只持久化devices数据
    }
})