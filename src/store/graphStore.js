import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { sampleGraph } from '../data/sampleGraph'
import { filterGraph } from '../utils/mapToElements'

const DEFAULT_FILTERS = Object.freeze({
  search: '',
  types: ['hub', 'processor', 'merchant'],
  statuses: ['active', 'warning', 'danger', 'unknown'],
  edgeTypes: ['hub', 'direct', 'dashed'],
  hideIsolated: false,
})

export const useGraphStore = defineStore('graph', () => {
  const graph = ref(sampleGraph)
  const filters = ref(structuredClone(DEFAULT_FILTERS))
  const selectedNodeId = ref('')
  const activeTab = ref('info')
  const sidebarCollapsed = ref(false)

  const filteredGraph = computed(() => filterGraph(graph.value, filters.value))

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

  function ensureSelectionIsVisible() {
    if (!selectedNodeId.value) return

    const visibleNodeIds = new Set(filteredGraph.value.nodes.map((node) => node.id))

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
    filteredGraph,
    selectedNode,
    stats,
    tabs,
    setSearch,
    setFilterField,
    toggleFilterValue,
    resetFilters,
    selectNode,
    clearSelection,
    setActiveTab,
    toggleSidebar,
  }
})