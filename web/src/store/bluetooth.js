import { defineStore } from 'pinia'

export const useBluetoothStore = defineStore('bluetooth', {
    state: () => ({
        centralDevice: null,
        connectedDevices: [],
        selectedDevice: null  // 添加选中设备的状态
    }),

    actions: {
        setCentralDevice(device) {
            this.centralDevice = device
        },

        addConnectedDevice(device) {
            const existingDevice = this.connectedDevices.find(d => d.address === device.address)
            if (!existingDevice) {
                this.connectedDevices.push({
                    ...device,
                    type: 'peripheral'
                })
            }
        },

        removeConnectedDevice(device) {
            this.connectedDevices = this.connectedDevices.filter(d => d.address !== device.address)
            if (this.selectedDevice?.address === device.address) {
                this.selectedDevice = null
            }
        },

        clearConnectedDevices() {
            this.connectedDevices = []
            this.selectedDevice = null
        },

        setSelectedDevice(device) {
            this.selectedDevice = device
        },

        updateDeviceRssi(address, rssi) {
            const device = this.connectedDevices.find(d => d.address === address)
            if (device) {
                device.rssi = rssi
            }
        }
    },

    persist: true
})