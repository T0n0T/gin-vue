<template>
    <div>
        <!-- Button to open the configuration dialog -->
        <el-button type="primary" @click="openDialog">配置网卡</el-button>

        <!-- Dialog for NIC configuration -->
        <el-dialog title="网卡配置" v-model="dialogVisible" width="50%" @close="resetForm">
            <el-form :model="form" ref="configForm" :rules="rules" label-width="100px" label-position="right">
                <!-- DHCP开关 -->
                <el-form-item label="DHCP">
                    <el-switch v-model="form.dhcp" active-text="开" inactive-text="关"></el-switch>
                </el-form-item>

                <!-- 根据DHCP开关状态显示或隐藏其他输入框 -->
                <el-form-item v-if="!form.dhcp" label="IP地址" prop="ip">
                    <el-input v-model="form.ip" placeholder="请输入IP地址"></el-input>
                </el-form-item>
                <el-form-item v-if="!form.dhcp" label="子网掩码" prop="subnetMask">
                    <el-input v-model="form.subnetMask" placeholder="请输入子网掩码"></el-input>
                </el-form-item>
                <el-form-item v-if="!form.dhcp" label="默认网关" prop="gateway">
                    <el-input v-model="form.gateway" placeholder="请输入默认网关"></el-input>
                </el-form-item>
                <el-form-item v-if="!form.dhcp" label="DNS服务器" prop="dns">
                    <el-input v-model="form.dns" placeholder="请输入DNS服务器"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="saveConfig">保存</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const dialogVisible = ref(false);
const form = ref({
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

const configForm = ref(null);

const openDialog = () => {
    dialogVisible.value = true
};

const resetForm = () => {
    form.value = {
        dhcp: false,
        ip: '',
        subnetMask: '',
        gateway: '',
        dns: ''
    };
};

const saveConfig = () => {
    configForm.value.validate((valid) => {
        if (valid) {
            console.log('Form submitted:', form.value)
            dialogVisible.value = false;
            ElMessage({
                message: '配置已保存',
                type: 'success'
            });
        } else {
            console.log('error submit!!')
            return false;
        }
    });
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
