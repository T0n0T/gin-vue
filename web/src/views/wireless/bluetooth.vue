<template>
    <div class="bluetooth-container">
        <!-- 左侧设备列表 -->
        <div class="device-list">
            <div class="list-header">
                <h3>Discovered devices</h3>
                <div class="actions">
                    <el-button type="primary" size="small" @click="startScan">
                        <el-icon><Refresh /></el-icon>
                        Start scan
                    </el-button>
                    <el-button size="small" @click="clearDevices">Clear</el-button>
                </div>
            </div>

            <!-- 搜索选项 -->
            <div class="scan-options">
                <el-checkbox v-model="sortBySignal">Sort by signal strength</el-checkbox>
                <el-input
                    v-model="filterText"
                    placeholder="Device name or address"
                    clearable
                    size="small"
                />
                <el-checkbox v-model="activeScan">Active scan</el-checkbox>
                <div class="timeout-input">
                    <span>Timeout:</span>
                    <el-input v-model="timeout" size="small" />
                </div>
            </div>

            <!-- 设备列表 -->
            <div class="devices">
                <div v-for="device in filteredDevices" :key="device.address" class="device-item">
                    <div class="device-info">
                        <span class="device-name">{{ device.name || 'Unknown device' }}</span>
                        <span class="device-address">{{ device.address }}</span>
                        <div class="signal-strength">
                            <span>{{ device.rssi }} dBm</span>
                            <div class="signal-bars" :style="{ width: signalStrength(device.rssi) }"></div>
                        </div>
                    </div>
                    <el-button 
                        type="primary" 
                        size="small"
                        :disabled="device.connected"
                        @click="connectDevice(device)"
                    >
                        {{ device.connected ? 'Connected' : 'Connect' }}
                    </el-button>
                </div>
            </div>
        </div>

        <!-- 右侧拓扑图 -->
        <div class="topology-map">
            <TopologyGraph />
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Refresh, Monitor, Setting } from '@element-plus/icons-vue'
import TopologyGraph from '@/components/TopologyGraph.vue'

// 状态
const sortBySignal = ref(true)
const filterText = ref('')
const activeScan = ref(true)
const timeout = ref(0)
const devices = ref([])
const connectedDevices = ref([])

// 计算属性
const filteredDevices = computed(() => {
    let result = [...devices.value]
    if (filterText.value) {
        result = result.filter(d => 
            (d.name && d.name.toLowerCase().includes(filterText.value.toLowerCase())) ||
            d.address.toLowerCase().includes(filterText.value.toLowerCase())
        )
    }
    if (sortBySignal.value) {
        result.sort((a, b) => b.rssi - a.rssi)
    }
    return result
})

// 方法
const startScan = () => {
    // 实现扫描逻辑
}

const clearDevices = () => {
    devices.value = []
    connectedDevices.value = []
}

const connectDevice = (device) => {
    // 实现连接逻辑
    device.connected = true
    connectedDevices.value.push(device)
}

const signalStrength = (rssi) => {
    // 将 RSSI 转换为信号强度百分比
    const percent = Math.min(100, Math.max(0, (rssi + 100) * 2))
    return `${percent}%`
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
    justify-content: space-between;
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
    gap: 10px;
    font-size: 12px;
}

.signal-bars {
    height: 4px;
    background: #409EFF;
    border-radius: 2px;
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
</style>
