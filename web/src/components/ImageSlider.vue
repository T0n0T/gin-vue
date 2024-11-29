<template>
  <div class="image-slider">
    <el-carousel :interval="4000" type="card" height="500px">
      <el-carousel-item v-for="(image, index) in images" :key="index">
        <img :src="image" alt="Image" style="width: 100%; height: 100%; object-fit: cover;" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

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
      images: [],
    }
  },
  mounted() {
    this.newPage()
    this.loadImages()
  },
  methods: {
    newPage() {
      axios.post('/api')
        .then(function (res) {
          ElMessage({
            message: res.data,
            type: 'success',
            plain: true,
          });
        })
        .catch(function (err) {
          ElMessage({
            message: err.response ? err.response.data : err.message,
            type: 'error',
            plain: true,
          });
        });
    },
    loadImages() {
      axios.get('/api/images')
        .then((response) => {
          if (response.data && Array.isArray(response.data.images)) {
            this.images = response.data.images.map(imagePath => {
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