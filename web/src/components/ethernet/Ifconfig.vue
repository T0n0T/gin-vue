<template>
    <div>
        <!-- Button to open the configuration dialog -->
        <el-button type="primary" @click="openDialog">配置网卡</el-button>

        <!-- Dialog for NIC configuration -->
        <el-dialog title="网卡配置" v-model="dialogVisible" width="50%" @close="resetForm">
            <el-form :model="form" ref="configForm" label-width="100px" label-position="right">
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
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'Ifconfig',
    data() {
        return {
            dialogVisible: false,
            form: {
                dhcp: false, // 初始化为关闭状态
                ip: '',
                subnetMask: '',
                gateway: '',
                dns: ''
            }
        };
    },
    methods: {
        resetForm() {
            this.form = {
                dhcp: false,
                ip: '',
                subnetMask: '',
                gateway: '',
                dns: ''
            };
        }
    }
}
</script>

<style scoped>
/* Add any custom styles here */
</style>