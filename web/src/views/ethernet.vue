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
                <Socket v-if="!ifconfigVisible && newConnDialogVisible" @configureIf="checkoutIfconfig"
                    @socketDialogSubmit="newConnDialogSubmit" @socketDialogclose="DialogClose" />
                <Ifconfig v-else :ifaceName="selectedInterfaceName" @submit="ifconfigVisible = false"
                    @close="ifconfigVisible = false" />
            </KeepAlive>

        </el-dialog>
    </el-main>
    <el-button class="add-button" circle type="primary" :icon="Plus" @click="openNewConnDialog" />
    <el-button class="del-button" circle type="primary" :icon="DeleteFilled" @click="clearConns()" />
</div>
</template>

<script setup>
import { Plus, DeleteFilled } from '@element-plus/icons-vue'
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import Socket from '@/components/ethernet/Socket.vue'
import Ifconfig from '@/components/ethernet/Ifconfig.vue'

const newConnDialogVisible = ref(false)
const ifconfigVisible = ref(false)
const selectedInterfaceName = ref('')
const excludeComponents = ref([])

const dialogTitle = computed(() => {
    return ifconfigVisible.value ? selectedInterfaceName.value : '新增连接'
})

const openNewConnDialog = () => {
    newConnDialogVisible.value = true
    ifconfigVisible.value = false
    // 实现扫描对话框逻辑
}

const newConnDialogSubmit = () => {
    newConnDialogVisible.value = false;
    ElMessage({
        message: '连接创建成功',
        type: 'success'
    })
}

const clearConns = () => {
    // 实现清除设备逻辑
}

const checkoutIfconfig = (ifaceName) => {
    if (!ifaceName) {
        ElMessage({
            message: '需要选择网卡',
            type: 'warning'
        })
        return
    }

    console.log('checkout to configureIf page', ifaceName)
    selectedInterfaceName.value = ifaceName
    ifconfigVisible.value = true
}

const DialogClose = () => {
    newConnDialogVisible.value = false;
    ifconfigVisible.value = false;
    excludeComponents.value.push('Socket') // 关闭对话框时将 Socket 组件排除
    setTimeout(() => {
        excludeComponents.value = [] // 重置排除列表，以便下次打开时重新缓存
    }, 0)
}

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

.table-view {
    height: 100%;
    background: #f5f7fa;
    border-radius: 8px;
    padding: 20px;
}
</style>
