<template>
    <el-aside width="200px">
        <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo" 
            text-color="#fff" :default-active="defaultActive">
            <!-- 无线配置子菜单 -->
            <el-sub-menu index="1">
                <template #title>
                    <font-awesome-icon icon="fa-solid fa-network-wired" />
                    <span>无线配置</span>
                </template>
                <el-menu-item index="1-1">
                    <span>蓝牙配置</span>
                </el-menu-item>
                <el-menu-item index="1-2">
                    <font-awesome-icon icon="fa-solid fa-wifi" />
                    <span>WiFi配置</span>
                </el-menu-item>
                <el-menu-item index="1-3">
                    <font-awesome-icon icon="fa-solid fa-signal" />
                    <span>LoRa配置</span>
                </el-menu-item>
            </el-sub-menu>
            
            <!-- 路由配置 -->
            <el-menu-item index="2">
                <font-awesome-icon icon="fa-solid fa-gear" />
                <span>路由配置</span>
            </el-menu-item>
            
            <!-- 数据统计 -->
            <el-menu-item index="3">
                <font-awesome-icon icon="fa-solid fa-chart-line" />
                <span>数据统计</span>
            </el-menu-item>
        </el-menu>
    </el-aside>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Connection, Setting, DataLine} from '@element-plus/icons-vue'

const defaultActive = ref('1-1')

const handleSelect = (index: string) => {
  console.log('选中的菜单项:', index)
  // 这里可以添加路由跳转等逻辑
}
</script>

<style scoped>
.fa-solid {
    margin-right: 8px;
    width: 24px;
}
</style>