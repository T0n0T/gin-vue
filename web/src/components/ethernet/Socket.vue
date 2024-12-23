<template>
  <el-main style="padding: 0% 5% 0% 5%;">
    <el-form :model="configForm" label-width="100px" label-position="right">
      <el-form-item label="新增连接">
        <div class="select-and-buttons">
          <el-select v-model="configForm.interfaceName" placeholder="请选择网卡" class="select-item">
            <el-option v-for="item in interfaceNameList" :key="item.name" :label="item.name" :value="item.name">
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <span>
                  {{ item.name }}
                  <span style="font-size: 0.8em; color: #888;">[{{ item.mac }}]</span>
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
            <el-button circle plain type="text" :icon="Refresh" @click="emit('interfaceScan')"></el-button>
            <el-button circle plain type="text" :icon="Setting" @click.stop="emit('ifaceConfigure', configForm.value.interfaceName)"></el-button>
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
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { CloseBold, Select, Setting, Refresh, Check, Close } from '@element-plus/icons-vue'

const props = defineProps({
  formData: {
    type: Object,
    default: () => ({
      id: 0,
      interfaceName: '',
      selectedProtocol: '',
      remoteAddr: ''
    })
  },
  interfaceNameList: Array
})

const emit = defineEmits([
  'ifaceConfigure',
  'ifaceFetch',
  'socketDialogSubmit',
  'socketDialogclose',
])

const configForm = ref(props.formData)

const saveEthConfig = () => {
  if (configForm) {
    ElMessage({
      message: '配置已保存',
      type: 'success'
    });
    emit('socketDialogSubmit', configForm.value)
    closePanel()
  } else {
    console.log('error socket submit!!')
    return false
  }
}

const closeEthConfig = () => {
  emit('socketDialogclose');
};

onMounted(() => {
  emit('ifaceFetch')
  ElMessage.info('获取网卡')
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
