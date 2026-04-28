import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/authStore'

const routes = [
    {
        path: '/',
        name: 'network',
        component: () => import('@/pages/NetworkPage.vue'),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/connections',
        name: 'connections',
        component: () => import('@/pages/ConnectionsPage.vue'),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/scam-alerts',
        name: 'scam-alerts',
        component: () => import('@/pages/ScamAlertsPage.vue'),
        meta: {
            layout: 'dashboard',
            requiresAuth: true,
        },
    },
    {
        path: '/statistics',
        name: 'statistics',
        component: () => import('@/pages/StatisticsPage.vue'),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/settings',
        name: 'settings',
        component: () => import('@/pages/SettingsPage.vue'),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/pages/LoginPage.vue'),
        meta: {
            layout: 'login',
            public: true,
        },
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        redirect: '/',
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})

// router.beforeEach((to) => {
//     const authStore = useAuthStore()
//
//     const isAuthorized = authStore.isAuth.value
//     const requiresAuth = to.meta.requiresAuth
//
//     if (requiresAuth && !isAuthorized) {
//         return {
//             name: 'login',
//             query: {
//                 redirect: to.fullPath,
//             },
//         }
//     }
//
//     if (to.name === 'login' && isAuthorized) {
//         return {
//             name: 'network',
//         }
//     }
//
//     return true
// })