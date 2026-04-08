<template>
  <div class="graph-shell">
    <div ref="graphRef" class="graph-canvas" :class="{ 'graph-canvas--ready': isGraphReady }" />

    <div class="canvas-legend panel">
      <div class="panel-title">Легенда</div>

      <div class="legend-list compact">
        <div class="legend-item"><span class="legend-swatch hub"></span> TWIX Хаб</div>
        <div class="legend-item"><span class="legend-swatch processor"></span> Процессинг</div>
        <div class="legend-item"><span class="legend-swatch merchant"></span> Мерчант</div>
        <div class="legend-item"><span class="status-dot active"></span> Активен</div>
        <div class="legend-item"><span class="status-dot warning"></span> Подозрительный</div>
        <div class="legend-item"><span class="status-dot danger"></span> Скам</div>
        <div class="legend-item"><span class="line-dot hub-line"></span> Через TWIX</div>
        <div class="legend-item"><span class="line-dot direct-line"></span> Прямая связь</div>
      </div>
    </div>

    <aside class="canvas-side panel" :class="{ 'canvas-side--open': !!selectedNode }">
      <template v-if="selectedNode">
        <div class="side-header">
          <div class="side-header-main">
            <div class="side-avatar">{{ selectedNode.meta?.shortName || selectedNode.label.slice(0, 2) }}</div>
            <div>
              <div class="side-title">{{ selectedNode.label }}</div>
              <div class="side-tags">
                <span class="side-chip side-chip--type">{{ selectedNode.meta?.typeLabel || selectedNode.type }}</span>
                <span v-if="selectedNode.meta?.statusTag" class="side-chip side-chip--alert">{{ selectedNode.meta.statusTag }}</span>
              </div>
            </div>
          </div>

          <button class="close-button" type="button" @click="clearSelection">×</button>
        </div>

        <div class="status-card">
          <div class="status-row">
            <div class="status-pill" :data-status="selectedNode.status">
              <span class="status-pill-dot"></span>
              {{ selectedNode.meta?.statusLabel || selectedNode.status }}
            </div>
            <div class="status-score">{{ selectedNode.meta?.statusScore ?? 0 }}/100 <span class="status-ring"></span></div>
          </div>
        </div>

        <div class="tabs-row">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            type="button"
            class="tab-button"
            :class="{ active: activeTab === tab.id }"
            @click="activeTab = tab.id"
          >
            {{ tab.label }}
            <span v-if="tab.count" class="tab-count">{{ tab.count }}</span>
          </button>
        </div>

        <div v-if="activeTab === 'info'" class="side-section stack-gap">
          <p class="side-description">{{ selectedNode.meta?.description || 'Описание отсутствует.' }}</p>

          <div class="contact-list">
            <div v-for="contact in selectedNode.meta?.contacts || []" :key="contact" class="contact-item">{{ contact }}</div>
          </div>

          <div class="metric-card">
            <div class="metric-card-row">
              <span>Репутация</span>
              <span class="metric-card-tag">{{ selectedNode.meta?.reputation?.label || '—' }}</span>
            </div>
            <div class="metric-card-value">{{ selectedNode.meta?.reputation?.value || 0 }} из 100</div>
            <div class="metric-progress">
              <div class="metric-progress-bar" :style="{ width: `${selectedNode.meta?.reputation?.value || 0}%` }"></div>
            </div>
          </div>

          <div class="metrics-grid">
            <div v-for="metric in selectedNode.meta?.metrics || []" :key="metric.label" class="small-metric">
              <div class="small-metric-label">{{ metric.label }}</div>
              <div class="small-metric-value">{{ metric.value }}</div>
            </div>
          </div>
        </div>

        <div v-else-if="activeTab === 'connections'" class="side-section stack-gap">
          <div v-if="selectedNode.meta?.relations?.length" class="relation-list">
            <div v-for="relation in selectedNode.meta.relations" :key="`${relation.name}-${relation.role}`" class="relation-item">
              <div class="relation-left">
                <div class="relation-avatar">{{ relation.initials }}</div>
                <div>
                  <div class="relation-name">{{ relation.name }}</div>
                  <div class="relation-role">{{ relation.role }}</div>
                </div>
              </div>
              <div class="relation-status" :data-tone="relation.tone">{{ relation.status }}</div>
            </div>
          </div>
          <div v-else class="empty-state empty-state--inline">Для этого узла пока нет связанных карточек.</div>
        </div>

        <div v-else class="side-section stack-gap">
          <div v-if="selectedNode.meta?.alerts?.length" class="alert-list">
            <div v-for="alert in selectedNode.meta.alerts" :key="`${alert.title}-${alert.date}`" class="alert-item">
              <div class="alert-top">
                <span class="alert-badge">{{ alert.title }}</span>
                <span class="alert-date">{{ alert.date }}</span>
              </div>
              <div class="alert-text">{{ alert.text }}</div>
            </div>
          </div>
          <div v-else class="empty-state empty-state--inline">Алертов пока нет.</div>
        </div>

        <button class="report-button" type="button">Пожаловаться на скам</button>
      </template>

      <div v-else class="side-empty">
        <div class="panel-title">Выбранный узел</div>
        <div class="empty-state">
          Нажми на любой узел на канвасе — справа появится карточка с информацией, связями и алертами.
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import cytoscape from 'cytoscape'
import { filterGraph, graphToElements } from '../utils/mapToElements'

const props = defineProps({
  graph: { type: Object, required: true },
  filters: { type: Object, required: true },
})

const DEFAULT_CENTER_ID = 'core'
const STORAGE_KEY_VIEWPORT = 'twix-graph-viewport'
const STORAGE_KEY_POSITIONS = 'twix-graph-node-positions'

const graphRef = ref(null)
const cyInstance = ref(null)
const isGraphReady = ref(false)
const selectedNodeId = ref('')
const activeTab = ref('info')

const selectedNode = computed(() => {
  return props.graph.nodes.find((node) => node.id === selectedNodeId.value) || null
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

function createStylesheet() {
  return [
    {
      selector: 'node',
      style: {
        width: 'data(size)',
        height: 'data(size)',
        shape: 'ellipse',
        'background-opacity': 0,
        'background-image': 'data(sprite)',
        'background-fit': 'contain',
        'background-width': '100%',
        'background-height': '100%',
        label: 'data(label)',
        color: '#3a3a3a',
        'font-size': 11,
        'font-weight': 500,
        'text-valign': 'bottom',
        'text-halign': 'center',
        'text-margin-y': 14,
        'text-background-opacity': 1,
        'text-background-color': '#eeeeee',
        'text-background-shape': 'roundrectangle',
        'text-background-padding': '4px',
        'overlay-opacity': 0,
      },
    },
    {
      selector: 'edge',
      style: {
        width: 2,
        'curve-style': 'bezier',
        'line-color': '#17b6d5',
        'target-arrow-shape': 'none',
        opacity: 1,
      },
    },
    {
      selector: 'edge[edgeType = "hub"]',
      style: {
        'line-color': '#8b5cf6',
        width: 2,
      },
    },
    {
      selector: 'edge[edgeType = "direct"]',
      style: {
        'line-color': '#17b6d5',
        width: 2,
      },
    },
    {
      selector: 'edge[edgeType = "dashed"]',
      style: {
        'line-color': '#17b6d5',
        'line-style': 'dashed',
        width: 2,
      },
    },
    {
      selector: '.faded',
      style: {
        opacity: 0.14,
      },
    },
    {
      selector: '.selected-focus',
      style: {
        'underlay-color': '#ffffff',
        'underlay-opacity': 0.5,
        'underlay-padding': 8,
      },
    },
  ]
}

function readViewport() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_VIEWPORT) || 'null')
  } catch {
    return null
  }
}

function saveViewport() {
  if (!cyInstance.value) return

  localStorage.setItem(
    STORAGE_KEY_VIEWPORT,
    JSON.stringify({
      pan: cyInstance.value.pan(),
      zoom: cyInstance.value.zoom(),
    }),
  )
}

function readNodePositions() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_POSITIONS) || '{}')
  } catch {
    return {}
  }
}

function saveNodePositions() {
  if (!cyInstance.value) return

  const positions = {}
  cyInstance.value.nodes().forEach((node) => {
    positions[node.id()] = node.position()
  })

  localStorage.setItem(STORAGE_KEY_POSITIONS, JSON.stringify(positions))
}

function mergeGraphWithSavedPositions(graph) {
  const savedPositions = readNodePositions()

  return {
    ...graph,
    nodes: graph.nodes.map((node) => {
      if (!savedPositions[node.id]) return node
      return {
        ...node,
        x: savedPositions[node.id].x,
        y: savedPositions[node.id].y,
      }
    }),
  }
}

function getInitialViewport(graph) {
  const savedViewport = readViewport()
  if (savedViewport?.pan && typeof savedViewport?.zoom === 'number') {
    return savedViewport
  }

  const centerNode = graph.nodes.find((node) => node.id === DEFAULT_CENTER_ID)
  if (centerNode) {
    return {
      pan: { x: window.innerWidth / 2 - centerNode.x - 100, y: window.innerHeight / 2 - centerNode.y - 40 },
      zoom: 1,
    }
  }

  return {
    pan: { x: 0, y: 0 },
    zoom: 1,
  }
}

function clearHighlight() {
  if (!cyInstance.value) return
  cyInstance.value.elements().removeClass('faded selected-focus')
}

function applySelectionState(nodeId) {
  if (!cyInstance.value || !nodeId) return
  const node = cyInstance.value.getElementById(nodeId)
  if (!node?.length) return

  clearHighlight()
  node.addClass('selected-focus')
  cyInstance.value.elements().difference(node.closedNeighborhood()).addClass('faded')
}

function selectNode(nodeId) {
  selectedNodeId.value = nodeId
  activeTab.value = 'info'
  applySelectionState(nodeId)
}

function clearSelection() {
  selectedNodeId.value = ''
  activeTab.value = 'info'
  clearHighlight()
}

function initGraph() {
  if (!graphRef.value) return

  isGraphReady.value = false

  const filteredGraph = filterGraph(props.graph, props.filters)
  const graphWithSavedPositions = mergeGraphWithSavedPositions(filteredGraph)
  const initialViewport = getInitialViewport(graphWithSavedPositions)

  cyInstance.value = cytoscape({
    container: graphRef.value,
    elements: graphToElements(graphWithSavedPositions),
    style: createStylesheet(),
    layout: { name: 'preset' },
    pan: initialViewport.pan,
    zoom: initialViewport.zoom,
    minZoom: 0.2,
    maxZoom: 3,
    wheelSensitivity: 3,
    boxSelectionEnabled: false,
    autoungrabify: false,
    selectionType: 'single',
  })

  cyInstance.value.on('tap', 'node', (event) => {
    selectNode(event.target.id())
  })

  cyInstance.value.on('tap', (event) => {
    if (event.target === cyInstance.value) {
      clearSelection()
    }
  })

  cyInstance.value.on('dragfree', 'node', () => {
    saveNodePositions()
  })

  cyInstance.value.on('pan zoom', () => {
    saveViewport()
  })

  cyInstance.value.ready(() => {
    isGraphReady.value = true
    if (selectedNodeId.value) {
      applySelectionState(selectedNodeId.value)
    }
  })
}

function destroyGraph() {
  if (!cyInstance.value) return
  cyInstance.value.destroy()
  cyInstance.value = null
}

function refreshGraph() {
  const currentSelectedNodeId = selectedNodeId.value
  const currentActiveTab = activeTab.value

  destroyGraph()
  initGraph()

  if (currentSelectedNodeId && props.graph.nodes.some((node) => node.id === currentSelectedNodeId)) {
    selectedNodeId.value = currentSelectedNodeId
    activeTab.value = currentActiveTab
    applySelectionState(currentSelectedNodeId)
  } else {
    clearSelection()
  }
}

function fitGraph() {
  if (!cyInstance.value) return
  cyInstance.value.fit(cyInstance.value.elements(), 90)
  saveViewport()
}

function resetGraph() {
  localStorage.removeItem(STORAGE_KEY_VIEWPORT)
  fitGraph()
  clearSelection()
}

function zoomIn() {
  if (!cyInstance.value) return
  cyInstance.value.zoom({
    level: cyInstance.value.zoom() * 1.12,
    renderedPosition: {
      x: cyInstance.value.width() / 2,
      y: cyInstance.value.height() / 2,
    },
  })
  saveViewport()
}

function zoomOut() {
  if (!cyInstance.value) return
  cyInstance.value.zoom({
    level: cyInstance.value.zoom() / 1.12,
    renderedPosition: {
      x: cyInstance.value.width() / 2,
      y: cyInstance.value.height() / 2,
    },
  })
  saveViewport()
}

onMounted(() => {
  initGraph()
})

onBeforeUnmount(() => {
  destroyGraph()
})

watch(
  () => props.filters,
  () => {
    refreshGraph()
  },
  { deep: true },
)

defineExpose({
  zoomIn,
  zoomOut,
  fitGraph,
  resetGraph,
})
</script>
