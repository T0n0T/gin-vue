<template>
    <div class="bluetooth-container">
        <!-- 合并后的拓扑图容器 -->
        <div class="topology-map">
            <TopologyGraph :devices="devices" @openScanDialog="openScanDialog" @selectDevice="handleDeviceSelect" />
            
            <!-- 可滑动的设备列表面板 -->
            <div class="sliding-panel" :class="{ 'panel-open': hasConnectedDevices }">
                <div class="device-list">
                    <div class="devices">
                        <div v-for="device in bluetoothStore.connectedDevices" 
                             :key="device.address" 
                             class="device-item"
                             :class="{ 'selected': bluetoothStore.selectedDevice?.address === device.address }" 
                             @click="handleDeviceSelect(device)">
                            <div class="device-info">
                                <span class="device-name">
                                    {{ device.name || 'Unknown name' }}
                                    <font-awesome-icon icon="plug" />
                                </span>
                                <span class="device-address">
                                    {{ device.address }}
                                </span>
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
            </div>
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

        <!-- 添加配置弹窗组件 -->
        <ConfigureDeviceDialog
            v-model:visible="configDialogVisible"
            :device="selectedConfigDevice"
            @save="handleConfigSave"
        />
        <el-button class="add-button" circle type="primary" :icon="Plus" @click="openScanDialog" />
        <el-button class="del-button" circle type="primary" :icon="DeleteFilled" @click="clearDevices()" />
    </div>
</template>

<script setup>
/**
 * @file 蓝牙管理页面组件
 * @description 提供蓝牙设备的扫描、连接、配置等功能，包括拓扑图展示和设备列表管理
 */

import { ref, computed, onMounted, watch } from 'vue'
import { Setting, Plus, DeleteFilled } from '@element-plus/icons-vue'
import TopologyGraph from '@/components/topology/bluetooth.vue'
import { useBluetoothStore } from '@/store/bluetooth'
import { ElMessage } from 'element-plus'
import ConfigureDeviceDialog from '@/components/bluetooth/ConfigureDeviceDialog.vue'

/**
 * @type {import('vue').Ref<boolean>} 是否按信号强度排序
 */
const sortBySignal = ref(true)

/**
 * @type {import('vue').Ref<string>} 过滤文本
 */
const filterText = ref('')

const bluetoothStore = useBluetoothStore()

/**
 * @type {import('vue').Ref<boolean>} 扫描对话框是否可见
 */
const scanDialogVisible = ref(false)

/**
 * @type {import('vue').Ref<Array>} 发现的设备列表
 */
const discoveredDevices = ref([])

/**
 * @type {import('vue').Ref<Array>} 设备列表
 */
const devices = ref([])

/**
 * @type {import('vue').Ref<boolean>} 配置对话框是否可见
 */
const configDialogVisible = ref(false)

/**
 * @type {import('vue').Ref<Object|null>} 选中的配置设备
 */
const selectedConfigDevice = ref(null)

/**
 * @type {import('vue').ComputedRef<Array>} 过滤后的设备列表
 */
const filteredDevices = computed(() => {
    let filtered = [...discoveredDevices.value]

    if (filterText.value) {
        const searchText = filterText.value.toLowerCase()
        filtered = filtered.filter(device =>
            (device.name && device.name.toLowerCase().includes(searchText)) ||
            device.address.toLowerCase().includes(searchText)
        )
    }

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

/**
 * @description 连接蓝牙设备
 * @param {Object} device - 要连接的设备
 * @param {string} device.address - 设备MAC地址
 * @param {string} [device.name] - 设备名称
 * @param {number} device.rssi - 信号强度
 * @throws {ElMessage} 当设备已连接时，显示警告消息
 */
const connectDevice = (device) => {
    device.id = device.address
    const existingDevice = bluetoothStore.connectedDevices.find(d => d.address === device.address)
    if (existingDevice) {
        ElMessage.warning('设备已连接')
        return
    }
    console.log('添加设备', device)
    bluetoothStore.addConnectedDevice(device)
    devices.value = [...bluetoothStore.connectedDevices]
}

/**
 * @description 打开设备配置对话框
 * @param {Object} device - 要配置的设备
 */
const configureDevice = (device) => {
    selectedConfigDevice.value = device
    configDialogVisible.value = true
}

/**
 * @description 计算信号强度的显示百分比
 * @param {number} rssi - 接收信号强度指示（RSSI）值，单位dBm
 * @returns {string} 信号强度百分比，格式为 "xx%"
 */
const signalStrength = (rssi) => {
    const percent = Math.min(100, Math.max(0, (rssi + 100) * 2))
    return `${percent}%`
}

/**
 * @description 打开扫描对话框
 */
const openScanDialog = () => {
    scanDialogVisible.value = true
}

/**
 * @description 清除扫描结果列表
 */
const clearScanResults = () => {
    discoveredDevices.value = []
}

/**
 * @description 处理设备选择事件
 * @param {Object} device - 选中的设备
 */
const handleDeviceSelect = (device) => {
    bluetoothStore.setSelectedDevice(device)
}

/**
 * @description 停止扫描蓝牙设备
 */
const stopScan = () => {
    console.log('stopScan')
}

/**
 * @description 处理配置保存事件
 * @param {Object} data - 设备配置数据
 */
const handleConfigSave = (data) => {
    console.log('保存设备配置:', data)
    ElMessage.success('配置已保存')
}

/**
 * @description 开始扫描蓝牙设备
 * @returns {void}
 * @todo 实现实际的扫描逻辑
 */
const startScan = () => {
    console.log('startScan')
    // 模拟发现设备
    discoveredDevices.value = [
        { name: 'Device 1', address: '00:11:22:33:44:55', rssi: -90 },
        { name: 'Device 2', address: '66:77:88:99:AA:BB', rssi: -75 }
    ]
}

/**
 * @type {import('vue').ComputedRef<boolean>} 是否有已连接的设备
 */
const hasConnectedDevices = computed(() => bluetoothStore.connectedDevices.length > 0)

// 监听对话框关闭
watch(scanDialogVisible, (newValue) => {
    if (!newValue) {
        stopScan()
    }
})

/**
 * @description 清除蓝牙设备
 * @param {Object} [device] - 要清除的特定设备。如果不提供，则清除所有设备
 * @param {string} device.id - 设备ID
 * @param {string} device.address - 设备MAC地址
 * @param {string} device.name - 设备名称
 * @throws {ElMessage} 当没有已连接的设备时，显示警告消息
 */
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
</script>

<style scoped>
.bluetooth-container {
    height: calc(100vh - 100px);
    padding: 10px;
    border-radius: 8px;
}

.topology-map {
    position: relative;
    height: 100%;
    border-radius: 8px;
    padding: 20px;
    /* 隐藏滑动面板 */
    overflow: hidden;
}

/* 滑动面板样式 */
.sliding-panel {
    position: absolute;
    left: -300px; /* 初始状态隐藏 */
    top: 10px;
    bottom: 10px;    
    width: 300px;
    background: #f8fdff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    transition: left 0.3s ease;
    border-right: 1px solid #bcc8e0;
}

.sliding-panel.panel-open {
    left: 20px; /* 修改为20px，使其与拓扑图保持距离 */
}

/* 设备列表样式调整 */
.device-list {
    height: 100%;
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
    border: 1px solid #ddd;
    border-bottom: 4px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    background: white;
    margin-bottom: 8px;
    border-radius: 4px;
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

.add-button {
    position: fixed;
    right: 140px;
    bottom: 100px;
    z-index: 100;
    /* 增加按钮的大小 */
    transform: scale(1.5);
}

.del-button {
    position: fixed;
    right: 80px;
    bottom: 100px;
    z-index: 100;
    /* 增加按钮的大小 */
    transform: scale(1.5);
}

</style>
