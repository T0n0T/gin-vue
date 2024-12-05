import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBreadCrumbsStore = defineStore('breadcrumbs', () => {
    // 存储面包屑路径
    const breadcrumbs = ref([''])
    
    // 更新面包屑的方法
    const updateBreadcrumbs = (items) => {
        breadcrumbs.value = ['', ...items]
    }

    return { 
        breadcrumbs,
        updateBreadcrumbs
    }
})

