<template>
    <div class="router-container">
        <!-- 视图切换按钮 -->
        <div class="view-toggle-icon">
            <el-button circle type="primary" :icon="viewIcon" @click="toggleView" />
        </div>

        <!-- 添加路由按钮 -->
        <div class="add-button">
            <el-button circle type="primary" :icon="Plus" @click="openRouteDialog" />
        </div>

        <!-- 拓扑视图 -->
        <div v-if="isTopologyView" class="topology-view">
            <RouterTopology :routes="routes" @selectRoute="handleRouteSelect" />
        </div>

        <!-- 表格视图 -->
        <div v-else class="table-view">
            <!-- 添加搜索框 -->
            <div class="search-container">
                <el-input v-model="searchQuery" placeholder="搜索路由名称或连接ID" prefix-icon="Search" clearable
                    @input="handleSearch" style="width: 100%; margin-bottom: 15px;" />
            </div>

            <el-table ref="routeTable" :data="filteredRoutes" border style="width: 100%" highlight-current-row>
                <el-table-column prop="name" label="路由名称">
                    <template #default="{ row }">
                        <el-tag>{{ row.name }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="upEntry" label="数据入口">
                    <template #default="{ row }">
                        <el-tag>{{ row.upEntry.devType }}</el-tag>
                        <el-tag>ID: {{ row.upEntry.conn.connID }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="downEntry" label="数据出口">
                    <template #default="{ row }">
                        <el-tag>{{ row.downEntry.devType }}</el-tag>
                        <el-tag>ID: {{ row.downEntry.conn.connID }}</el-tag>
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

        <!-- 添加/编辑路由对话框 -->
        <el-dialog v-model="routeDialogVisible" draggable :title="editingRoute ? '编辑路由' : '添加路由'" width="500px">
            <el-form ref="routeFormRef" :model="RouteForm" :rules="rules" label-width="auto">
                <el-form-item label="路由名称" prop="name">
                    <el-input v-model="RouteForm.name">
                        <template #append>
                            <el-button @click="generateRouteName">自动生成</el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="数据入口">
                    <el-row style="width: 100%">
                        <el-col :span="7">
                            <el-form-item prop="upEntry.devType">
                                <el-select v-model="RouteForm.upEntry.devType" placeholder="选择类型" style="width: 100%">
                                    <el-option v-for="type in deviceTypes" :key="type" :label="type" :value="type" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="1">
                        </el-col>
                        <el-col :span="16">
                            <el-form-item prop="upEntry.conn">
                                <el-select v-model="RouteForm.upEntry.conn" value-key="connStr" filterable
                                    placeholder="请选择连接ID" :disabled="!RouteForm.upEntry.devType" style="width: 100%">
                                    <el-option v-for="conn in InputConnections" :value="conn" :label="conn.connStr">
                                        <span>{{ conn.connStr }}</span>
                                        <span style="float: right; color: #8492a6; font-size: 13px">
                                            {{ conn.devStr }}
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
                            <el-form-item prop="downEntry.devType">
                                <el-select v-model="RouteForm.downEntry.devType" placeholder="选择类型" style="width: 100%">
                                    <el-option v-for="type in deviceTypes" :key="type" :label="type" :value="type" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="1">
                        </el-col>
                        <el-col :span="16">
                            <el-form-item prop="downEntry.conn">
                                <el-select v-model="RouteForm.downEntry.conn" value-key="connStr" filterable
                                    placeholder="请选择连接ID" :disabled="!RouteForm.downEntry.devType" style="width: 100%">
                                    <el-option v-for="conn in OutputConnections" :value="conn" :label="conn.connStr">
                                        <span>{{ conn.connStr }}</span>
                                        <span style="float: right; color: #8492a6; font-size: 13px">
                                            {{ conn.devStr }}
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

import { ref, computed, onMounted } from 'vue'
import { Plus, Grid, View } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { storeToRefs } from 'pinia'
import { useRouterStore } from '../store/router'
import { deviceTypes, useDeviceStore } from '../store/device'
import RouterTopology from '../components/routerMngr/TopologyGraph.vue'
import { RouterManager } from '../core/routerMngr'

/**
 * @type {import('vue').Ref<boolean>} 是否显示拓扑图视图
 */
const isTopologyView = ref(false)

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
    name: '',
    upEntry: {
        devType: '',
        conn: {
            devID: 0,
            connID: 0
        }
    },
    downEntry: {
        devType: '',
        conn: {
            devID: 0,
            connID: 0
        }
    }
})

const routeFormRef = ref(null)

/**
 * @type {Object} 表单验证规则
 */
const rules = {
    'name': [
        { required: true, message: '请输入路由名称', trigger: 'blur' },
        { min: 1, message: '路由名称不能为空', trigger: 'blur' }
    ],
    'upEntry.devType': [
        { required: true, message: '请选择输入类型', trigger: 'change' }
    ],
    'upEntry.conn': [
        {
            required: true, message: '请选择输入连接', trigger: 'change',
            validator: (rule, value, callback) => {
                if (!value || value.connID === 0) {
                    callback(new Error('请选择有效的输入连接'))
                } else {
                    callback()
                }
            }
        }
    ],
    'downEntry.devType': [
        { required: true, message: '请选择输出类型', trigger: 'change' }
    ],
    'downEntry.conn': [
        {
            required: true, message: '请选择输出连接', trigger: 'change',
            validator: (rule, value, callback) => {
                if (!value || value.connID === 0) {
                    callback(new Error('请选择有效的输出连接'))
                } else {
                    callback()
                }
            }
        }
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
        name: '',
        upEntry: {
            devType: '',
            conn: {
                devID: 0,
                connID: 0
            }
        },
        downEntry: {
            devType: '',
            conn: {
                devID: 0,
                connID: 0
            }
        }
    }
    routeDialogVisible.value = true
}

/**
 * @description 保存路由
 */
const saveRoute = () => {
    if (!routeFormRef.value) return

    routeFormRef.value.validate(async (valid) => {
        if (!valid) {
            ElMessage.error('请正确填写表单')
            return
        }
        console.log('RouteForm:', RouteForm.value)
        try {
            if (editingRoute.value) {
                await routerManager.removeRouter(editingRoute.value)
            }
            await routerManager.addRouter(RouteForm.value)
            routerStore.addRoute(RouteForm.value)
            routeDialogVisible.value = false
            ElMessage.success(editingRoute.value ? '路由已更新' : '路由已添加')
        } catch (error) {
            console.error('保存路由失败:', error)
            ElMessage.error('保存路由失败，请稍后重试')
        }
    })
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
const deleteRoute = async (route) => {
    try {
        await routerManager.removeRouter(route.id)
        routerStore.deleteRoute(route)
        ElMessage.success('路由已删除')
    } catch (error) {
        console.error('删除路由失败:', error)
        ElMessage.error('删除路由失败，请稍后重试')
    }
}

/**
 * @description 处理路由选择事件
 * @param {Object} route 选中的路由对象
 */
const handleRouteSelect = (route) => {
    console.log('选中路由:', route)
}

/**
 * @type {import('vue').ComputedRef<Array>} 过滤后的输入连接列表
 */
const getDeviceConnections = (deviceType) => {
    const deviceStore = useDeviceStore(deviceType)()
    const connections = []

    deviceStore.devices.forEach(device => {
        device.connectMap.forEach(connect => {
            connections.push({
                devID: device.devID,
                connID: connect.connID,
                devStr: device.deviceStr,
                connStr: connect.connStr
            })
        })
    })

    return connections
}

/**
 * @type {import('vue').ComputedRef<Array>} 过滤后的输入连接列表
 */
const InputConnections = computed(() => {
    if (!RouteForm.value.upEntry.devType) return []
    return getDeviceConnections(RouteForm.value.upEntry.devType)
})

/**
 * @type {import('vue').ComputedRef<Array>} 过滤后的输出连接列表
 */
const OutputConnections = computed(() => {
    if (!RouteForm.value.downEntry.devType) return []
    return getDeviceConnections(RouteForm.value.downEntry.devType)
})

const generateRouteName = () => {
    const timestamp = new Date().getTime().toString().slice(-6)
    RouteForm.value.name = `${timestamp}`
}

const searchQuery = ref('')
const routeTable = ref(null)

// 过滤后的路由列表
const filteredRoutes = computed(() => {
    if (!searchQuery.value) return routes.value

    const query = searchQuery.value.toLowerCase()
    return routes.value.filter(route =>
        route.name.toLowerCase().includes(query) ||
        route.upEntry.devType.toLowerCase().includes(query) ||
        route.downEntry.devType.toLowerCase().includes(query) ||
        route.upEntry.conn.devID.toLowerCase().includes(query) ||
        route.downEntry.conn.devID.toLowerCase().includes(query) ||
        route.upEntry.conn.connID.toString().toLowerCase().includes(query) ||
        route.downEntry.conn.connID.toString().toLowerCase().includes(query)
    )
})

// 处理搜索
const handleSearch = () => {
    if (!searchQuery.value) return

    // 找到第一个匹配的行索引
    const index = filteredRoutes.value.findIndex(route =>
        route.name.toLowerCase().includes(query) ||
        route.upEntry.devType.toLowerCase().includes(query) ||
        route.downEntry.devType.toLowerCase().includes(query) ||
        route.upEntry.conn.devID.toLowerCase().includes(query) ||
        route.downEntry.conn.devID.toLowerCase().includes(query) ||
        route.upEntry.conn.connID.toString().toLowerCase().includes(query) ||
        route.downEntry.conn.connID.toString().toLowerCase().includes(query)
    )

    if (index > -1) {
        // 设置当前行高亮
        routeTable.value?.setCurrentRow(filteredRoutes.value[index])

        // 确保该行在视图中可见
        const row = document.querySelector(`.el-table__row:nth-child(${index + 1})`)
        row?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
}

const routerStore = useRouterStore()
const { routes } = storeToRefs(routerStore)

// 创建全局RouterManager实例
const routerManager = new RouterManager()

onMounted(async () => {
    try {
        // 初始化RouterManager
        routerManager.init(routes.value)
        console.log('RouterManager初始化成功')
    } catch (error) {
        console.error('RouterManager初始化失败:', error)
        ElMessage.error('路由管理器初始化失败，请检查网络连接')
    }
    console.log('路由数据已加载:', routes.value)
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

.search-container {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 15px;
}
</style>
