<template>
    <div class="eth-container">
        <el-main>

            <el-dialog :title="dialogTitle" v-model="newConnDialogVisible" width="50%">
                <div v-if="!ifconfigVisible">
                    <el-form :model="form" label-width="100px" label-position="right">
                        <el-form-item label="新增连接">
                            <Getif @configure="handleConfigure" />
                        </el-form-item>
                    </el-form>
                </div>
                <Ifconfig v-if="ifconfigVisible" :ifaceName="selectedInterfaceName" @close="closeIfconfig" @configSaved="handleConfigSaved"/>
                <template #footer>
                    <span style="margin-right: 30px;">
                        <el-button type="text" :icon="CloseBold" @click="newConnDialogVisible = false" />
                        <el-button type="text" :icon="Select" @click="newConn" style="margin-left: 30px;" />
                    </span>
                </template>
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
import Ifconfig from '@/components/ethernet/Ifconfig.vue'
import Getif from '@/components/ethernet/Getif.vue'

const newConnDialogVisible = ref(false)
const form = ref({})
const selectedInterfaceName = ref('')
const ifconfigVisible = ref(false)

const dialogTitle = computed(() => {
    return ifconfigVisible.value ? '网卡配置' : '新增连接'
})

const openNewConnDialog = () => {
    newConnDialogVisible.value = true
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

const handleConfigure = (ifaceName) => {
    console.log('handleConfigure', ifaceName)
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
