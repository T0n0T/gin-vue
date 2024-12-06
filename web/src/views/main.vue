<script setup>
import Menu from '@/components/menu.vue'
import Head from '@/components/head.vue'
</script>

<template>
    <div class="common-layout">
        <el-container class="container">
            <Menu class="aside" />
            <el-container>
                <el-header class="el-header">
                    <Head />
                </el-header>
                <el-main class="right-main">
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<style scoped>
.common-layout {
    height: 100%;
    width: 100%;
    /* background-color: #53ebca; */
    padding: 10px;
}
.aside { 
    /* height: inherit; */
    background-color: #f9ff9e;
}
.container {
    /* background-color: #25b97b; */
    overflow: hidden;
    border-radius: 10px;
    /* 防止溢出 */
}
.el-main {
    padding: 20px;
    height: 80%;
}
.el-header {
    background-color: var(--el-bg-color);
    display: flex;
    align-items: center;
    height: auto !important;
    padding: 12px 20px;    
    border-radius: 10px;
}
</style>
