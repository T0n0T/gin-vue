import { defineStore } from 'pinia'

/**
 * 设备管理器Store
 * @typedef {Object} Device
 * @property {string} devID - 设备唯一标识符
 */

/**
 * 使用Pinia创建的设备管理Store
 * @returns {Object} 设备管理Store实例
 */
export const useDeviceStore = defineStore('deviceStore', {
    state: () => ({
        /** @type {Map<string, Device>} 存储设备信息的Map集合 */
        devices: new Map()
    }),
    actions: {
        /**
         * 添加设备到Store中
         * @param {Device} device - 要添加的设备对象
         */
        addDevice(device) {
            this.devices.set(device.devID, device)
        },

        /**
         * 从Store中移除指定设备
         * @param {string} devID - 要移除的设备ID
         */
        removeDevice(devID) {
            this.devices.delete(devID)
        },

        /**
         * 获取指定设备信息
         * @param {string} devID - 要获取的设备ID
         * @returns {Device|undefined} 设备对象，如果不存在则返回undefined
         */
        getDevice(devID) {
            return this.devices.get(devID)
        }
    }
})