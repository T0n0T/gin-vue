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
            <!-- 添加搜索框 -->
            <div class="search-container">
                <el-input
                    v-model="searchQuery"
                    placeholder="搜索路由名称或连接ID"
                    prefix-icon="Search"
                    clearable
                    @input="handleSearch"
                    style="width: 100%; margin-bottom: 15px;"
                />
            </div>
            
            <el-table
                ref="routeTable"
                :data="filteredRoutes"
                border
                style="width: 100%"
                highlight-current-row
            >
                <el-table-column prop="name" label="路由名称" >
                    <template #default="{ row }">
                        <el-tag>{{ row.routerName }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="input.type" label="数据入口">
                    <template #default="{ row }">
                        <el-tag>{{ getInterfaceTypeName(row.input.type) }}</el-tag>
                        <el-tag>ID: {{ row.input.connectionId }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="output.type" label="数据出口">
                    <template #default="{ row }">
                        <el-tag>{{ getInterfaceTypeName(row.output.type) }}</el-tag>
                        <el-tag>ID: {{ row.output.connectionId }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="120">
                    <template #default="{ row }">
                        <el-button text type="primary" circle @click="editRoute(row)">编辑</el-button>
                        <el-button text type="danger" circle @click="deleteRoute(row)">删除</el-button>
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
                    <el-input v-model="RouteForm.routerName">
                        <template #append>
                            <el-button @click="generateRouteName">自动生成</el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="数据入口">
                    <el-row style="width: 100%">
                        <el-col :span="7">
                            <el-form-item prop="input.type">
                                <el-select v-model="RouteForm.input.type" placeholder="选择类型"
                                    @change="() => RouteForm.input.connectionId = ''" style="width: 100%">
                                    <el-option label="蓝牙" value="bluetooth" />
                                    <el-option label="网络连接" value="network" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="1">
                        </el-col>
                        <el-col :span="16">
                            <el-form-item prop="input.connectionId">
                                <el-select v-model="RouteForm.input.connectionId" filterable placeholder="请选择连接ID"
                                    :disabled="!RouteForm.input.type" style="width: 100%">
                                    <el-option v-for="conn in filteredInputConnections" :key="conn.id" :label="conn.id"
                                        :value="conn.id">
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
                <el-form-item label="数据出口">
                    <el-row style="width: 100%">
                        <el-col :span="7">
                            <el-form-item prop="output.type">
                                <el-select v-model="RouteForm.output.type" placeholder="选择类型"
                                    @change="() => RouteForm.output.connectionId = ''" style="width: 100%">
                                    <el-option label="蓝牙" value="bluetooth" />
                                    <el-option label="网络连接" value="network" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="1">
                        </el-col>
                        <el-col :span="16">
                            <el-form-item prop="output.connectionId">
                                <el-select v-model="RouteForm.output.connectionId" filterable placeholder="请选择连接ID"
                                    :disabled="!RouteForm.output.type" style="width: 100%">
                                    <el-option v-for="conn in filteredOutputConnections" :key="conn.id" :label="conn.id"
                                        :value="conn.id">
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
            </el-form>
            <template #footer>
                <el-button @click="routeDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="saveRoute">确定</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
/**
 * @file 路由管理页面组件
 * @description 提供路由的管理功能，包括添加、编辑、删除路由，以及拓扑图和表格两种视图的切换
 */

import { ref, computed, reactive } from 'vue'
import { Plus, Grid, View, Search } from '@element-plus/icons-vue'
import RouterTopology from '@/components/topology/routerMngr.vue'
import { ElMessage } from 'element-plus'
import { useConnectionStore } from '@/store/connect'
import { storeToRefs } from 'pinia'

/**
 * @type {import('vue').Ref<boolean>} 是否显示拓扑图视图
 */
const isTopologyView = ref(true)

/**
 * @type {import('vue').Ref<Array>} 路由列表
 */
const routes = ref([])

/**
 * @type {import('vue').Ref<boolean>} 路由对话框是否可见
 */
const routeDialogVisible = ref(false)

/**
 * @type {import('vue').Ref<Object|null>} 当前正在编辑的路由
 */
const editingRoute = ref(null)

/**
 * @type {import('vue').Ref<Object>} 路由表单数据
 */
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

/**
 * @type {Object} 表单验证规则
 */
const rules = {
    routerName: [
        { required: true, message: '请输入路由名称', trigger: 'blur' },
        { min: 1, message: '路由名称不能为空', trigger: 'blur' }
    ],
    'input.type': [
        { required: true, message: '请选择输入类型', trigger: 'change' }
    ],
    'output.type': [
        { required: true, message: '请选择输出类型', trigger: 'change' }
    ],
    'input.connectionId': [
        { required: true, message: '请选择输入连接', trigger: 'change' }
    ],
    'output.connectionId': [
        { required: true, message: '请选择输出连接', trigger: 'change' }
    ]
}

/**
 * @type {import('vue').ComputedRef<string>} 视图切换图标
 */
const viewIcon = computed(() => isTopologyView.value ? Grid : View)

/**
 * @description 切换视图模式
 */
const toggleView = () => {
    isTopologyView.value = !isTopologyView.value
}

/**
 * @description 获取接口类型的显示名称
 * @param {string} type 接口类型
 * @returns {string} 显示名称
 */
const getInterfaceTypeName = (type) => {
    const types = {
        bluetooth: '蓝牙',
        network: '网络连接'
    }
    return types[type] || type
}

/**
 * @description 打开路由对话框
 */
const openRouteDialog = () => {
    editingRoute.value = null
    RouteForm.value = {
        routerName: '',
        input: { type: '' },
        output: { type: '' }
    }
    routeDialogVisible.value = true
}

/**
 * @description 保存路由
 */
const saveRoute = () => {
    if (!RouteForm.value.routerName.trim()) {
        ElMessage.error('请输入路由名称')
        return
    }

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

/**
 * @description 编辑路由
 * @param {Object} route 要编辑的路由对象
 */
const editRoute = (route) => {
    editingRoute.value = route
    RouteForm.value = { ...route }
    routeDialogVisible.value = true
}

/**
 * @description 删除路由
 * @param {Object} route 要删除的路由对象
 */
const deleteRoute = (route) => {
    routes.value = routes.value.filter(r => r.id !== route.id)
    ElMessage.success('路由已删除')
}

/**
 * @description 处理路由选择事件
 * @param {Object} route 选中的路由对象
 */
const handleRouteSelect = (route) => {
    console.log('选中路由:', route)
}

// 获取连接store
const connectionStore = useConnectionStore()
const { bluetoothConnections, networkConnections } = storeToRefs(connectionStore)

/**
 * @type {import('vue').ComputedRef<Array>} 所有可用的连接列表
 */
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

/**
 * @type {import('vue').ComputedRef<Array>} 过滤后的输入连接列表
 */
const filteredInputConnections = computed(() => {
    if (!RouteForm.value.input.type) return []
    return RouteForm.value.input.type === 'bluetooth'
        ? bluetoothConnections.value
        : networkConnections.value
})

/**
 * @type {import('vue').ComputedRef<Array>} 过滤后的输出连接列表
 */
const filteredOutputConnections = computed(() => {
    if (!RouteForm.value.output.type) return []
    return RouteForm.value.output.type === 'bluetooth'
        ? bluetoothConnections.value
        : networkConnections.value
})

const generateRouteName = () => {
    const inputType = RouteForm.value.input.type
    const outputType = RouteForm.value.output.type
    const timestamp = new Date().getTime().toString().slice(-4)

    const typeNames = {
        bluetooth: 'BT',
        network: 'NET'
    }

    const inputPrefix = typeNames[inputType] || '未知'
    const outputPrefix = typeNames[outputType] || '未知'

    RouteForm.value.routerName = `${inputPrefix}-${outputPrefix}-${timestamp}`
}

const searchQuery = ref('')
const routeTable = ref(null)

// 过滤后的路由列表
const filteredRoutes = computed(() => {
    if (!searchQuery.value) return routes.value
    
    const query = searchQuery.value.toLowerCase()
    return routes.value.filter(route => 
        route.routerName.toLowerCase().includes(query) ||
        route.input.connectionId.toLowerCase().includes(query) ||
        route.output.connectionId.toLowerCase().includes(query)
    )
})

// 处理搜索
const handleSearch = () => {
    if (!searchQuery.value) return
    
    // 找到第一个匹配的行索引
    const index = filteredRoutes.value.findIndex(route => 
        route.routerName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        route.input.connectionId.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        route.output.connectionId.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
    
    if (index > -1) {
        // 设置当前行高亮
        routeTable.value?.setCurrentRow(filteredRoutes.value[index])
        
        // 确保该行在视图中可见
        const row = document.querySelector(`.el-table__row:nth-child(${index + 1})`)
        row?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
}
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

.search-container {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 15px;
}
</style>