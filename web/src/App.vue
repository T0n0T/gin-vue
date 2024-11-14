<template>
  <div class="common-layout">
    <el-container>
      <el-header></el-header>
      <el-main>
        <el-carousel :interval="4000" type="card" height="500px">
          <!-- 遍历图片数组 -->
          <el-carousel-item v-for="(image, index) in images" :key="index">
            <img :src="image" alt="Image" style="width: 100%; height: 100%; object-fit: cover;" />
          </el-carousel-item>
        </el-carousel>
      </el-main>
      <el-footer></el-footer>
    </el-container>
  </div>
</template>

<style scoped>
.common-layout {

  .el-header,
  .el-footer,
  .el-main,

  .el-header,
  .el-footer {
    /* background-color: var(--el-color-primary-light-7); */
    height: 10vh;
  }

  .el-main {
    /* background-color: var(--el-color-primary-light-9); */
    align-content: center;
    height: 80vh;

  }
}
</style>


<script>
import _axios from 'axios'
import { ElMessage } from 'element-plus'

const baseURL = import.meta.env.VITE_API_BASE_URL

const axios = _axios.create({
  baseURL: baseURL,
})

export default {
  name: 'ImageSlider',
  data() {
    return {
      images: [],         // 图片列表
    }
  },
  mounted() {
    this.newPage()
    this.loadImages()  // 加载图片列表
  },

  methods: {
    newPage() {
      axios.post('/api')
        .then(function (res) {
          // 使用 Element UI 弹窗显示响应结果
          ElMessage({
            message: res.data,
            type: 'success',
            plain: true,
          });
        })
        .catch(function (err) {
          // 使用 Element UI 弹窗显示错误信息
          ElMessage({
            message: err.response ? err.response.data : err.message, // 确保错误数据格式正确
            type: 'error',
            plain: true,
          });
        });
    },
    // 获取图片列表（假设图片存放在服务器的文件夹中）
    loadImages() {
      axios.get('/api/images')
        .then((response) => {
          if (response.data && Array.isArray(response.data.images)) {
            // this.images = response.data.images
            this.images = response.data.images.map(imagePath => {
              console.log(`${baseURL}${imagePath}`)
              return `${baseURL}${imagePath}`;
            });
          } else {
            ElMessage({
              message: '无法加载图片列表。',
              type: 'error',
              plain: true
            })
          }
        })
        .catch((error) => {
          ElMessage({
            message: error.response ? error.response.data : error.message,
            type: 'error',
            plain: true
          })
        })
    },
  }
}
</script>
