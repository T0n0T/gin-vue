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
                    <Socket v-if="!ifconfigVisible && newConnDialogVisible" :formData="editingRow"
                        :ifaceList="ifacesList" @ifaceConfigure="checkoutIfconfig" @ifaceFetch="ifacesFetch"
                        @socketDialogSubmit="saveConn" @socketDialogclose="DialogClose" />
                    <Ifconfig v-else :iface="selectedIface" @ifconfigSubmit="ifaceConfigure"
                        @ifconfigClose="ifconfigVisible = false" />
                </KeepAlive>
            </el-dialog>
            <div class="search-container">
                <el-input v-model="searchQuery" placeholder="搜索连接名称或协议" prefix-icon="Search" clearable
                    @input="handleSearch" style="width: 100%; margin-bottom: 15px;" />
            </div>
            <el-table ref="ethConnTable" :data="filteredConnections" :border="true" style="width: 100%"
                highlight-current-row>
                <el-table-column prop="interfaceName" label="连接名称" />
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
import { Plus, DeleteFilled } from '@element-plus/icons-vue';
import { ref, watch, computed } from 'vue';
import { ElMessage } from 'element-plus';
import { v5 as uuidv5 } from 'uuid';
import { DeviceManager } from '../core/devMngr'
import { netctrl } from '../proto/net'
import { api } from '../proto/wireless';
import Socket from '../components/ethernet/Socket.vue';
import Ifconfig from '../components/ethernet/Ifconfig.vue';


const deviceManager = new DeviceManager(
    'net',
    (deviceData) => {
        const uuid = uuidv5(deviceData, '6ba7b810-9dad-11d1-80b4-00c04fd430c8');
        const uuidBytes = uuid.replace(/-/g, '').substring(0, 8);
        const uint32 = (parseInt(uuidBytes.substring(0, 2), 16) << 24) |
            (parseInt(uuidBytes.substring(2, 4), 16) << 16) |
            (parseInt(uuidBytes.substring(4, 6), 16) << 8) |
            parseInt(uuidBytes.substring(6, 8), 16);

        return uint32 >>> 0;
    },
    (connectData) => connectData.spec // 使用连接ID作为连接标识
)

// 可视化
const newConnDialogVisible = ref(false);
const ifconfigVisible = ref(false);

// 网卡选择
const ifacesMap = ref(new Map())
const ifaceList = ref([]);
const selectedIfaceName = ref('');

// 对话框内容
const isEdit = ref(false);
const editingRow = ref({});
const keepAliveExclude = ref([]);
const dialogTitle = computed(() => {
    let connTitle = isEdit.value ? '编辑连接' : '新增连接';
    return ifconfigVisible.value ? selectedIfaceName.value : connTitle;
});

// 连接表格
const ethConnTable = ref(null);
const searchQuery = ref('');
const filteredConnections = computed(() => {
    const devices = deviceManager.store.devices;
    if (!(devices instanceof Map)) {
        console.error('devices is not a Map:', devices);
        return [];
    }
    const connections = []; // 用于存储最终的连接信息

    // 遍历 devices
    for (const [deviceHandle, device] of devices) {
        // 使用 deviceHandle 在 ifacesMap 中查找对应的接口
        const iface = ifacesMap.value.get(deviceHandle);
        if (iface) {
            const interfaceName = iface.name; // 获取接口名称

            // 遍历 device 的 connectMap
            for (const [_, connData] of Object.entries(device.connectMap)) {
                // connData 应该包含 url
                const url = connData.url; // 假设 url 的形式是 scheme://ip:port
                const [scheme, rest] = url.split('://'); // 解析 scheme
                const [ip, port] = rest.split(':'); // 解析 ip 和 port

                // 构建连接对象
                connections.push({
                    interfaceName: interfaceName,
                    selectedProtocol: scheme, // 使用 scheme 作为 selectedProtocol
                    remoteAddr: `${ip}:${port}` // 使用 ip:port 作为 remoteAddr
                });
            }
        }
    }

    // 如果没有搜索查询，返回所有连接
    if (!searchQuery.value) {
        return connections;
    }

    const query = searchQuery.value.toLowerCase();
    return connections.filter(conn =>
        conn.interfaceName.toLowerCase().includes(query) ||
        conn.selectedProtocol.toLowerCase().includes(query) ||
        conn.remoteAddr.toLowerCase().includes(query)
    );
});

const openNewConnDialog = () => {
    newConnDialogVisible.value = true;
    ifconfigVisible.value = false;
};

const ifacesFetch = () => {
    deviceManager.adapterScan(true, (scanResponse) => {
        const deviceInfo = netctrl.DeviceInfo.decode(scanResponse.ctx);
        if (!ifacesMap.value.has(deviceInfo.mac)) {
            ifacesMap.value.set(deviceInfo.mac, {
                name: deviceInfo.name,
            });
        }
    }, 1000);
};

watch(ifacesMap, (newIfacesMap) => {
    const newIfaceList = [];
    for (const [mac, iface] of newIfacesMap.entries()) {
        let device = null;
        if ((deviceManager.store.devices instanceof Map)) {
            device = deviceManager.store.devices.get(mac);
        }
        newIfaceList.push({
            mac: mac,
            name: iface.name,
            status: device ? device.status : false
        });
    }
    ifaceList.value = newIfaceList;
}, { deep: true });

const ifaceConfigure = (config) => {
    ifconfigVisible.value = false;
    netctrl.DeviceSpec.encode({
        mac: selectedIfaceName.mac,
        name: config.name,
    }).finish();
    deviceManager.deviceCreate()
};

const clearConns = () => {
    ethernetStore.connections = [];
    ElMessage({
        message: '连接清除成功',
        type: 'success'
    });
};

const checkoutIfconfig = (ifaceName) => {
    if (!ifaceName) {
        ElMessage({
            message: '需要选择网卡',
            type: 'warning'
        });
        return;
    }

    console.log('checkout to configureIf page', ifaceName);
    selectedIfaceName.value = ifaceName;
    ifconfigVisible.value = true;
};

const DialogClose = () => {
    newConnDialogVisible.value = false;
    ifconfigVisible.value = false;
    keepAliveExclude.value.push('Socket'); // 关闭对话框时将 Socket 组件排除
    setTimeout(() => {
        keepAliveExclude.value = []; // 重置排除列表，以便下次打开时重新缓存
    }, 0);
};

const saveConn = (value) => {
    if (isEdit.value) {
        // 编辑现有连接
        // ethernetStore.updateConnection(editingRow.value, value);
        console.log('编辑连接:', editingRow.value);
    } else {
        // 新增连接
        console.log('新增连接:', value);
        // ethernetStore.addConnection(value);
    }

    // 重置编辑状态并关闭对话框
    isEdit.value = false;
    editingRow.value = {};
    newConnDialogVisible.value = false;
    ElMessage.success(editingRow.value ? '连接已更新' : '连接已添加')
};

const editConn = (row) => {
    console.log('编辑连接:', row);
    editingRow.value = Object.assign({}, row);
    isEdit.value = true;
    newConnDialogVisible.value = true;
    ifconfigVisible.value = false;
    keepAliveExclude.value = [];
};

const deleteConn = (row) => {
    // 删除连接逻辑
    console.log('删除连接:', row);
    // ethernetStore.removeConnection(row);
    ElMessage.success('连接删除成功')
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
</style>
