<template><el-main style="padding: 0% 5% 0% 5%;">
    <el-form :model="configForm" label-width="100px" label-position="right">
        <el-form-item label="新增连接">
            <GetIf v-model:ifaceName="configForm.interfaceName" @interfaceNeedConfig="interfaceDoConfigurate" />
        </el-form-item>
        <el-form-item label="协议">
            <el-select v-model="configForm.selectedProtocol" placeholder="选择一种协议">
                <el-option label="TCP" value="tcp"></el-option>
                <el-option label="UDP" value="udp"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="远端URL">
            <el-input v-model="configForm.remoteUrl" placeholder="请输入远端URL"></el-input>
        </el-form-item>
    </el-form>
</el-main>
<el-footer style="display: flex; justify-content: center; height: fit-content;">
    <el-button circle type="text" :icon="CloseBold" @click="closePanel" />
    <el-button circle type="text" :icon="Select" @click="saveConfig" style="margin-left: 30px;" />
</el-footer></template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { CloseBold, Select } from '@element-plus/icons-vue'
import GetIf from '@/components/ethernet/GetIf.vue'

const props = defineProps({
    isEdit: Boolean,
    formData: {
        type: Object,
        default: () => ({
            id: 0,
            interfaceName: '',
            selectedProtocol: '',
            remoteUrl: ''
        })
    }
})

const configForm = ref(props.formData)

const emit = defineEmits([
    'interfaceConfigurate', 
    'socketDialogSubmit', 
    'socketDialogclose',
])

const interfaceDoConfigurate = (data) => {
    configForm.interfaceName = data
    emit('interfaceConfigurate', data)
}

const saveConfig = () => {
    if (configForm) {
        ElMessage({
            message: '配置已保存',
            type: 'success'
        });
        emit('socketDialogSubmit', props.isEdit ,configForm.value)
        closePanel()
    } else {
        console.log('error socket submit!!')
        return false
    }
}

const closePanel = () => {
    emit('socketDialogclose');
};

</script>
