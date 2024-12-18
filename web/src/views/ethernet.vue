<template>
    <div class="eth-container">
        <el-main>
            <Ifconfig />
        </el-main>
        <el-button class="add-button" circle type="primary" :icon="Plus" @click="openConnCreateDialog" />
        <el-button class="del-button" circle type="primary" :icon="DeleteFilled" @click="clearConns()" />
    </div>
</template>

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

<script setup>
import { Plus, DeleteFilled } from '@element-plus/icons-vue'
import Ifconfig from '@/components/ethernet/Ifconfig.vue'

const openConnCreateDialog = () => {
    // 实现扫描对话框逻辑
}

const clearConns = () => {
    // 实现清除设备逻辑
}
</script>
