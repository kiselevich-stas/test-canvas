import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { fetchConnections } from '@/api/connections.api'
import type {
    ConnectionItem,
    ConnectionTab,
    ConnectionParty,
} from '@/types/connections'

const PAGE_SIZE = 8
const REQUEST_SEARCH_DEBOUNCE_MS = 400

export type ConnectionParticipant = {
    id: string
    name: string
    shortName: string
    roleLabel: string
    roleKey: ConnectionParty['roleKey']
}

export const useConnectionsStore = defineStore('connections', () => {
    const activeTab = ref<ConnectionTab>('all')
    const items = ref<ConnectionItem[]>([])
    const isLoading = ref(false)
    const currentPage = ref(1)

    const isRequestModalOpen = ref(false)
    const isSubmittingRequest = ref(false)

    const requestSearchQuery = ref('')
    const requestSearchResults = ref<ConnectionParticipant[]>([])
    const isRequestSearchLoading = ref(false)

    let requestSearchTimer: ReturnType<typeof setTimeout> | null = null

    const filteredItems = computed(() => {
        if (activeTab.value === 'all') {
            return items.value
        }

        if (activeTab.value === 'pending') {
            return items.value.filter((item) => item.status === 'waiting')
        }

        return items.value.filter((item) => item.status === 'confirmed')
    })

    const counts = computed(() => {
        const all = items.value.length
        const pending = items.value.filter((item) => item.status === 'waiting').length
        const active = items.value.filter((item) => item.status === 'confirmed').length

        return {
            all,
            pending,
            active,
        }
    })

    const pendingCount = computed(() => counts.value.pending)

    const totalPages = computed(() => {
        return Math.max(1, Math.ceil(filteredItems.value.length / PAGE_SIZE))
    })

    const paginatedItems = computed(() => {
        const startIndex = (currentPage.value - 1) * PAGE_SIZE
        const endIndex = startIndex + PAGE_SIZE

        return filteredItems.value.slice(startIndex, endIndex)
    })

    const skeletonRows = computed(() => {
        return Array.from({ length: PAGE_SIZE }, (_, index) => ({
            id: `skeleton-${index}`,
        }))
    })

    function setActiveTab(tab: ConnectionTab): void {
        activeTab.value = tab
        currentPage.value = 1
    }

    function setPage(page: number): void {
        if (page < 1 || page > totalPages.value) {
            return
        }

        currentPage.value = page
    }

    async function loadConnections(): Promise<void> {
        isLoading.value = true

        try {
            const response = await fetchConnections()
            items.value = response.items
        } finally {
            isLoading.value = false
        }
    }

    function buildUniqueParticipants(): ConnectionParticipant[] {
        const uniqueMap = new Map<string, ConnectionParticipant>()

        items.value.forEach((item) => {
            const participants: ConnectionParticipant[] = [
                {
                    id: item.left.name,
                    name: item.left.name,
                    shortName: item.left.shortName,
                    roleLabel: item.left.roleLabel,
                    roleKey: item.left.roleKey,
                },
                {
                    id: item.right.name,
                    name: item.right.name,
                    shortName: item.right.shortName,
                    roleLabel: item.right.roleLabel,
                    roleKey: item.right.roleKey,
                },
            ]

            participants.forEach((participant) => {
                if (!uniqueMap.has(participant.id)) {
                    uniqueMap.set(participant.id, participant)
                }
            })
        })

        return Array.from(uniqueMap.values())
    }

    function setRequestSearchQuery(query: string): void {
        requestSearchQuery.value = query
    }

    async function performRequestSearch(query: string): Promise<void> {
        if (!query.trim()) {
            requestSearchResults.value = []
            isRequestSearchLoading.value = false
            return
        }

        await new Promise((resolve) => setTimeout(resolve, 350))

        const normalizedQuery = query.trim().toLowerCase()

        requestSearchResults.value = buildUniqueParticipants().filter((participant) => {
            return [participant.name, participant.roleLabel, participant.shortName]
                .filter(Boolean)
                .some((value) => value.toLowerCase().includes(normalizedQuery))
        })

        isRequestSearchLoading.value = false
    }

    function searchRequestParticipants(query: string): void {
        requestSearchQuery.value = query

        if (requestSearchTimer) {
            clearTimeout(requestSearchTimer)
            requestSearchTimer = null
        }

        if (!query.trim()) {
            requestSearchResults.value = []
            isRequestSearchLoading.value = false
            return
        }

        isRequestSearchLoading.value = true

        requestSearchTimer = setTimeout(() => {
            void performRequestSearch(query)
        }, REQUEST_SEARCH_DEBOUNCE_MS)
    }

    function resetRequestSearch(): void {
        requestSearchQuery.value = ''
        requestSearchResults.value = []
        isRequestSearchLoading.value = false

        if (requestSearchTimer) {
            clearTimeout(requestSearchTimer)
            requestSearchTimer = null
        }
    }

    function openRequestModal(): void {
        isRequestModalOpen.value = true
    }

    function closeRequestModal(): void {
        isRequestModalOpen.value = false
        resetRequestSearch()
    }

    async function submitConnectionRequest(selectedIds: Array<string | number>): Promise<void> {
        if (!selectedIds.length) {
            return
        }

        isSubmittingRequest.value = true

        try {
            await new Promise((resolve) => setTimeout(resolve, 700))
        } finally {
            isSubmittingRequest.value = false
        }
    }

    watch(filteredItems, () => {
        if (currentPage.value > totalPages.value) {
            currentPage.value = totalPages.value
        }
    })

    return {
        activeTab,
        items,
        isLoading,
        currentPage,
        filteredItems,
        paginatedItems,
        counts,
        pendingCount,
        totalPages,
        skeletonRows,

        isRequestModalOpen,
        isSubmittingRequest,
        requestSearchQuery,
        requestSearchResults,
        isRequestSearchLoading,

        setActiveTab,
        setPage,
        loadConnections,

        openRequestModal,
        closeRequestModal,
        submitConnectionRequest,

        setRequestSearchQuery,
        searchRequestParticipants,
        resetRequestSearch,
    }
})