<template>
    <div class="bluetooth-container">
        <!-- 左侧已连接设备列表 -->
        <div class="device-list">
            <!-- <div class="list-header">
                <h3 class="list-title">已连接设备</h3>
                <el-button :icon="DeleteFilled" circle="true" @click="clearDevices" />
            </div> -->
            <!-- 已连接设备列表 -->
            <div class="devices">
                <div v-for="device in connectedDevices" :key="device.address" class="device-item"
                    :class="{ 'selected': selectedDevice?.address === device.address }">
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
                    <el-button type="primary" size="small" @click="configureDevice(device)">
                        Configure
                    </el-button>
                </div>
            </div>
        </div>

        <!-- 右侧拓扑图 -->
        <div class="topology-map">
            <TopologyGraph :devices="connectedDevices" @openScanDialog="openScanDialog"
                @selectDevice="handleDeviceSelect" />
        </div>

        <!-- 添加搜索设备弹窗 -->
        <el-dialog v-model="scanDialogVisible" title="Discovered devices" width="400px">
            <div class="scan-dialog-content">
                <div class="scan-controls">
                    <el-button type="primary" @click="startScan">Start scan</el-button>
                    <el-button @click="clearScanResults">Clear</el-button>
                </div>

                <div class="scan-options">
                    <el-checkbox v-model="sortBySignal">Sort by signal strength</el-checkbox>
                    <div class="filter-input">
                        <el-input v-model="filterText" placeholder="Device name or address" clearable />
                    </div>
                    <div class="scan-timeout">
                        <span>Active scan</span>
                        <el-switch v-model="activeScan" />
                        <el-input-number v-model="timeout" :min="0" :max="300" size="small" />
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
import { ref, computed } from 'vue'
import { Refresh, Monitor, Setting, Delete, DeleteFilled } from '@element-plus/icons-vue'
import TopologyGraph from '@/components/TopologyGraph.vue'

// 状态
const sortBySignal = ref(true)
const filterText = ref('')
const activeScan = ref(true)
const timeout = ref(0)
const devices = ref([])
const connectedDevices = ref([])
const scanDialogVisible = ref(false)
const discoveredDevices = ref([])
const selectedDevice = ref(null)

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

// 方法
const startScan = () => {
    // 实现扫描逻辑
    // 模拟发现设备
    discoveredDevices.value = [
        { name: 'Device 1', address: '00:11:22:33:44:55', rssi: -90 },
        { name: 'Device 2', address: '66:77:88:99:AA:BB', rssi: -75 }
    ]
}

const clearDevices = () => {
    devices.value = []
    connectedDevices.value = []
    // TODO:断开设备连接
}

const connectDevice = (device) => {
    // 为设备添加唯一ID
    device.id = device.address // 使用地址作为ID
    connectedDevices.value.push(device)
    scanDialogVisible.value = false
}

const configureDevice = (device) => {
    // 实现配置逻辑
}

const signalStrength = (rssi) => {
    // 将 RSSI 转换为信号强度百分比
    const percent = Math.min(100, Math.max(0, (rssi + 100) * 2))
    console.log(percent)
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
    selectedDevice.value = device
}
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

.scan-timeout {
    display: flex;
    align-items: center;
    gap: 10px;
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
    background-color: #ecf5ff;
    border-radius: 4px;
}
</style>
