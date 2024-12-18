import { createRouter, createWebHashHistory } from 'vue-router';

const routesOptions = [
    {
        path: '/',
        name: 'main',
        component: () => import('../views/main.vue'),
        children: [
            {
                path: 'router',
                component: () => import('@/views/routerMngr.vue')
            },
            {
                path: 'stats',
                component: () => import('@/views/stats.vue')
            },
            {
                path: 'ethernet',
                component: () => import('@/views/ethernet.vue')
            },
            {
                path: 'wireless/bluetooth',
                component: () => import('@/views/wireless/bluetooth.vue')
            },
            {
                path: 'wireless/wlan',
                component: () => import('@/views/wireless/wlan.vue')
            },
            {
                path: 'wireless/lorawan',
                component: () => import('@/views/wireless/lorawan.vue')
            }
        ]
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes: routesOptions,
});

export default router;