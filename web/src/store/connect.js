import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useConnectionStore = defineStore('connection', () => {
    const bluetoothConnections = ref([
        { id: 'bt1', name: 'BT设备1', address: '00:11:22:33:44:55' },
        { id: 'bt2', name: 'BT设备2', address: '66:77:88:99:AA:BB' },
        // ... 更多蓝牙设备
    ])

    const networkConnections = ref([
        { id: 'net1', name: 'TCP服务器1', address: '192.168.1.100:8080' },
        { id: 'net2', name: 'UDP终端1', address: '192.168.1.101:9090' },
        // ... 更多网络连接
    ])

    return {
        bluetoothConnections,
        networkConnections
    }
})