<template>
    <el-aside width="200px">
        <el-menu class="el-menu-vertical" :default-active="defaultActive" @select="handleSelect">
            <div class="logo-container">
                <img src="@/assets/logo.png" alt="logo" class="logo" />
                <span class="logo-text">balabala</span>
            </div>

            <!-- 数据统计 -->
            <el-menu-item index="stats">
                <el-icon>
                    <DataLine />
                </el-icon>
                <span>数据统计</span>
            </el-menu-item>

            <!-- 路由配置 -->
            <el-menu-item index="router">
                <el-icon>
                    <Switch />
                </el-icon>
                <span>路由配置</span>
            </el-menu-item>

            <!-- 网络配置 -->
            <el-menu-item index="ethernet">
                <el-icon>
                    <Link />
                </el-icon>
                <span>网络配置</span>
            </el-menu-item>

            <!-- 无线配置子菜单 -->
            <el-sub-menu index="wireless">
                <template #title>
                    <el-icon>
                        <Connection />
                    </el-icon>
                    <span>无线配置</span>
                </template>
                <el-menu-item index="wireless/bluetooth">
                    <el-icon>
                        <font-awesome-icon icon="fa-brands fa-bluetooth" />
                    </el-icon>
                    <span>Bluetooth</span>
                </el-menu-item>
                <el-menu-item index="wireless/wlan">
                    <el-icon>
                        <font-awesome-icon icon="wifi" />
                    </el-icon>
                    <span>WLAN</span>
                </el-menu-item>
                <el-menu-item index="wireless/lorawan">
                    <el-icon>
                        <font-awesome-icon icon="signal" />
                    </el-icon>
                    <span>LoRaWan</span>
                </el-menu-item>
            </el-sub-menu>
        </el-menu>
    </el-aside>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Connection, Switch, DataLine, Link } from '@element-plus/icons-vue'
import { useBreadCrumbsStore } from '@/store/breadcrumbs'

/**
 * @typedef {Object} MenuPath
 * @property {string} path - 路由路径
 * @property {string[]} breadcrumbs - 对应的面包屑文本数组
 */

/**
 * @type {import('vue-router').Router} 
 */
const router = useRouter()

/**
 * @type {import('vue-router').RouteLocationNormalizedLoaded} 
 */
const route = useRoute()

/**
 * @type {import('pinia').Store} 
 */
const store = useBreadCrumbsStore()

/**
 * @type {import('vue').Ref<string>} 当前激活的菜单项
 */
const defaultActive = ref(route.path)

/**
 * 菜单项选择处理函数
 * @param {string} index - 被选中菜单项的索引
 */
const handleSelect = (index) => {
    const menuText = {
        '/': [''],
        'stats': ['数据统计'],
        'router': ['路由配置'],
        'ethernet': ['网络配置'],
        'wireless/bluetooth': ['无线配置', 'Bluetooth'],
        'wireless/wlan': ['无线配置', 'WLAN'],
        'wireless/lorawan': ['无线配置', 'LoRaWan'],
    }
    defaultActive.value = index
    router.push('/' + index)
}

/**
 * 监听路由变化，更新面包屑
 * @type {Object.<string, string[]>} menuText - 路径到面包屑的映射
 */
const menuText = {
    '/': [''],
    '/stats': ['数据统计'],
    '/router': ['路由配置'],
    '/ethernet': ['网络配置'],
    '/wireless/bluetooth': ['无线配置', 'Bluetooth'],
    '/wireless/wlan': ['无线配置', 'WLAN'],
    '/wireless/lorawan': ['无线配置', 'LoRaWan'],
}

watch(
    () => route.path,
    /**
     * 路由变化处理函数
     * @param {string} newPath - 新的路由路径
     */
    (newPath) => {
        if (menuText.hasOwnProperty(newPath)) {
            store.updateBreadcrumbs(menuText[newPath])
        } else {
            console.warn(`未找到路径: ${newPath}`)
            store.updateBreadcrumbs([])
        }
    },
    { immediate: true }
)
</script>

<style scoped>
.el-aside {
    height: inherit;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 8px 0 5px 1px rgba(3, 3, 92, 0.1);
    position: relative;
    z-index: 1000;
    /* 确保在其他元素上方 */
}

/* 确保菜单占满 el-aside 的高度 */
.el-menu-vertical {
    height: 100vh;
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

/* 子菜单项样式 */
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
    align-self: center;
    width: 50%;
    height: 50%;
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