<template>
    <div class="bluetooth-container">
        <!-- 左侧已连接设备列表 -->
        <div class="device-list">
            <div class="devices">
                <div v-for="device in bluetoothStore.connectedDevices" :key="device.address" class="device-item"
                    :class="{ 'selected': bluetoothStore.selectedDevice?.address === device.address }" @click="handleDeviceSelect(device)">
                    <div class="device-info">
                        <span class="device-name">{{ device.name || 'Unknown name' }}</span>
                        <span class="device-address">{{ device.address }}</span>
                        <div class="signal-strength">
                            <div class="signal-text" style="width: 100px">
                                <span>{{ device.rssi }}</span>
                                <span style="margin: 0 2px"></span>
                                <span>dBm</span>
                                <span style="margin: 0 2px"></span>
                                <div class="signal-bars" :style="{ width: signalStrength(device.rssi) }"></div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <el-button text circle :icon="Setting" @click="configureDevice(device)" />
                        <el-button text circle :icon="DeleteFilled" @click="clearDevices(device)" />
                    </div>
                </div>
            </div>
        </div>

        <!-- 右侧拓扑图 -->
        <div class="topology-map">
            <TopologyGraph :devices="devices" @openScanDialog="openScanDialog" @selectDevice="handleDeviceSelect" />
        </div>

        <!-- 添加搜索设备弹窗 -->
        <el-dialog v-model="scanDialogVisible" title="Discovered devices" width="400px">
            <div class="scan-dialog-content">
                <div class="scan-controls">
                    <el-button type="primary" @click="startScan">Scan</el-button>
                    <el-button @click="clearScanResults">Clear</el-button>
                </div>

                <div class="scan-options">
                    <el-checkbox v-model="sortBySignal">Sort by signal strength</el-checkbox>
                    <div class="filter-input">
                        <el-input v-model="filterText" placeholder="Device name or address" clearable />
                    </div>
                </div>

                <div class="discovered-devices">
                    <div v-for="device in filteredDevices" :key="device.address" class="scan-device-item">
                        <div class="device-info">
                            <span class="device-name">{{ device.name || 'Unknown name' }}</span>
                            <span class="device-address">{{ device.address }}</span>
                            <div class="signal-strength">
                                <div class="signal-text" style="width: 100px">
                                    <span>{{ device.rssi }}</span>
                                    <span>dBm</span>
                                </div>
                            </div>
                        </div>
                        <el-button type="primary" size="small" @click="connectDevice(device)">
                            Connect
                        </el-button>
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { Setting, DeleteFilled } from '@element-plus/icons-vue'
import TopologyGraph from '@/components/topology/bluetooth.vue'
import { useBluetoothStore } from '@/store/bluetooth'
import { ElMessage } from 'element-plus'

// 状态
const sortBySignal = ref(true)
const filterText = ref('')
const bluetoothStore = useBluetoothStore()
const scanDialogVisible = ref(false)
const discoveredDevices = ref([])
const devices = ref([])

// 计算属性
const filteredDevices = computed(() => {
    let filtered = [...discoveredDevices.value]

    // 应用过滤
    if (filterText.value) {
        const searchText = filterText.value.toLowerCase()
        filtered = filtered.filter(device =>
            (device.name && device.name.toLowerCase().includes(searchText)) ||
            device.address.toLowerCase().includes(searchText)
        )
    }

    // 按信号强度排序
    if (sortBySignal.value) {
        filtered.sort((a, b) => b.rssi - a.rssi)
    }

    return filtered
})

// 在组件挂载时更新拓扑图
onMounted(() => {
    // 从 store 恢复设备数据
    if (bluetoothStore.connectedDevices.length > 0) {
        devices.value = [...bluetoothStore.connectedDevices]
    }
})

// 方法
const startScan = () => {
    // 实现扫描逻辑
    console.log('startScan')
    // 模拟发现设备
    discoveredDevices.value = [
        { name: 'Device 1', address: '00:11:22:33:44:55', rssi: -90 },
        { name: 'Device 2', address: '66:77:88:99:AA:BB', rssi: -75 }
    ]
}

const clearDevices = (device) => {
    if (bluetoothStore.connectedDevices.length === 0) {
        ElMessage.warning('没有已连接的设备')
        return
    }

    if (device) {
        bluetoothStore.removeConnectedDevice(device)
        console.log('删除指定设备', device)
    } else {
        bluetoothStore.clearConnectedDevices()
        console.log('删除所有设备')
    }
    devices.value = [...bluetoothStore.connectedDevices]
}

const connectDevice = (device) => {
    // 为设备添加唯一ID
    device.id = device.address // 使用地址作为ID
    // 检查设备是否已存在
    const existingDevice = bluetoothStore.connectedDevices.find(d => d.address === device.address)
    if (existingDevice) {
        ElMessage.warning('设备已连接')
        return
    }
    console.log('添加设备', device)
    bluetoothStore.addConnectedDevice(device)
    devices.value = [...bluetoothStore.connectedDevices]
    // scanDialogVisible.value = false
}

const configureDevice = (device) => {
    console.log('配置设备', device)
    // 实现配置逻辑
}

const signalStrength = (rssi) => {
    // 将 RSSI 转换为信号强度百分比
    const percent = Math.min(100, Math.max(0, (rssi + 100) * 2))
    return `${percent}%`
}

const openScanDialog = () => {
    scanDialogVisible.value = true
}

const clearScanResults = () => {
    discoveredDevices.value = []
}

// 处理设备选择
const handleDeviceSelect = (device) => {
    bluetoothStore.setSelectedDevice(device)
}

// 添加停止扫描方法
const stopScan = () => {
    // 实现停止扫描逻辑
    console.log('stopScan')
    // 这里添加实际停止扫描的代码
}

// 监听 dialog 关闭
watch(scanDialogVisible, (newValue) => {
    if (!newValue) {  // dialog 关闭时
        stopScan()
    }
})
</script>

<style scoped>
.bluetooth-container {
    display: flex;
    height: 100%;
    gap: 20px;
    padding: 20px;
}

.device-list {
    width: 300px;
    background: #f5f7fa;
    border-radius: 8px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.list-header {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}

.scan-options {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.timeout-input {
    display: flex;
    align-items: center;
    gap: 10px;
}

.devices {
    flex: 1;
    overflow-y: auto;
}

.device-item {
    padding: 10px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
}

.device-info {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.device-name {
    font-weight: bold;
}

.device-address {
    font-size: 12px;
    color: #666;
}

.signal-strength {
    display: flex;
    align-items: center;
    font-size: 12px;
    gap: 10px;
}

.signal-text {
    min-width: 100px;
    display: flex;
    align-items: center;
}

.signal-bars {
    height: 4px;
    background: #409EFF;
    border-radius: 2px;
    align-self: center;
}

.topology-map {
    flex: 1;
    background: #f5f7fa;
    border-radius: 8px;
    padding: 20px;
    position: relative;
}

.map-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50px;
}

.central-device {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.device-icon {
    width: 50px;
    height: 50px;
    background: #fff;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.connected-devices {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    justify-content: center;
}

.peripheral-device {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.connection-line {
    width: 2px;
    height: 50px;
    background: #dcdfe6;
}

.device-card {
    padding: 15px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    min-width: 200px;
}

.device-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
}

.scan-dialog-content {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.scan-controls {
    display: flex;
    gap: 10px;
}

.scan-options {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    background: #f5f7fa;
    border-radius: 4px;
}

.discovered-devices {
    max-height: 300px;
    overflow-y: auto;
}

.scan-device-item {
    padding: 10px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.filter-input {
    width: 100%;
}

.device-item.selected {
    background-color: color-mix(in srgb, var(--el-menu-hover-bg-color) 80%, rgb(129, 248, 222)) !important;;
    border-radius: 4px;
}
</style>
