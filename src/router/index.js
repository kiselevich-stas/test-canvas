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
    {
      path: '/scam-alerts',
      name: 'scam-alerts',
      component: () => import('@/pages/ScamAlertsPage.vue'),
      meta: {
        layout: 'dashboard',
      },
    },
    {
        path: '/statistics',
        name: 'statistics',
        component: () => import('@/pages/StatisticsPage.vue'),
    },
    {
        path: '/settings',
        name: 'settings',
        component: () => import('@/pages/SettingsPage.vue'),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/pages/LoginPage.vue'),
        meta: {
            layout: 'login',
        },
    },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})