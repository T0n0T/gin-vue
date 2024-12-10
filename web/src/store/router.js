import { defineStore } from 'pinia'
import { ref } from 'vue'
import { RouterManager } from '../core/routerMngr'

export const useRouterStore = defineStore('router', () => {
    // 存储路由列表
    const routes = ref([])
    // 存储RouterManager实例
    const routerManager = ref(null)

    // 初始化RouterManager
    const initRouterManager = () => {
        if (!routerManager.value) {
            routerManager.value = new RouterManager()
        }
        return routerManager.value
    }

    // 获取RouterManager实例
    const getRouterManager = () => {
        return routerManager.value || initRouterManager()
    }

    // 添加路由
    const addRoute = (route) => {
        routes.value.push({
            ...route,
            id: Date.now().toString()
        })
    }

    // 更新路由
    const updateRoute = (route) => {
        const index = routes.value.findIndex(r => r.id === route.id)
        if (index !== -1) {
            routes.value[index] = { ...route }
        }
    }

    // 删除路由
    const deleteRoute = (routeId) => {
        routes.value = routes.value.filter(r => r.id !== routeId)
    }

    // 清空所有路由
    const clearRoutes = () => {
        routes.value = []
    }

    return {
        routes,
        routerManager,
        getRouterManager,
        initRouterManager,
        addRoute,
        updateRoute,
        deleteRoute,
        clearRoutes
    }
}, {
    persist: {
        paths: ['routes'] // 只持久化routes数据
    }
})