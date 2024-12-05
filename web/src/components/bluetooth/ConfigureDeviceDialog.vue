<template>
  <el-dialog v-model="dialogVisible" :title="'配置设备 - ' + device?.name" width="500px">
    <div class="configure-content">
      <!-- 基本信息 -->
      <div class="info-section">
        <div class="info-item">
          <span class="label">设备名称:</span>
          <span>{{ device?.name || '未知设备' }}</span>
        </div>
        <div class="info-item">
          <span class="label">MAC地址:</span>
          <span>{{ device?.address }}</span>
        </div>
        <div class="info-item">
          <span class="label">信号强度:</span>
          <span>{{ device?.rssi }} dBm</span>
        </div>
      </div>

      <!-- 配置选项 -->
      <div class="config-section">
        <el-form :model="configForm" label-width="120px">
          <el-form-item label="连接超时时间">
            <el-input-number v-model="configForm.timeout" :min="1" :max="60" />
            <span class="unit">秒</span>
          </el-form-item>
          <el-form-item label="自动重连">
            <el-switch v-model="configForm.autoReconnect" />
          </el-form-item>
          <el-form-item label="通知">
            <el-switch v-model="configForm.notifications" />
          </el-form-item>
        </el-form>
      </div>
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="saveConfig">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue'

const props = defineProps({
  visible: Boolean,
  device: Object
})

const emit = defineEmits(['update:visible', 'save'])

const dialogVisible = ref(props.visible)
const configForm = ref({
  timeout: 30,
  autoReconnect: true,
  notifications: true
})

// 监听visible变化
watch(() => props.visible, (newVal) => {
  dialogVisible.value = newVal
})

// 监听dialog自身的变化
watch(dialogVisible, (newVal) => {
  emit('update:visible', newVal)
})

const closeDialog = () => {
  dialogVisible.value = false
}

const saveConfig = () => {
  emit('save', {
    device: props.device,
    config: configForm.value
  })
  closeDialog()
}
</script>

<style scoped>
.configure-content {
  padding: 20px;
}

.info-section {
  margin-bottom: 20px;
  padding: 15px;
  background: #f5f7fa;
  border-radius: 8px;
}

.info-item {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.label {
  font-weight: bold;
  margin-right: 10px;
  width: 80px;
}

.config-section {
  margin-top: 20px;
}

.unit {
  margin-left: 10px;
  color: #666;
}
</style>