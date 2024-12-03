<template>
    <el-aside width="200px">
        <el-menu class="el-menu-vertical" :default-active="defaultActive" @select="handleSelect">
            <div class="logo-container">
                <!-- <svg-icon name="logo" class="logo"/> -->
                <img src="@/assets/cat.png" alt="logo" class="logo"/>
                <span class="logo-text">网关管理系统</span>
            </div>

            <!-- 数据统计 -->
            <el-menu-item index="1">
                <el-icon>
                    <DataLine />
                </el-icon>
                <span>数据统计</span>
            </el-menu-item>

            <!-- 路由配置 -->
            <el-menu-item index="2">
                <el-icon>
                    <Switch />
                </el-icon>
                <span>路由配置</span>
            </el-menu-item>

            <!-- 无线配置子菜单 -->
            <el-sub-menu index="3">
                <template #title>
                    <el-icon>
                        <Connection />
                    </el-icon>
                    <span>无线配置</span>
                </template>
                <el-menu-item index="1-1">
                    <el-icon>
                        <font-awesome-icon icon="fa-brands fa-bluetooth" />
                    </el-icon>
                    <span>Bluetooth</span>
                </el-menu-item>
                <el-menu-item index="1-2">
                    <el-icon>
                        <font-awesome-icon icon="wifi" />
                    </el-icon>
                    <span>WLAN</span>
                </el-menu-item>
                <el-menu-item index="1-3">
                    <el-icon>
                        <font-awesome-icon icon="signal" />
                    </el-icon>
                    <span>LoRaWan</span>
                </el-menu-item>
            </el-sub-menu>
        </el-menu>
    </el-aside>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Connection, Switch, DataLine } from '@element-plus/icons-vue'
import SvgIcon from '@/components/svgIcon.vue'
import { useStore } from '@/store'

const defaultActive = ref('1')
const store = useStore()

const handleSelect = (index, indexPath) => {
    // 根据选中的菜单更新面包屑
    const menuText = {
        '1': ['数据统计'],
        '2': ['路由配置'],
        '3': ['无线配置'],
        '1-1': ['无线配置', 'Bluetooth'],
        '1-2': ['无线配置', 'WLAN'],
        '1-3': ['无线配置', 'LoRaWan'],
    }
    store.updateBreadcrumbs(menuText[index] || [])
}
</script>

<style scoped>
.el-aside {
    height: 100%;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 8px 0 5px 1px rgba(3, 3, 92, 0.1);
    position: relative;
    z-index: 1000;
    /* 确保在其他元素上方 */
}

/* 确保菜单占满 el-aside 的高度 */
.el-menu-vertical {
    height: 100%;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 10px 0;
}

/* 选中项的样式 */
:deep(.el-menu-item.is-active) {
    background-color: color-mix(in srgb, var(--el-menu-hover-bg-color) 80%, rgb(129, 248, 222)) !important;
    /* 使用 Element Plus 的变量 */
    color: #1fb1f5d3 !important;
    border-radius: 4px;
    /* 可选：添加圆角 */
    margin: 0 10px;
    /* 可选：左右留出边距 */
    width: calc(100% - 20px);
    /* 配合 margin 使用 */
}

/* 悬停效果 */
:deep(.el-menu-item:hover) {
    background-color: var(--el-menu-hover-bg-color);
    border-radius: 4px;
    margin: 0 10px;
    width: calc(100% - 20px);
}

/* 子菜单项的样式 */
:deep(.el-sub-menu .el-menu-item) {
    min-width: unset !important;
    /* 覆盖默认的最小宽度 */
    margin: 0 10px;
    border-radius: 4px;
}

/* 可选：调整子菜单的缩进 */
:deep(.el-menu .el-menu--inline .el-menu-item) {
    padding-left: 30px !important;
}

/* 如果需要自定义选中和悬停的颜色 */
:root {
    --selected-bg-color: #ecf5ff;
    /* 选中背景色 */
    --selected-text-color: #409eff;
    /* 选中文字色 */
}

.logo-container {    
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 5px;
}

.logo {
    width: 80%;
    height: 80%;
    align-self: center;
}

.logo-text {
    font-size: 16px;
    font-weight: bold;
    color: var(--el-text-color-primary);
    white-space: nowrap;
    /* 防止文字换行 */
}

/* 确保菜单项与 logo 对齐 */
:deep(.el-menu-item),
:deep(.el-sub-menu__title) {
    margin: 0 10px;
    border-radius: 4px;
}
</style>