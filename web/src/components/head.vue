<template>
    <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item 
            v-for="(item, index) in store.breadcrumbs" 
            :key="index"
        >
            {{ item }}
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<style scoped>
/* 确保返回按钮不会被标题遮挡 */
:deep(.el-page-header__left) {
    z-index: 1;
}
</style>

<script setup>
import { ArrowRight } from '@element-plus/icons-vue'
import { useStore } from '@/store'

const store = useStore()
</script>