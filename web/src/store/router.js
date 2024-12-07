import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRouterStore = defineStore('router', () => {
    // 存储路由列表
    const routes = ref([])

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
        addRoute,
        updateRoute,
        deleteRoute,
        clearRoutes
    }
}, {
    persist: true
})