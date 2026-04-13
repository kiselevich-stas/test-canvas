import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { sampleGraph} from "@/data/sampleGraph.js";
import { filterGraph} from "@/utils/mapToElements.js";

import {
  ALL_TYPES,
  ALL_STATUSES,
  DEFAULT_FILTERS
} from "@/utils/graph/graph.constants.js";

import {
  toggleArrayValue,
  setSingleFilter
} from "@/utils/graph/graphFilters.js";

import {
  calculateStats,
  buildTabs
} from "@/utils/graph/graphComputed.js";

import { ensureSelectionIsVisible} from "@/utils/graph/graphSelection.js";

export const useGraphStore = defineStore('graph', () => {
  const graph = ref(sampleGraph)
  const filters = ref(structuredClone(DEFAULT_FILTERS))

  const selectedNodeId = ref('')
  const activeTab = ref('info')
  const sidebarCollapsed = ref(false)

  const filteredGraph = computed(() =>
      filterGraph(graph.value, filters.value)
  )

  const selectedNode = computed(() =>
      graph.value.nodes.find((n) => n.id === selectedNodeId.value) || null
  )

  const stats = computed(() =>
      calculateStats(filteredGraph.value)
  )

  const tabs = computed(() =>
      buildTabs(selectedNode.value)
  )

  const selectedParticipantType = computed(() => {
    if (filters.value.types.length === ALL_TYPES.length) return null
    if (filters.value.types.length === 1) return filters.value.types[0]
    return null
  })

  const selectedStatus = computed(() => {
    if (filters.value.statuses.length === ALL_STATUSES.length) return null
    if (filters.value.statuses.length === 1) return filters.value.statuses[0]
    return null
  })

  const alertsOnly = computed(() => filters.value.hideIsolated)

  function setSearch(search) {
    filters.value.search = search
    validateSelection()
  }

  function setFilterField(field, value) {
    filters.value[field] = value
    validateSelection()
  }

  function toggleFilterValue(field, value) {
    filters.value[field] = toggleArrayValue(filters.value[field], value)
    validateSelection()
  }

  function resetFilters() {
    filters.value = structuredClone(DEFAULT_FILTERS)
    validateSelection()
  }

  function setParticipantTypeFilter(value) {
    filters.value.types = setSingleFilter(value, ALL_TYPES)
    validateSelection()
  }

  function setStatusFilter(value) {
    filters.value.statuses = setSingleFilter(value, ALL_STATUSES)
    validateSelection()
  }

  function setAlertsOnlyFilter(value) {
    filters.value.hideIsolated = value
    validateSelection()
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

  function validateSelection() {
    const isVisible = ensureSelectionIsVisible(
        selectedNodeId.value,
        filteredGraph.value
    )

    if (!isVisible) {
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
  }
})