import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStore = defineStore('store', () => {
    // 存储面包屑路径
    const breadcrumbs = ref(['首页'])
    
    // 更新面包屑的方法
    const updateBreadcrumbs = (items) => {
        breadcrumbs.value = ['首页', ...items]
    }

    return { 
        breadcrumbs,
        updateBreadcrumbs
    }
})