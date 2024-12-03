import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStore = defineStore('store', () => {
    // 存储面包屑路径
    const breadcrumbs = ref([''])
    
    // 更新面包屑的方法
    const updateBreadcrumbs = (items) => {
        console.log(items)
        breadcrumbs.value = ['', ...items]
    }

    return { 
        breadcrumbs,
        updateBreadcrumbs
    }
})