<template>
<div class="getif">
  <div class="select-and-buttons">
    <el-select v-model="selectedInterfaceName" placeholder="请选择网卡" @change="handleInterfaceChange" class="select-item">
      <el-option v-for="item in interfaceNameList" :key="item.name" :label="item.name" :value="item.name">
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <span>
            {{ item.name }}
            <span v-if="item.available">
              <Check style="max-height: 1em; color: green;" />
            </span>
            <span v-else>
              <Close style="max-height: 1em; color: red;" />
            </span>
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
import { Setting, Refresh, Check, Close } from '@element-plus/icons-vue'

const props = defineProps({ ifaceName: String })
const interfaceNameList = ref([
  { name: 'eth0', available: true },
  { name: 'wlan0', available: false },
  { name: 'usb0', available: true }
]);
const emit = defineEmits(['update:ifaceName', 'configureInterface'])

const selectedInterfaceName = computed({
  get: () => props.ifaceName,
  set: (value) => emit('update:ifaceName', value)
})

const fetchInterfaces = async () => {
  ElMessage.info('获取网卡')
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
