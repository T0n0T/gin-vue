<template>
  <div class="getif">
    <div class="select-and-buttons">
      <el-select v-model="selectedInterfaceName" placeholder="请选择网卡" @change="handleInterfaceChange"
        class="select-item">
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
        <el-button circle plain type="text" :icon="Setting" @click.stop="configureInterface"></el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { Setting, Refresh } from '@element-plus/icons-vue'

const props = defineProps({ ifaceName: String })
const interfaceNameList = ref([])
const emit = defineEmits(['update:ifaceName', 'configureInterface'])

const selectedInterfaceName = computed({
  get: () => props.ifaceName,
  set: (value) => emit('update:ifaceName', value)
})

const fetchInterfaces = async () => {
  ElMessage.info('获取网卡')
  interfaceNameList.value = ['eth0', 'wlan0', 'usb0']
}

const handleInterfaceChange = (value) => {
  console.log('Selected interface:', value)
}

const configureInterface = () => {
  emit('configureInterface', props.ifaceName)
};

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
