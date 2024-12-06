<template>
    <div class="router-container">
        <!-- 视图切换图标 -->
        <div class="view-toggle-icon">
            <el-button circle type="primary" :icon="viewIcon" @click="toggleView" />
        </div>

        <!-- 拓扑视图 -->
        <div v-if="isTopologyView" class="topology-view">
            <RouterTopology :routes="routes" @selectRoute="handleRouteSelect" />
        </div>

        <!-- 表格视图 -->
        <div v-else class="table-view">
            <el-table :data="routes" border style="width: 100%">
                <el-table-column prop="name" label="路由名称" />
                <el-table-column prop="input.type" label="数据入口">
                    <template #default="{ row }">
                        <el-tag>{{ getInterfaceTypeName(row.input.type) }}</el-tag>
                        <div class="interface-detail">{{ row.input.detail }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="output.type" label="数据出口">
                    <template #default="{ row }">
                        <el-tag>{{ getInterfaceTypeName(row.output.type) }}</el-tag>
                        <div class="interface-detail">{{ row.output.detail }}</div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="150">
                    <template #default="{ row }">
                        <el-button text type="primary" @click="editRoute(row)">编辑</el-button>
                        <el-button text type="danger" @click="deleteRoute(row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 添加路由按钮 -->
        <div class="add-button">
            <el-button circle type="primary" :icon="Plus" @click="openRouteDialog" />
        </div>

        <!-- 添加/编辑路由对话框 -->
        <el-dialog v-model="routeDialogVisible" :title="editingRoute ? '编辑路由' : '添加路由'" width="500px">
            <el-form :model="RouteForm" :rules="rules" label-width="auto">
                <el-form-item label="路由名称" prop="routerName">
                    <el-input v-model="RouteForm.routerName" />
                </el-form-item>
                <el-form-item label="数据入口" style="width: 100%">
                    <el-row :gutter="10">
                        <el-col :span="24" style="margin-bottom: 10px">
                            <el-form-item prop="input.type">
                                <el-select 
                                    v-model="RouteForm.input.type" 
                                    placeholder="选择类型"
                                    @change="() => RouteForm.input.connectionId = ''"
                                    style="width: 100%"
                                >
                                    <el-option label="蓝牙" value="bluetooth" />
                                    <el-option label="网络连接" value="network" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item prop="input.connectionId">
                                <el-select 
                                    v-model="RouteForm.input.connectionId"
                                    filterable
                                    placeholder="请选择连接ID"
                                    :disabled="!RouteForm.input.type"
                                    style="width: 100%"
                                >
                                    <el-option
                                        v-for="conn in filteredConnections"
                                        :key="conn.id"
                                        :label="conn.id"
                                        :value="conn.id"
                                    >
                                        <span>ID: {{ conn.id }}</span>
                                        <span style="float: right; color: #8492a6; font-size: 13px">
                                            {{ conn.type === 'bluetooth' ? conn.name : conn.address }}
                                        </span>
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="数据出口" prop="output.type">
                    <el-select v-model="RouteForm.output.type" placeholder="请选择数据出口类型">
                        <el-option label="蓝牙" value="bluetooth" />
                        <el-option label="网络连接" value="network" />
                    </el-select>
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="routeDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="saveRoute">确定</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { Plus, Grid, View } from '@element-plus/icons-vue'
import RouterTopology from '@/components/topology/routerMngr.vue'
import { ElMessage } from 'element-plus'
import { useConnectionStore } from '@/store/connect'
import { storeToRefs } from 'pinia'

const isTopologyView = ref(true)
const routes = ref([])
const routeDialogVisible = ref(false)
const editingRoute = ref(null)

const RouteForm = ref({
    routerName: '',
    input: { 
        type: '',
        connectionId: '' 
    },
    output: { 
        type: '',
        connectionId: '' 
    }
})

const rules = {
    routerName: [{ required: true, message: '请输入路由名称', trigger: 'blur' }],
    'input.type': [{ required: true, message: '请选择数据入口类型', trigger: 'change' }],
    'output.type': [{ required: true, message: '请选择数据出口类型', trigger: 'change' }]
}

const viewIcon = computed(() => isTopologyView.value ? Grid : View)

const toggleView = () => {
    isTopologyView.value = !isTopologyView.value
}

const getInterfaceTypeName = (type) => {
    const types = {
        bluetooth: '蓝牙',
        network: '网络连接'
    }
    return types[type] || type
}

const openRouteDialog = () => {
    editingRoute.value = null
    RouteForm.value = {
        routerName: '',
        input: { type: '' },
        output: { type: '' }
    }
    routeDialogVisible.value = true
}

const saveRoute = () => {
    console.log("saveRoute")
    if (editingRoute.value) {
        const index = routes.value.findIndex(r => r.id === editingRoute.value.id)
        if (index !== -1) {
            routes.value[index] = { ...RouteForm.value, id: editingRoute.value.id }
        }
    } else {
        routes.value.push({
            ...RouteForm.value,
            id: Date.now().toString()
        })
    }
    routeDialogVisible.value = false
    ElMessage.success(editingRoute.value ? '路由已更新' : '路由已添加')
}

const editRoute = (route) => {
    editingRoute.value = route
    RouteForm.value = { ...route }
    routeDialogVisible.value = true
}

const deleteRoute = (route) => {
    routes.value = routes.value.filter(r => r.id !== route.id)
    ElMessage.success('路由已删除')
}

const handleRouteSelect = (route) => {
    console.log('选中路由:', route)
}

// 获取连接store
const connectionStore = useConnectionStore()
const { bluetoothConnections, networkConnections } = storeToRefs(connectionStore)

// 计算所有可用连接
const availableConnections = computed(() => {
    return [
        ...bluetoothConnections.value.map(conn => ({
            value: `bluetooth:${conn.id}`,
            label: `蓝牙: ${conn.name}`,
            type: 'bluetooth',
            detail: conn
        })),
        ...networkConnections.value.map(conn => ({
            value: `network:${conn.id}`,
            label: `网络: ${conn.address}`,
            type: 'network',
            detail: conn
        }))
    ]
})

// 根据选择的类型过滤连接
const filteredConnections = computed(() => {
    if (!RouteForm.value.input.type) return []
    
    return RouteForm.value.input.type === 'bluetooth' 
        ? bluetoothConnections.value
        : networkConnections.value
})
</script>

<style scoped>
.router-container {
    height: calc(100vh - 100px);
    padding: 10px;
    border-radius: 8px;
}

.view-toggle-icon {
    position: fixed;
    right: 140px;
    bottom: 100px;
    z-index: 100;
    transform: scale(1.5);
}

.topology-view,
.table-view {
    height: 100%;
    background: #f5f7fa;
    border-radius: 8px;
    padding: 20px;
}

.add-button {
    position: fixed;
    right: 80px;
    bottom: 100px;
    z-index: 100;
    /* 增加按钮的大小 */
    transform: scale(1.5);
}

.interface-detail {
    font-size: 12px;
    color: #666;
    margin-top: 4px;
}
</style>