import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'network',
        component: () => import('@/pages/NetworkPage.vue'),
    },
    {
        path: '/connections',
        name: 'connections',
        component: () => import('@/pages/ConnectionsPage.vue'),
    },
    // {
    //     path: '/scam-alerts',
    //     name: 'scam-alerts',
    //     component: () => import('@/pages/ScamAlertsPage.vue'),
    // },
    {
        path: '/statistics',
        name: 'statistics',
        component: () => import('@/pages/StatisticsPage.vue'),
    },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})