<template>
  <div class="graph-shell">
    <div ref="graphRef" class="graph-canvas" />

    <div class="panel side-panel">
      <div class="panel-title">Выбранный узел</div>

      <template v-if="selectedNode">
        <div class="node-preview">
          <div class="preview-dot" :data-status="selectedNode.status"></div>
          <div>
            <div class="preview-name">{{ selectedNode.label }}</div>
            <div class="preview-subtitle">{{ selectedNode.type }}</div>
          </div>
        </div>

        <div class="details-grid">
          <div class="details-label">ID</div>
          <div class="details-value">{{ selectedNode.id }}</div>

          <div class="details-label">Статус</div>
          <div class="details-value">{{ selectedNode.status }}</div>

          <div class="details-label">Страна</div>
          <div class="details-value">{{ selectedNode.meta?.country || '—' }}</div>

          <div class="details-label">Группа</div>
          <div class="details-value">{{ selectedNode.meta?.group || '—' }}</div>
        </div>

        <div class="detail-actions">
          <button class="ui-button wide" @click="focusSelectedNode">Фокус на узле</button>
          <button class="ui-button wide ghost" @click="highlightNeighbours">Подсветить соседей</button>
          <button class="ui-button wide ghost" @click="clearHighlight">Сбросить подсветку</button>
        </div>
      </template>

      <div v-else class="empty-state">
        Нажми на узел, чтобы посмотреть детали и быстро сфокусироваться на нём.
      </div>

      <div class="panel-title panel-title-spaced">Легенда</div>
      <div class="legend-list">
        <div class="legend-item"><span class="legend-swatch hub"></span> Hub</div>
        <div class="legend-item"><span class="legend-swatch processor"></span> Processor</div>
        <div class="legend-item"><span class="legend-swatch merchant"></span> Merchant</div>
      </div>
      <div class="legend-list compact">
        <div class="legend-item"><span class="status-dot active"></span> active</div>
        <div class="legend-item"><span class="status-dot warning"></span> warning</div>
        <div class="legend-item"><span class="status-dot danger"></span> danger</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import cytoscape from 'cytoscape'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { filterGraph, graphToElements } from '../utils/mapToElements'

const DEFAULT_CENTER_ID = 'core'
const graphRef = ref(null)
const cyInstance = ref(null)
const selectedNodeId = ref('')

const props = defineProps({
  graph: {
    type: Object,
    required: true,
  },
  filters: {
    type: Object,
    required: true,
  },
})

const selectedNode = computed(() => {
  return props.graph.nodes.find((node) => node.id === selectedNodeId.value) || null
})

function buildStylesheet() {
  return [
    {
      selector: 'node',
      style: {
        label: 'data(label)',
        width: 'data(size)',
        height: 'data(size)',
        color: '#d9e3f0',
        'font-size': 11,
        'font-weight': 600,
        'text-wrap': 'wrap',
        'text-max-width': 96,
        'text-valign': 'bottom',
        'text-halign': 'center',
        'text-margin-y': 10,
        'background-color': 'transparent',
        'background-image': 'data(sprite)',
        'background-fit': 'cover',
        'background-clip': 'none',
        'border-width': 0,
        'overlay-opacity': 0,
      },
    },
    {
      selector: 'edge',
      style: {
        width: 2,
        'curve-style': 'bezier',
        'line-color': '#45648f',
        'target-arrow-shape': 'none',
        opacity: 0.95,
      },
    },
    {
      selector: 'edge[edgeType = "hub"]',
      style: {
        'line-color': '#8b5cf6',
        width: 2.4,
      },
    },
    {
      selector: 'edge[edgeType = "direct"]',
      style: {
        'line-color': '#2dd4bf',
        width: 2,
      },
    },
    {
      selector: 'edge[edgeType = "dashed"]',
      style: {
        'line-color': '#38bdf8',
        'line-style': 'dashed',
        width: 2,
      },
    },
    {
      selector: 'edge[risk = "medium"]',
      style: {
        width: 3,
        opacity: 0.9,
      },
    },
    {
      selector: 'edge[risk = "high"]',
      style: {
        width: 4,
        opacity: 0.95,
      },
    },
    {
      selector: '.faded',
      style: {
        opacity: 0.12,
      },
    },
    {
      selector: '.selected-focus',
      style: {
        'underlay-color': '#f8fafc',
        'underlay-padding': 8,
        'underlay-opacity': 0.22,
      },
    },
    {
      selector: '.related-edge',
      style: {
        opacity: 1,
      },
    },
  ]
}

function createGraph() {
  if (!graphRef.value) return

  const filteredGraph = filterGraph(props.graph, props.filters)

  cyInstance.value = cytoscape({
    container: graphRef.value,
    elements: graphToElements(filteredGraph),
    style: buildStylesheet(),
    layout: { name: 'preset', padding: 80 },
    minZoom: 0.2,
    maxZoom: 2.2,
    wheelSensitivity: 0.2,
    boxSelectionEnabled: false,
    autoungrabify: false,
    selectionType: 'single',
  })

  cyInstance.value.on('tap', 'node', (event) => {
    const node = event.target
    selectedNodeId.value = node.id()
    clearHighlight()
    node.addClass('selected-focus')
  })

  cyInstance.value.on('tap', (event) => {
    if (event.target === cyInstance.value) {
      selectedNodeId.value = ''
      clearHighlight()
    }
  })

  requestAnimationFrame(() => fitGraph())
}

function destroyGraph() {
  if (!cyInstance.value) return
  cyInstance.value.destroy()
  cyInstance.value = null
}

function refreshGraph() {
  const currentZoom = cyInstance.value?.zoom() ?? 1
  const currentPan = cyInstance.value?.pan() ?? { x: 0, y: 0 }
  destroyGraph()
  createGraph()

  if (cyInstance.value) {
    cyInstance.value.zoom(currentZoom)
    cyInstance.value.pan(currentPan)
  }
}

function fitGraph() {
  if (!cyInstance.value) return
  cyInstance.value.fit(cyInstance.value.elements(), 80)
}

function resetGraph() {
  selectedNodeId.value = ''
  clearHighlight()
  fitGraph()
  const centerNode = cyInstance.value?.getElementById(DEFAULT_CENTER_ID)
  if (centerNode?.length) {
    cyInstance.value?.animate({
      center: { eles: centerNode },
      zoom: 0.95,
      duration: 250,
    })
  }
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
}

function focusSelectedNode() {
  if (!cyInstance.value || !selectedNodeId.value) return
  const node = cyInstance.value.getElementById(selectedNodeId.value)
  clearHighlight()
  node.addClass('selected-focus')
  cyInstance.value.animate({
    center: { eles: node },
    zoom: Math.min(1.2, cyInstance.value.maxZoom()),
    duration: 260,
  })
}

function highlightNeighbours() {
  if (!cyInstance.value || !selectedNodeId.value) return
  const node = cyInstance.value.getElementById(selectedNodeId.value)
  const neighbours = node.closedNeighborhood()
  cyInstance.value.elements().addClass('faded')
  neighbours.removeClass('faded')
  node.addClass('selected-focus')
  neighbours.edges().addClass('related-edge')
}

function clearHighlight() {
  if (!cyInstance.value) return
  cyInstance.value.elements().removeClass('faded')
  cyInstance.value.elements().removeClass('selected-focus')
  cyInstance.value.elements().removeClass('related-edge')
}

onMounted(() => {
  createGraph()
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
