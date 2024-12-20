<template>
    <el-main style="padding: 0% 5% 0% 5%;">
        <el-form :model="form" ref="configForm" label-width="100px" label-position="right">
            <el-form-item label="新增连接">
                <GetIf v-model="form.interfaceName" @configure="handleConfigure" />
            </el-form-item>
            <el-form-item label="协议">
                <el-select v-model="form.selectedProtocol" placeholder="选择一种协议">
                    <el-option label="TCP" value="tcp"></el-option>
                    <el-option label="UDP" value="udp"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="远端URL">
                <el-input v-model="form.remoteUrl" placeholder="请输入远端URL"></el-input>
            </el-form-item>
        </el-form>
    </el-main>
    <el-footer style="display: flex; justify-content: center; height: fit-content;">
        <el-button circle type="text" :icon="CloseBold" @click="closePanel" />
        <el-button circle type="text" :icon="Select" @click="saveConfig" style="margin-left: 30px;" />
    </el-footer>
</template>

<script setup>
import { ref } from 'vue'
import GetIf from '@/components/ethernet/GetIf.vue'
import { CloseBold, Select } from '@element-plus/icons-vue'

const configForm = ref(null);
const emit = defineEmits(['configureIf', 'configSaved', 'close'])
const form = ref({
    interfaceName: 0,
    selectedProtocol: '',
    remoteUrl: ''
});

const resetForm = () => {
    form.value = {
        interfaceName: 0,
        selectedProtocol: '',
        remoteUrl: ''
    };
};

const handleConfigure = (data) => {
    emit('configureIf', data);
};

const saveConfig = () => {
    configForm.value.validate((valid) => {
        if (valid) {
            console.log('Form submitted:', form.value)
            ElMessage({
                message: '配置已保存',
                type: 'success'
            });
            emit('configSaved');
            closePanel();
        } else {
            console.log('error submit!!')
            return false;
        }
    });
};

const closePanel = () => {
    resetForm();
    emit('close');
};
</script>
