import { createRouter, createWebHashHistory } from 'vue-router';

const routesOptions = [
    { 
        path: '/', 
        name: 'main',
        component: () => import('../views/main.vue') 
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes: routesOptions,
});

export default router;