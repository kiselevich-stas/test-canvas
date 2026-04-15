import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'

import { getScamAlerts } from '@/api/scamAlerts'
import type { ScamAlertItem } from '@/types/scamAlerts'

export const useScamAlertsStore = defineStore('scamAlerts', () => {
    const items = ref<ScamAlertItem[]>([])
    const isLoading = ref(false)

    const selectedStatus = ref<'all' | ScamAlertItem['severity']>('all')
    const selectedType = ref<'all' | ScamAlertItem['type']>('all')
    const onlyConfirmed = ref(false)

    const currentPage = ref(1)
    const pageSize = ref(7)

    const filteredItems = computed(() => {
        return items.value.filter(item => {
            const byStatus =
                selectedStatus.value === 'all' ||
                item.severity === selectedStatus.value

            const byType =
                selectedType.value === 'all' ||
                item.type === selectedType.value

            const byConfirmed =
                !onlyConfirmed.value || item.isCommunityConfirmed

            return byStatus && byType && byConfirmed
        })
    })

    const totalPages = computed(() => {
        return Math.max(1, Math.ceil(filteredItems.value.length / pageSize.value))
    })

    const paginatedItems = computed(() => {
        const start = (currentPage.value - 1) * pageSize.value
        const end = start + pageSize.value

        return filteredItems.value.slice(start, end)
    })

    const stats = computed(() => {
        return {
            critical: items.value.filter(item => item.severity === 'critical').length,
            high: items.value.filter(item => item.severity === 'high').length,
            scamNodes: new Set(items.value.map(item => item.node.name)).size,
            suspicious: items.value.filter(
                item => item.type === 'fraud' || item.type === 'scam'
            ).length,
        }
    })

    const fetch = async () => {
        isLoading.value = true

        try {
            items.value = await getScamAlerts()
        } finally {
            isLoading.value = false
        }
    }

    const setPage = (page: number) => {
        currentPage.value = page
    }

    watch([selectedStatus, selectedType, onlyConfirmed], () => {
        currentPage.value = 1
    })

    watch(totalPages, (value) => {
        if (currentPage.value > value) {
            currentPage.value = value
        }
    })

    return {
        items,
        isLoading,
        selectedStatus,
        selectedType,
        onlyConfirmed,
        currentPage,
        pageSize,
        filteredItems,
        paginatedItems,
        totalPages,
        stats,
        fetch,
        setPage,
    }
})