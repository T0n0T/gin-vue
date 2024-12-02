<script lang="ts" setup>
import Aside from '@/components/menu.vue'
</script>

<template>
    <div class="common-layout">
        <el-container class="container">
            <Aside class="aside">aside</Aside>
            <el-container>
                <el-header class="el-header">
                    <common-header>header</common-header>
                </el-header>
                <el-main class="right-main">
                    main
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<style scoped>
.common-layout {
    height: 100%;
    width: 100%;
    background-color: #53ebca;
    padding: 10px;
}
.aside {
    background-color: #f9ffa2;
}
.container {
    height: 100%;
    background-color: #fce876;
    overflow: hidden;
    /* 防止溢出 */
}

.el-header {
    background-color: #bfc74b;
}
</style>
