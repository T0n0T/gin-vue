<template>
  <div class="getif">
    <div class="select-and-buttons">
      <el-select v-model="selectedInterface" placeholder="请选择网卡" @change="handleInterfaceChange" class="select-item">
        <el-option v-for="item in interfaceList" :key="item" :label="item" :value="item">
          <div>
            <span>
              {{ item }}
            </span>
          </div>
        </el-option>
      </el-select>
      <div class="button-container">
        <el-button circle plain type="text" :icon="Refresh" @click="fetchInterfaces"></el-button>
        <el-button circle plain type="text" :icon="Setting" @click.stop="configureInterface(selectedInterface.value)"></el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { Setting, Refresh } from '@element-plus/icons-vue';

const interfaceList = ref([]);
const selectedInterface = ref('');

const emit = defineEmits(['configure']);

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
    interfaceList.value = ['eth0', 'wlan0', 'usb0'];
};

const handleInterfaceChange = (value) => {
  console.log('Selected interface:', value);
};

const configureInterface = (iface) => {
  emit('configure', iface);
};

onMounted(fetchInterfaces);
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
  /* 可选：添加一些间距 */
}

.button-container {
  display: flex;
  align-items: center;
}
</style>
