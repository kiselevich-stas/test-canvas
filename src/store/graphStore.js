import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { sampleGraph } from '../data/sampleGraph'
import { filterGraph } from '../utils/mapToElements'

const ALL_TYPES = ['hub', 'processor', 'merchant']
const ALL_STATUSES = ['active', 'warning', 'danger', 'unknown']
const ALL_EDGE_TYPES = ['hub', 'direct', 'dashed']

const DEFAULT_FILTERS = Object.freeze({
  search: '',
  types: [...ALL_TYPES],
  statuses: [...ALL_STATUSES],
  edgeTypes: [...ALL_EDGE_TYPES],
  hideIsolated: false,
})

function createParticipantId() {
  return `node-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

/**
 * Создает ноду в едином формате графа.
 * Важно: структура должна совпадать с той, которую ожидают sampleGraph / filterGraph / canvas.
 */
function createParticipantNode(payload) {
  return {
    id: createParticipantId(),
    label: payload.name,
    name: payload.name,
    type: payload.type ?? 'merchant',
    status: payload.status ?? 'active',

    /**
     * Если в sampleGraph используется x / y — оставляем так.
     * Если у тебя canvas ожидает position: { x, y },
     * нужно заменить именно здесь, а не в store.
     */
    x: payload.x ?? 520,
    y: payload.y ?? 320,

    meta: {
      login: payload.login ?? '',
      password: payload.password ?? '',
      telegram: payload.telegram ?? '',
      photo: payload.photo ?? '',
      relations: [],
      alerts: [],
    },
  }
}

export const useGraphStore = defineStore('graph', () => {
  const graph = ref(sampleGraph)
  const filters = ref(structuredClone(DEFAULT_FILTERS))
  const selectedNodeId = ref('')
  const activeTab = ref('info')
  const sidebarCollapsed = ref(false)
  const isAddParticipantModalOpen = ref(false)

  const filteredGraph = computed(() => {
    return filterGraph(graph.value, filters.value)
  })

  const selectedNode = computed(() => {
    return graph.value.nodes.find((node) => node.id === selectedNodeId.value) || null
  })

  const stats = computed(() => {
    const nodes = filteredGraph.value.nodes
    const edges = filteredGraph.value.edges

    return {
      nodes: nodes.length,
      edges: edges.length,
      active: nodes.filter((node) => node.status === 'active').length,
      warning: nodes.filter((node) => node.status === 'warning').length,
      danger: nodes.filter((node) => node.status === 'danger').length,
    }
  })

  const tabs = computed(() => {
    const relationsCount = selectedNode.value?.meta?.relations?.length || 0
    const alertsCount = selectedNode.value?.meta?.alerts?.length || 0

    return [
      { id: 'info', label: 'Инфо', count: null },
      { id: 'connections', label: 'Связи', count: relationsCount || null },
      { id: 'alerts', label: 'Алерты', count: alertsCount || null },
    ]
  })

  const selectedParticipantType = computed(() => {
    if (filters.value.types.length === ALL_TYPES.length) {
      return null
    }

    if (filters.value.types.length === 1) {
      return filters.value.types[0]
    }

    return null
  })

  const selectedStatus = computed(() => {
    if (filters.value.statuses.length === ALL_STATUSES.length) {
      return null
    }

    if (filters.value.statuses.length === 1) {
      return filters.value.statuses[0]
    }

    return null
  })

  const alertsOnly = computed(() => {
    return filters.value.hideIsolated
  })

  function setSearch(search) {
    filters.value.search = search
    ensureSelectionIsVisible()
  }

  function setFilterField(field, value) {
    filters.value[field] = value
    ensureSelectionIsVisible()
  }

  function toggleFilterValue(field, value) {
    const currentValues = filters.value[field]

    filters.value[field] = currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value]

    ensureSelectionIsVisible()
  }

  function resetFilters() {
    filters.value = structuredClone(DEFAULT_FILTERS)
    ensureSelectionIsVisible()
  }

  function setParticipantTypeFilter(value) {
    filters.value.types = value ? [value] : [...ALL_TYPES]
    ensureSelectionIsVisible()
  }

  function setStatusFilter(value) {
    filters.value.statuses = value ? [value] : [...ALL_STATUSES]
    ensureSelectionIsVisible()
  }

  function setAlertsOnlyFilter(value) {
    filters.value.hideIsolated = value
    ensureSelectionIsVisible()
  }

  function selectNode(nodeId) {
    selectedNodeId.value = nodeId
    activeTab.value = 'info'
  }

  function clearSelection() {
    selectedNodeId.value = ''
    activeTab.value = 'info'
  }

  function setActiveTab(tabId) {
    activeTab.value = tabId
  }

  function toggleSidebar() {
    sidebarCollapsed.value = !sidebarCollapsed.value
  }

  function openAddParticipantModal() {
    isAddParticipantModalOpen.value = true
  }

  function closeAddParticipantModal() {
    isAddParticipantModalOpen.value = false
  }

  function addParticipant(payload) {
    const newNode = createParticipantNode(payload)

    graph.value = {
      ...graph.value,
      nodes: [...graph.value.nodes, newNode],
    }

    selectedNodeId.value = newNode.id
    activeTab.value = 'info'

    ensureSelectionIsVisible()

    closeAddParticipantModal()
  }

  function ensureSelectionIsVisible() {
    if (!selectedNodeId.value) {
      return
    }

    const visibleNodeIds = new Set(
        filteredGraph.value.nodes.map((node) => node.id),
    )

    if (!visibleNodeIds.has(selectedNodeId.value)) {
      clearSelection()
    }
  }

  return {
    graph,
    filters,
    selectedNodeId,
    activeTab,
    sidebarCollapsed,
    isAddParticipantModalOpen,

    filteredGraph,
    selectedNode,
    stats,
    tabs,
    selectedParticipantType,
    selectedStatus,
    alertsOnly,

    setSearch,
    setFilterField,
    toggleFilterValue,
    resetFilters,
    setParticipantTypeFilter,
    setStatusFilter,
    setAlertsOnlyFilter,

    selectNode,
    clearSelection,
    setActiveTab,
    toggleSidebar,

    openAddParticipantModal,
    closeAddParticipantModal,
    addParticipant,
  }
})