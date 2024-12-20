<template>
    <div class="eth-container">
        <el-main>
            <el-dialog :title="dialogTitle" v-model="newConnDialogVisible" width="38.2%">
                <Socket v-if="!ifconfigVisible" @configureIf="configureIf"/>
                <Ifconfig v-if="ifconfigVisible" ifaceName="selectedInterfaceName.value"/>
            </el-dialog>
        </el-main>
        <el-button class="add-button" circle type="primary" :icon="Plus" @click="openNewConnDialog" />
        <el-button class="del-button" circle type="primary" :icon="DeleteFilled" @click="clearConns()" />
    </div>
</template>

<script setup>
import { Plus, DeleteFilled, CloseBold, Select } from '@element-plus/icons-vue'
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import Socket from '@/components/ethernet/Socket.vue' 
import Ifconfig from '@/components/ethernet/Ifconfig.vue'

const newConnDialogVisible = ref(false)
const form = ref({})
const selectedInterfaceName = ref('')
const ifconfigVisible = ref(false)

const dialogTitle = computed(() => {
    return ifconfigVisible.value ? '网卡配置' : '新增连接'
})

const openNewConnDialog = () => {
    newConnDialogVisible.value = true
    ifconfigVisible.value = false
    // 实现扫描对话框逻辑
}

const newConn = () => {
    newConnDialogVisible.value = false;
    ElMessage({
        message: '连接创建成功',
        type: 'success'
    })
}

const clearConns = () => {
    // 实现清除设备逻辑
}

const configureIf = (ifaceName) => {
    console.log('configureIf', ifaceName)
    selectedInterfaceName.value = ifaceName
    ifconfigVisible.value = true
}

const closeIfconfig = () => {
    ifconfigVisible.value = false
}

const handleConfigSaved = () => {
    ifconfigVisible.value = false
}
</script>

<style scoped>
.eth-container {
    height: calc(100vh - 100px);
    padding: 10px;
    border-radius: 8px;
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

.table-view {
    height: 100%;
    background: #f5f7fa;
    border-radius: 8px;
    padding: 20px;
}
</style>
