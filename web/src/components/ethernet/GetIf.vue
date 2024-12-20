<template>
  <div class="getif">
    <div class="select-and-buttons">
      <el-select v-model="selectedInterfaceName" placeholder="请选择网卡" @change="handleInterfaceChange" class="select-item">
        <el-option v-for="item in interfaceNameList" :key="item" :label="item" :value="item">
          <div>
            <span>
              {{ item }}
            </span>
          </div>
        </el-option>
      </el-select>
      <div class="button-container">
        <el-button circle plain type="text" :icon="Refresh" @click="fetchInterfaces"></el-button>
        <el-button v-model="selectedInterfaceName" circle plain type="text" :icon="Setting"
          @click.stop="configureInterface"></el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { Setting, Refresh } from '@element-plus/icons-vue'

const interfaceNameList = ref([])
const selectedInterfaceName = ref('')
const emit = defineEmits(['configure'])

const fetchInterfaces = async () => {
  // try {
  //   const response = await fetch('/api/interfaces');
  //   if (!response.ok) {
  //     throw new Error(`HTTP error! status: ${response.status}`);
  //   }
  //   const data = await response.json();
  //   interfaceList.value = data;
  // } catch (error) {
  //   console.error('Failed to fetch interfaces:', error);
  //   ElMessage.error('Failed to fetch interfaces');
  // }
  ElMessage.info('获取网卡')
  interfaceNameList.value = ['eth0', 'wlan0', 'usb0']
}

const handleInterfaceChange = (ifaceName) => {
  console.log('Selected interface:', ifaceName)
}

const configureInterface = (ifaceName) => {
  console.log('configureInterface', ifaceName)
  emit('configure', ifaceName);
}

onMounted(fetchInterfaces)
</script>

<style scoped>
.getif {
  flex: 1;
  overflow-y: auto;
}

.select-and-buttons {
  display: flex;
  align-items: center;
}

.select-item {
  margin-right: 10px;
}

.button-container {
  display: flex;
  align-items: center;
}
</style>
