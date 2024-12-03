<template>
    <div class="wlan-container">
        <h2>WLAN配置</h2>
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>WLAN设置</span>
                    <el-switch
                        v-model="wlanEnabled"
                        active-text="开启"
                        inactive-text="关闭"
                    />
                </div>
            </template>
            <div class="card-content">
                <el-form :model="form" label-width="120px">
                    <el-form-item label="网络名称(SSID)">
                        <el-input v-model="form.ssid" placeholder="请输入网络名称"/>
                    </el-form-item>
                    <el-form-item label="安全性">
                        <el-select v-model="form.security" placeholder="请选择安全模式">
                            <el-option label="WPA2-PSK" value="wpa2-psk" />
                            <el-option label="WPA3-PSK" value="wpa3-psk" />
                            <el-option label="开放" value="none" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="密码" v-if="form.security !== 'none'">
                        <el-input
                            v-model="form.password"
                            type="password"
                            placeholder="请输入网络密码"
                            show-password
                        />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="saveSettings">保存设置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'

const wlanEnabled = ref(false)
const form = reactive({
    ssid: '',
    security: 'wpa2-psk',
    password: ''
})

const saveSettings = () => {
    // 实现保存设置的逻辑
    console.log('保存设置:', {
        enabled: wlanEnabled.value,
        ...form
    })
}
</script>

<style scoped>
.wlan-container {
    padding: 20px;
}

.box-card {
    margin-top: 20px;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.card-content {
    padding: 20px;
}
</style> 