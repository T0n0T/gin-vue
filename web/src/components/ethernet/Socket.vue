<template>
  <el-main style="padding: 0% 5% 0% 5%;">
    <el-form :model="configForm" label-width="100px" label-position="right">
      <el-form-item label="网络接口">
        <div class="select-and-buttons">
          <el-select v-model="ifaceSelectMac" placeholder="请选择网卡" class="select-item">
            <el-option v-for="[mac, item] in ifaceMap" :key="mac" :label="item.name" :value="mac">
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <span>
                  {{ item.name }}
                  <span style="font-size: 0.8em; color: #888;">[{{ mac }}]</span>
                  <span v-if="item.status === 'active'">
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
            <el-button circle plain type="text" :icon="Refresh" @click="emit('ifaceFetch')"></el-button>
            <el-button circle plain type="text" :icon="Setting" @click.stop="handleIfaceConfigure"></el-button>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="协议">
        <el-select v-model="configForm.selectedProtocol" placeholder="选择一种协议">
          <el-option label="TCP" value="tcp"></el-option>
          <el-option label="UDP" value="udp"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="远端URL">
        <el-input v-model="configForm.remoteAddr" placeholder="请输入远端URL"></el-input>
      </el-form-item>
    </el-form>
  </el-main>
  <el-footer style="display: flex; justify-content: center; height: fit-content;">
    <el-button circle type="text" :icon="CloseBold" @click="closeEthConfig" />
    <el-button circle type="text" :icon="Select" @click="saveEthConfig" style="margin-left: 30px;" />
  </el-footer>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { CloseBold, Select, Setting, Refresh, Check, Close } from '@element-plus/icons-vue'
import { v4 as uuidv4 } from 'uuid';

const props = defineProps({
  formData: {
    type: Object,
    default: () => ({
      devID: 0,
      selectedProtocol: '',
      proxyUrl: '',
      remoteAddr: '',
      spec: ''
    })
  },
  ifaceMap: Map
})

const emit = defineEmits([
  'ifaceConfigure',
  'ifaceFetch',
  'socketDialogSubmit',
  'socketDialogclose',
])

const ifaceSelectMac = ref('')
const selectedIface = computed(() => props.ifaceMap.get(ifaceSelectMac.value))
const configForm = ref(props.formData)

const handleIfaceConfigure = () => {
  emit('ifaceConfigure', selectedIface.value);
}

const saveEthConfig = () => {
  try {
    if (configForm.value) {
      ElMessage({
        message: '配置已保存',
        type: 'success'
      });
      configForm.value.devID = selectedIface.value.devID;
      configForm.value.spec = uuidv4().toString();
      emit('socketDialogSubmit', configForm.value);
      closeEthConfig();
    } else {
      console.error('Error: configForm is undefined or null');
      ElMessage.error('保存配置失败，请重试。错误信息：' + error.message);
    }
  } catch (error) {
    console.error('保存配置时出错:', error);
    ElMessage.error('保存配置失败，请重试。错误信息：' + error.message);
  }
}

const closeEthConfig = () => {
  try {
    emit('socketDialogclose');
  } catch (error) {
    console.error('关闭配置时出错:', error);
    ElMessage.error('关闭配置失败，请重试。错误信息：' + error.message);
  }
};

onMounted(() => {
  try {
    emit('ifaceFetch');
    ElMessage.info('获取网卡');
  } catch (error) {
    console.error('获取网卡时出错:', error);
    ElMessage.error('获取网卡失败，请重试。错误信息：' + error.message);
  }
})
</script>

<style scoped>
.select-and-buttons {
  display: flex;
  flex: 1;
  overflow-y: auto;
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
