import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { fetchNotifications } from '@/api/notification.api'

export const useNotificationStore = defineStore('notification', () => {
    const isOpen = ref(false)
    const isLoading = ref(false)

    const notifications = ref([])

    const unreadCount = computed(() => {
        return notifications.value.filter((item) => !item.read).length
    })

    function open() {
        isOpen.value = true
        loadNotifications()
    }

    function close() {
        isOpen.value = false
    }

    function toggle() {
        isOpen.value ? close() : open()
    }

    async function loadNotifications() {
        isLoading.value = true

        try {
            const data = await fetchNotifications()
            notifications.value = data
        } finally {
            isLoading.value = false
        }
    }

    function markAllAsRead() {
        notifications.value = notifications.value.map((item) => ({
            ...item,
            read: true,
        }))
    }

    return {
        isOpen,
        isLoading,
        notifications,
        unreadCount,
        open,
        close,
        toggle,
        loadNotifications,
        markAllAsRead,
    }
})