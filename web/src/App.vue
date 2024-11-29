<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="1"
          class="el-menu-vertical"
          :collapse="isCollapse"
          @select="handleSelect"
        >
          <el-menu-item index="1">
            <el-icon><Picture /></el-icon>
            <span>图片轮播</span>
          </el-menu-item>
          <el-menu-item index="2">
            <el-icon><Document /></el-icon>
            <span>菜单项2</span>
          </el-menu-item>
          <el-menu-item index="3">
            <el-icon><Setting /></el-icon>
            <span>菜单项3</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      
      <el-container>
        <el-header></el-header>
        <el-main>
          <ImageSlider v-if="currentPage === '1'" />
          <!-- 其他页面的内容可以在这里添加 -->
        </el-main>
        <el-footer></el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { Picture, Document, Setting } from '@element-plus/icons-vue'
import ImageSlider from './components/ImageSlider.vue'

export default {
  name: 'App',
  components: {
    ImageSlider,
    Picture,
    Document,
    Setting
  },
  data() {
    return {      
      currentPage: '1'
    }
  },
  methods: {
    handleSelect(key) {
      console.log(key)
      this.currentPage = key
    }
  }
}
</script>

<style scoped>
.common-layout {
  height: 100vh;
  
  .el-container {
    height: 100%;
  }

  .el-aside {
    background-color: var(--el-menu-bg-color);
  }

  .el-header,
  .el-footer {
    height: 10vh;
  }

  .el-main {
    height: 80vh;
  }

  .el-menu-vertical {
    height: 100%;
  }
}
</style>
