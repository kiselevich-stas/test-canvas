import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export type ConnectionTab = 'all' | 'pending' | 'active'
export type ConnectionStatus = 'confirmed' | 'waiting'
export type ConnectionChannel = 'twix' | 'direct'

export type ConnectionParty = {
    name: string
    shortName: string
    roleLabel: string
    roleKey: 'hub' | 'processor' | 'merchant'
}

export type ConnectionItem = {
    id: number
    left: ConnectionParty
    right: ConnectionParty
    status: ConnectionStatus
    channel: ConnectionChannel
    amountLabel: string
    dateLabel: string
}

function createMockConnections(): ConnectionItem[] {
    return [
        {
            id: 1,
            left: { name: 'Twix', shortName: 'TW', roleLabel: 'Хаб', roleKey: 'hub' },
            right: { name: 'ThetaProcess', shortName: 'TP', roleLabel: 'Процессинг', roleKey: 'processor' },
            status: 'confirmed',
            channel: 'twix',
            amountLabel: '$483K/мес',
            dateLabel: '05.07.2026',
        },
        {
            id: 2,
            left: { name: 'Twix', shortName: 'TW', roleLabel: 'Хаб', roleKey: 'hub' },
            right: { name: 'AlphaRoute', shortName: 'AR', roleLabel: 'Процессинг', roleKey: 'processor' },
            status: 'confirmed',
            channel: 'twix',
            amountLabel: '$483K/мес',
            dateLabel: '05.07.2026',
        },
        {
            id: 3,
            left: { name: 'AlphaRoute', shortName: 'AR', roleLabel: 'Процессинг', roleKey: 'processor' },
            right: { name: 'BitStore', shortName: 'MR', roleLabel: 'Мерчант', roleKey: 'merchant' },
            status: 'confirmed',
            channel: 'direct',
            amountLabel: '$483K/мес',
            dateLabel: '05.07.2026',
        },
        {
            id: 4,
            left: { name: 'BitStore', shortName: 'MR', roleLabel: 'Мерчант', roleKey: 'merchant' },
            right: { name: 'Twix', shortName: 'TW', roleLabel: 'Хаб', roleKey: 'hub' },
            status: 'confirmed',
            channel: 'direct',
            amountLabel: '$483K/мес',
            dateLabel: '05.07.2026',
        },
        {
            id: 5,
            left: { name: 'Twix', shortName: 'TW', roleLabel: 'Хаб', roleKey: 'hub' },
            right: { name: 'ThetaProcess', shortName: 'TP', roleLabel: 'Процессинг', roleKey: 'processor' },
            status: 'waiting',
            channel: 'twix',
            amountLabel: '$483K/мес',
            dateLabel: '05.07.2026',
        },
        {
            id: 6,
            left: { name: 'Twix', shortName: 'TW', roleLabel: 'Хаб', roleKey: 'hub' },
            right: { name: 'AlphaRoute', shortName: 'AR', roleLabel: 'Процессинг', roleKey: 'processor' },
            status: 'confirmed',
            channel: 'twix',
            amountLabel: '$483K/мес',
            dateLabel: '05.07.2026',
        },
        {
            id: 7,
            left: { name: 'AlphaRoute', shortName: 'AR', roleLabel: 'Процессинг', roleKey: 'processor' },
            right: { name: 'BitStore', shortName: 'MR', roleLabel: 'Мерчант', roleKey: 'merchant' },
            status: 'confirmed',
            channel: 'direct',
            amountLabel: '$483K/мес',
            dateLabel: '05.07.2026',
        },
        {
            id: 8,
            left: { name: 'BitStore', shortName: 'MR', roleLabel: 'Мерчант', roleKey: 'merchant' },
            right: { name: 'Twix', shortName: 'TW', roleLabel: 'Хаб', roleKey: 'hub' },
            status: 'confirmed',
            channel: 'direct',
            amountLabel: '$483K/мес',
            dateLabel: '05.07.2026',
        },
        {
            id: 9,
            left: { name: 'Twix', shortName: 'TW', roleLabel: 'Хаб', roleKey: 'hub' },
            right: { name: 'ThetaProcess', shortName: 'TP', roleLabel: 'Процессинг', roleKey: 'processor' },
            status: 'waiting',
            channel: 'twix',
            amountLabel: '$483K/мес',
            dateLabel: '05.07.2026',
        },
        {
            id: 10,
            left: { name: 'Twix', shortName: 'TW', roleLabel: 'Хаб', roleKey: 'hub' },
            right: { name: 'AlphaRoute', shortName: 'AR', roleLabel: 'Процессинг', roleKey: 'processor' },
            status: 'confirmed',
            channel: 'twix',
            amountLabel: '$483K/мес',
            dateLabel: '05.07.2026',
        },
        {
            id: 11,
            left: { name: 'AlphaRoute', shortName: 'AR', roleLabel: 'Процессинг', roleKey: 'processor' },
            right: { name: 'BitStore', shortName: 'MR', roleLabel: 'Мерчант', roleKey: 'merchant' },
            status: 'confirmed',
            channel: 'direct',
            amountLabel: '$483K/мес',
            dateLabel: '05.07.2026',
        },
    ]
}

export const useConnectionsStore = defineStore('connections', () => {
    const activeTab = ref<ConnectionTab>('all')
    const items = ref<ConnectionItem[]>(createMockConnections())

    const filteredItems = computed(() => {
        if (activeTab.value === 'all') return items.value
        if (activeTab.value === 'pending') {
            return items.value.filter((item) => item.status === 'waiting')
        }

        return items.value.filter((item) => item.status === 'confirmed')
    })

    const counts = computed(() => {
        const all = items.value.length
        const pending = items.value.filter((item) => item.status === 'waiting').length
        const active = items.value.filter((item) => item.status === 'confirmed').length

        return { all, pending, active }
    })

    const pendingCount = computed(() => counts.value.pending)

    function setActiveTab(tab: ConnectionTab) {
        activeTab.value = tab
    }

    return {
        activeTab,
        items,
        filteredItems,
        counts,
        pendingCount,
        setActiveTab,
    }
})