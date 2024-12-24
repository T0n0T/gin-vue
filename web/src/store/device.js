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
    console.log('useDeviceStore:', deviceType);
    const devices = ref(new Map())

    const devicesMapInit = async(deviceType) => {
        //从数据库中获取设备列表
        // const devices = await db.get(deviceType)
        // devices.forEach(device => {
        //     devices.set(device.devID, device)
        // })
    }

    // 添加设备
    const addDevice = async (device) => {
        devices.value.set(device.devID, device)
        // 将设备添加到数据库
        // await db.set(deviceType, device)
    }

    // 获取设备
    const getDevice = (devID) => {
        return devices.value.get(devID)
    }

    // 移除设备
    const removeDevice = async (devID) => {
        devices.value.delete(devID)
        // 将设备从数据库中移除
        // await db.delete(deviceType, devID)
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