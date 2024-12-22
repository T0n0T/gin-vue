<template>
    <el-main style="padding: 0% 5% 0% 5%;">
        <el-form :model="configForm" :rules="rules" label-width="100px" label-position="right">
            <!-- DHCP开关 -->
            <el-form-item label="DHCP">
                <el-switch v-model="configForm.dhcp" active-text="开" inactive-text="关"></el-switch>
            </el-form-item>

            <!-- 根据DHCP开关状态显示或隐藏其他输入框 -->
            <el-form-item v-if="!configForm.dhcp" label="IP地址" prop="ip">
                <el-input v-model="configForm.ip" placeholder="请输入IP地址"></el-input>
            </el-form-item>
            <el-form-item v-if="!configForm.dhcp" label="子网掩码" prop="subnetMask">
                <el-input v-model="configForm.subnetMask" placeholder="请输入子网掩码"></el-input>
            </el-form-item>
            <el-form-item v-if="!configForm.dhcp" label="默认网关" prop="gateway">
                <el-input v-model="configForm.gateway" placeholder="请输入默认网关"></el-input>
            </el-form-item>
            <el-form-item v-if="!configForm.dhcp" label="DNS服务器" prop="dns">
                <el-input v-model="configForm.dns" placeholder="请输入DNS服务器"></el-input>
            </el-form-item>
        </el-form>
    </el-main>
    <el-footer style="display: flex; justify-content: center; height: fit-content;">
        <el-button circle type="text" :icon="CloseBold" @click="ifconfigClose" />
        <el-button circle type="text" :icon="Select" @click="ifconfigSubmit" style="margin-left: 30px;" />
    </el-footer>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { CloseBold, Select } from '@element-plus/icons-vue'

const props = defineProps({
    ifaceName: String
});

const configForm = ref({
    dhcp: false,
    ip: '',
    subnetMask: '',
    gateway: '',
    dns: ''
});
const rules = ref({
    ip: [
        { required: true, message: '请输入IP地址', trigger: 'blur' },
        {
            pattern: /^(\d{1,3}\.){3}\d{1,3}$/,
            message: '请输入正确的IP地址',
            trigger: 'blur'
        }
    ],
    subnetMask: [
        { required: true, message: '请输入子网掩码', trigger: 'blur' },
        {
            pattern: /^(\d{1,3}\.){3}\d{1,3}$/,
            message: '请输入正确的子网掩码',
            trigger: 'blur'
        }
    ],
    gateway: [
        { required: true, message: '请输入默认网关', trigger: 'blur' },
        {
            pattern: /^(\d{1,3}\.){3}\d{1,3}$/,
            message: '请输入正确的默认网关',
            trigger: 'blur'
        }
    ],
    dns: [
        { required: false, message: '请输入DNS服务器', trigger: 'blur' },
        {
            pattern: /^(\d{1,3}\.){3}\d{1,3}$/,
            message: '请输入正确的DNS服务器',
            trigger: 'blur'
        }
    ]
});

const resetForm = () => {
    configForm.value = {
        dhcp: false,
        ip: '',
        subnetMask: '',
        gateway: '',
        dns: ''
    };
};

const emit = defineEmits(['submit', 'close'])

const ifconfigSubmit = () => {
    if (configForm) {
        configForm.value.ifaceName = props.ifaceName; // 添加ifaceName成员
        console.log('Updated form with ifaceName:', configForm.value); // 打印表单
        ElMessage({
            message: '配置已保存',
            type: 'success'
        });
        resetForm()
        emit('submit')
    } else {
        console.log('error ifconfig submit!!')
        return false
    }
}

const ifconfigClose = () => {
    emit('close')
}

onMounted(() => {
    console.log('mount ifconfig', props.ifaceName)
})
</script>

<style scoped></style>
