import { createRouter, createWebHashHistory } from 'vue-router';
import Bluetooth from '@/views/bluetooth.vue'

const routesOptions = [
    {
        path: '/',
        name: 'main',
        component: () => import('../views/main.vue'),
        children: [
            {
                path: 'wireless/bluetooth',
                component: () => import('@/views/wireless/bluetooth.vue')
            },
            {
                path: 'wireless/wlan',
                component: () => import('@/views/wireless/wlan.vue')
            },
            // {
            //     path: 'wireless/lorawan',
            //     component: () => import('@/views/wireless/lorawan.vue')
            // }
            // 其他路由配置...
        ]
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes: routesOptions,
});

export default router;