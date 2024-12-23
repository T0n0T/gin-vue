<template>
    <div class="eth-container">
        <el-main class="eth-view">
            <el-dialog width="38.2%" :show-close="true" draggable v-model="newConnDialogVisible" @close="DialogClose">
                <template #header="{ titleId, titleClass }">
                    <div style="display: flex; justify-content: space-between; align-self: center;">
                        <h4 :id="titleId" :class="titleClass">{{ dialogTitle }}</h4>
                    </div>
                </template>
                <KeepAlive :exclude="excludeComponents">
                    <Socket v-if="!ifconfigVisible && newConnDialogVisible" :formData="editingRow"
                        @interfaceConfigurate="checkoutIfconfig" @socketDialogSubmit="saveConn"
                        @socketDialogclose="DialogClose" />
                    <Ifconfig v-else :ifaceName="selectedInterfaceName" @submit="ifconfigVisible = false"
                        @close="ifconfigVisible = false" />
                </KeepAlive>
            </el-dialog>
            <div class="search-container">
                <el-input v-model="searchQuery" placeholder="搜索连接名称或协议" prefix-icon="Search" clearable
                    @input="handleSearch" style="width: 100%; margin-bottom: 15px;" />
            </div>
            <el-table ref="ethConnTable" :data="filteredConnections" border style="width: 100%" highlight-current-row>
                <el-table-column prop="interfaceName" label="连接名称" />
                <el-table-column prop="selectedProtocol" label="协议" />
                <el-table-column prop="remoteUrl" label="远端URL" />
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
import { ref, computed } from 'vue';
import { ElMessage } from 'element-plus';
import { v5 as uuidv5 } from 'uuid';
import { DeviceManager } from '@/core/devMngr'
import { netctl } from '@/proto/net'

import Socket from '@/components/ethernet/Socket.vue';
import Ifconfig from '@/components/ethernet/Ifconfig.vue';

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

const newConnDialogVisible = ref(false);
const ifconfigVisible = ref(false);
const selectedInterfaceName = ref('');
const excludeComponents = ref([]);
const isEdit = ref(false);
const editingRow = ref({});
const ethConnTable = ref(null);
const searchQuery = ref('');

const dialogTitle = computed(() => {
    let connTitle = isEdit.value ? '编辑连接' : '新增连接';
    return ifconfigVisible.value ? selectedInterfaceName.value : connTitle;
});

const filteredConnections = computed(() => {
    if (!searchQuery.value) return ethernetStore.connections;

    const query = searchQuery.value.toLowerCase();
    return ethernetStore.connections.filter(conn =>
        conn.interfaceName.toLowerCase().includes(query) ||
        conn.selectedProtocol.toLowerCase().includes(query)
    );
});

const openNewConnDialog = () => {
    newConnDialogVisible.value = true;
    ifconfigVisible.value = false;
    // 实现扫描对话框逻辑
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
    selectedInterfaceName.value = ifaceName;
    ifconfigVisible.value = true;
};

const DialogClose = () => {
    newConnDialogVisible.value = false;
    ifconfigVisible.value = false;
    excludeComponents.value.push('Socket'); // 关闭对话框时将 Socket 组件排除
    setTimeout(() => {
        excludeComponents.value = []; // 重置排除列表，以便下次打开时重新缓存
    }, 0);
};

const saveConn = (value) => {
    if (isEdit.value) {
        // 编辑现有连接
        ethernetStore.updateConnection(editingRow.value, value);
        console.log('编辑连接:', editingRow.value);
    } else {
        // 新增连接
        console.log('新增连接:', value);
        ethernetStore.addConnection(value);
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
    excludeComponents.value = [];
};

const deleteConn = (row) => {
    // 删除连接逻辑
    console.log('删除连接:', row);
    ethernetStore.removeConnection(row);
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
