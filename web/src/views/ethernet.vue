<template>
    <div class="eth-container">
        <el-main class="eth-view">
            <el-dialog width="38.2%" :show-close="true" draggable v-model="newConnDialogVisible" @close="DialogClose">
                <template #header="{ titleId, titleClass }">
                    <div style="display: flex; justify-content: space-between; align-self: center;">
                        <h4 :id="titleId" :class="titleClass">{{ dialogTitle }}</h4>
                    </div>
                </template>
                <KeepAlive :exclude="keepAliveExclude">
                    <Socket v-if="!ifconfigVisible && newConnDialogVisible" :formData="editingRow" :ifaceMap="ifacesMap"
                        @ifaceConfigure="ifconfigCheckout" @ifaceFetch="ifacesFetch" @socketDialogSubmit="saveConn"
                        @socketDialogclose="DialogClose" />
                    <Ifconfig v-else :iface="selectedIface" @ifconfigSubmit="ifaceLinkUp"
                        @ifconfigClose="ifconfigVisible = false" />
                </KeepAlive>
            </el-dialog>
            <div class="search-container">
                <el-input v-model="searchQuery" placeholder="搜索连接名称或协议" prefix-icon="Search" clearable
                    @input="handleSearch" style="width: 100%; margin-bottom: 15px;" />
            </div>
            <el-table ref="ethConnTable" :data="filteredConnections" :border="true" style="width: 100%"
                highlight-current-row>
            
                <el-table-column width="5">
                    <template #default="{ row }">
                        <div :class="['status-indicator', row.status ? 'connected' : 'disconnected']"></div>
                    </template>
                </el-table-column>
                <el-table-column prop="interfaceName" label="网络接口" />
                <el-table-column prop="selectedProtocol" label="协议" />
                <el-table-column prop="remoteAddr" label="远端URL" />
                <el-table-column label="操作" width="120">
                    <template #default="{ $index, row }">
                        <el-button text type="primary" circle @click="editConn(row)">编辑</el-button>
                        <el-button text type="danger" circle @click="deleteConn(row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>
        <el-button class="add-button" circle type="primary" :icon="Plus" @click="openNewConnDialog" />
        <el-button class="del-button" circle type="primary" :icon="DeleteFilled" @click="clearConns()" />
    </div>
</template>

<script setup>
import { Plus, DeleteFilled, Edit } from '@element-plus/icons-vue';
import { ref, watch, computed, onMounted, onUnmounted } from 'vue';
import { ElMessage } from 'element-plus';
import { v5 as uuidv5 } from 'uuid';
import { DeviceManager } from '../core/devMngr'
import { netctrl } from '../proto/net'

import Socket from '../components/ethernet/Socket.vue';
import Ifconfig from '../components/ethernet/Ifconfig.vue';

let timer

const deviceManager = new DeviceManager(
    'net',
    (deviceHandle) => {
        const uuid = uuidv5(deviceHandle, '6ba7b811-9dad-11d1-80b4-00c04fd430c8');
        const uuidBytes = uuid.replace(/-/g, '').substring(0, 8);
        const uint32 = (parseInt(uuidBytes.substring(0, 2), 16) << 24) |
            (parseInt(uuidBytes.substring(2, 4), 16) << 16) |
            (parseInt(uuidBytes.substring(4, 6), 16) << 8) |
            parseInt(uuidBytes.substring(6, 8), 16);
        return uint32 >>> 0;
    },
    (connectSpec) => {
        const uuid = uuidv5(connectSpec, '6ba7b811-9dad-11d1-80b4-00c04fd430c8');
        const uuidBytes = uuid.replace(/-/g, '').substring(0, 8);
        const uint32 = (parseInt(uuidBytes.substring(0, 2), 16) << 24) |
            (parseInt(uuidBytes.substring(2, 4), 16) << 16) |
            (parseInt(uuidBytes.substring(4, 6), 16) << 8) |
            parseInt(uuidBytes.substring(6, 8), 16);
        return uint32 >>> 0;
    }
)

// 可视化
const newConnDialogVisible = ref(false);
const ifconfigVisible = ref(false);

// 网卡选择
const ifacesMap = ref(new Map())
const selectedIface = ref({});

// 对话框内容
let isEdit = false;
const editingRow = ref({});
const keepAliveExclude = ref([]);
const dialogTitle = computed(() => {
    let connTitle = isEdit ? '编辑连接' : '新增连接';
    return ifconfigVisible.value ? selectedIface.value.name : connTitle;
});

// 连接表格
const ethConnTable = ref(null);
const searchQuery = ref('');
const connsMap = ref(new Map());
const filteredConnections = computed(() => {
    // 如果没有搜索查询，返回所有连接
    if (!searchQuery.value) {
        return Array.from(connsMap.value.values());
    }

    const query = searchQuery.value.toLowerCase();
    return Array.from(connsMap.value.values()).filter(conn =>
        conn.interfaceName.toLowerCase().includes(query) ||
        conn.selectedProtocol.toLowerCase().includes(query) ||
        conn.remoteAddr.toLowerCase().includes(query)
    );
});


onMounted(() => {
    // 启动定时器，每5秒检查一次设备状态
    timer = setInterval(async () => {
        try {
            await deviceManager.deviceCheck();
            for (const devID of deviceManager.store.devices.keys()) {
                // if (device.status === 'active') {
                await deviceManager.deviceConnectCheck(devID);
                // }
            }
        } catch (error) {
            console.error('Failed to check devices:', error);
        }
    }, 5000);
});

onUnmounted(() => {
    clearInterval(timer);
});

// 监听 deviceManager.store.devices 的变化，实时更新connect列表
watch(
    () => deviceManager.store.devices,
    () => {
        // 更新iface状态
        for (const [mac, iface] of ifacesMap.value.entries()) {
            const devHandle = netctrl.DeviceHandle.encode({
                mac: mac,
            }).finish();
            const devID = deviceManager.deviceIdentify(devHandle);
            const device = deviceManager.store.getDevice(devID);
            if (device) {
                ifacesMap.value.set(mac, {
                    ...iface,
                    devID: devID,
                    status: device.status
                });
            }
        }

        // // 更新connect列表
        for (const [devID, device] of deviceManager.store.devices.entries()) {
            const iface = Array.from(ifacesMap.value.values()).find(i => i.devID === devID);
            for (const [connID, connect] of device.connectMap.entries()) {
                const connData = netctrl.ConnectData.decode(connect.connData);
                const key = `${devID}-${connID}`;
                connsMap.value.set(key, {
                    devID: devID,
                    connID: connID,
                    status: connect.status,
                    interfaceName: iface ? iface.name : devID,
                    selectedProtocol: connData?.url?.split('://')[0] || '',
                    proxyUrl: connData?.proxyUrl || '',
                    remoteAddr: connData?.url?.split('://')[1] || '',
                    spec: connData?.spec || ''
                });
            }
        }
        // 移除已删除的connect
        const activeKeys = new Set();
        for (const [devID, device] of deviceManager.store.devices.entries()) {
            for (const connID of device.connectMap.keys()) {
                activeKeys.add(`${devID}-${connID}`);
            }
        }
        for (const key of connsMap.value.keys()) {
            if (!activeKeys.has(key)) {
                connsMap.value.delete(key);
            }
        }
        // console.log('connects:', Array.from(connsMap.value.values()));
    },
    { deep: true, immediate: true }
);


const openNewConnDialog = () => {
    newConnDialogVisible.value = true;
    ifconfigVisible.value = false;
};

const ifacesFetch = async () => {
    try {
        await deviceManager.adapterScan(
            true,
            async (ctx) => {
                try {
                    const deviceInfo = netctrl.DeviceInfo.decode(ctx);
                    if (!ifacesMap.value.has(deviceInfo.mac)) {
                        ifacesMap.value.set(deviceInfo.mac, {
                            name: deviceInfo.name,
                            mac: deviceInfo.mac,
                            devID: 0,
                            status: 'inactive',
                        });
                    }
                } catch (decodeError) {
                    console.error('Failed to decode scan response:', decodeError);
                    ElMessage.error('解码扫描响应失败', decodeError);
                }
            },
            1000
        );

        ElMessage.success('网卡扫描完成');
    } catch (error) {
        console.error('网卡扫描失败:', error);
        ElMessage.error('网卡扫描失败', error);
    }
};

const ifconfigCheckout = (iface) => {
    console.log('iface:', iface);
    if (!iface?.name) {
        ElMessage.warning('需要选择网卡');
        return;
    }

    selectedIface.value = iface;
    ifconfigVisible.value = true;

    // 尝试从deviceManager中获取设备配置
    const device = deviceManager.store.getDevice(iface.devID);
    if (device && device.deviceData) {
        // 解码deviceData
        const decodedDeviceData = netctrl.DeviceSpec.decode(device.deviceData);

        // 构造editingIfaceConfig
        const editingIfaceConfig = {
            dhcp: decodedDeviceData.config.useDhcp,
            ip: decodedDeviceData.config.ipAddress,
            subnetMask: decodedDeviceData.config.mask,
            gateway: decodedDeviceData.config.gateway,
            dns: decodedDeviceData.config.dns
        };

        // 将配置传递给Ifconfig组件
        selectedIface.value.config = editingIfaceConfig;
    }
    console.log('selectedIface:', selectedIface.value);
};

const ifaceLinkUp = async (config) => {
    ifconfigVisible.value = false;
    try {
        const devSpec = netctrl.DeviceSpec.encode({
            name: config.name,
            mac: config.mac,
            config: {
                useDhcp: config.dhcp,
                ipAddress: config.ip,
                mask: config.subnetMask,
                gateway: config.gateway,
                dns: config.dns
            }
        }).finish();
        await deviceManager.deviceCreate(devSpec);

        ElMessage.success('设备创建成功');
    } catch (error) {
        console.error('Failed to create device:', error);
        ElMessage.error('设备创建失败');
    }
};

const DialogClose = () => {
    newConnDialogVisible.value = false;
    ifconfigVisible.value = false;
    isEdit = false;
    editingRow.value = {};
    keepAliveExclude.value.push('Socket'); // 关闭对话框时将 Socket 组件排除
    setTimeout(() => {
        keepAliveExclude.value = []; // 重置排除列表，以便下次打开时重新缓存
    }, 0);
};

const saveConn = (value) => {
    const connData = netctrl.ConnectData.encode({
            url: `${value.selectedProtocol}://${value.remoteAddr}`,
            proxyUrl: '',
            spec: value.spec
        }).finish();
    if (isEdit) {
        // 编辑现有连接,使用consul
        console.log('编辑连接:', editingRow.value);
        deviceManager.deviceConnectUpdate(value.devID, value.connID, connData);
    } else {
        // 新增连接
        deviceManager.deviceConnectCreate(value.devID, connData);
        console.log('新增连接:', value);
    }

    // 关闭对话框
    newConnDialogVisible.value = false;
    ElMessage.success(editingRow.value ? '连接已更新' : '连接已添加')
};

const editConn = (row) => {
    console.log('编辑连接:', row);
    editingRow.value = Object.assign({}, row);
    isEdit = true;
    newConnDialogVisible.value = true;
    ifconfigVisible.value = false;
    keepAliveExclude.value = [];
};

const deleteConn = (row) => {
    // 删除连接逻辑
    console.log('删除连接:', row);
    deviceManager.deviceConnectDestroy(row.devID, row.connID);
    ElMessage.success('连接删除成功')
};


const clearConns = () => {
    deviceManager.store.devices.forEach((device) => {
        device.connectMap.forEach((conn) => {
            deviceManager.deviceConnectDestroy(device.devID, conn.connID);
        });

    });
    ElMessage({
        message: '所有连接已清除',
        type: 'success'
    });
};

const handleSearch = () => {
    if (!searchQuery.value) return;

    // 找到第一个匹配的行索引
    const index = filteredConnections.value.findIndex(conn =>
        conn.interfaceName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        conn.selectedProtocol.toLowerCase().includes(searchQuery.value.toLowerCase())
    );

    if (index > -1) {
        ethConnTable.value?.setCurrentRow(filteredConnections.value[index]);

        // 确保该行在视图中可见
        const row = document.querySelector(`.el-table__row:nth-child(${index + 1})`);
        row?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
};
</script>

<style scoped>
.eth-container {
    height: calc(100vh - 100px);
    padding: 10px;
    border-radius: 8px;
}

.eth-view {
    height: 100%;
    background: #f5f7fa;
    border-radius: 8px;
    padding: 20px;
}

.add-button {
    position: fixed;
    right: 140px;
    bottom: 100px;
    z-index: 100;
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

.search-container {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 15px;
}
.status-indicator {
    width: 5px;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
}

.status-indicator.connected {
    background-color: rgb(0, 255, 0);
}

.status-indicator.disconnected {
    background-color: red;
}
</style>
