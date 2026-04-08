<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import cytoscape from 'cytoscape'
import { filterGraph, graphToElements } from '../utils/mapToElements'

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

const emit = defineEmits(['stats-change'])

const graphRef = ref(null)
const cyInstance = ref(null)
const isGraphReady = ref(false)
const selectedNodeId = ref('')

const selectedNode = computed(() => {
  return props.graph.nodes.find((node) => node.id === selectedNodeId.value) || null
})

const DEFAULT_CENTER_ID = 'core'
const STORAGE_KEY_VIEWPORT = 'twix-graph-viewport'
const STORAGE_KEY_POSITIONS = 'twix-graph-node-positions'

const filteredGraph = computed(() => filterGraph(props.graph, props.filters))

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

function readViewport() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_VIEWPORT) || 'null')
  } catch {
    return null
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

function readNodePositions() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_POSITIONS) || '{}')
  } catch {
    return {}
  }
}

function mergeGraphWithSavedPositions(graph) {
  const savedPositions = readNodePositions()

  return {
    ...graph,
    nodes: graph.nodes.map((node) => {
      const savedPosition = savedPositions[node.id]

      if (!savedPosition) {
        return node
      }

      return {
        ...node,
        x: savedPosition.x,
        y: savedPosition.y,
      }
    }),
  }
}

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
        borderWidth: 0,
        label: 'data(label)',
        color: '#2f3137',
        'font-size': 12,
        'font-weight': 500,
        'text-valign': 'bottom',
        'text-halign': 'center',
        'text-margin-y': 18,
        'text-background-opacity': 1,
        'text-background-color': '#f3f4f6',
        'text-background-shape': 'roundrectangle',
        'text-background-padding': '4px',
        'text-wrap': 'none',
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
      selector: '.faded',
      style: {
        opacity: 0.14,
      },
    },
  ]
}

function getInitialViewport(graph) {
  const savedViewport = readViewport()

  if (savedViewport?.pan && typeof savedViewport?.zoom === 'number') {
    return {
      pan: savedViewport.pan,
      zoom: savedViewport.zoom,
    }
  }

  const centerNode = graph.nodes.find((node) => node.id === DEFAULT_CENTER_ID)

  if (centerNode) {
    return {
      pan: {
        x: window.innerWidth / 2 - centerNode.x,
        y: window.innerHeight / 2 - centerNode.y,
      },
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

function focusNode(nodeId) {
  if (!cyInstance.value || !nodeId) return

  const node = cyInstance.value.getElementById(nodeId)
  if (!node?.length) return

  clearHighlight()
  node.addClass('selected-focus')
  cyInstance.value.elements().difference(node.closedNeighborhood()).addClass('faded')

  cyInstance.value.animate({
    fit: {
      eles: node.closedNeighborhood(),
      padding: 120,
    },
    duration: 220,
  })

  saveViewport()
}

function emitStats() {
  emit('stats-change', {
    nodes: filteredGraph.value.nodes.length,
    edges: filteredGraph.value.edges.length,
  })
}

function initGraph() {
  if (!graphRef.value) return

  isGraphReady.value = false

  const graphWithSavedPositions = mergeGraphWithSavedPositions(filteredGraph.value)
  const initialViewport = getInitialViewport(graphWithSavedPositions)

  cyInstance.value = cytoscape({
    container: graphRef.value,
    elements: graphToElements(graphWithSavedPositions),
    style: createStylesheet(),

    layout: {
      name: 'preset',
    },

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
    const node = event.target
    selectedNodeId.value = node.id()
    focusNode(node.id())
  })

  cyInstance.value.on('tap', (event) => {
    if (event.target === cyInstance.value) {
      selectedNodeId.value = ''
      clearHighlight()
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
    emitStats()
  })
}

function destroyGraph() {
  if (!cyInstance.value) return
  cyInstance.value.destroy()
  cyInstance.value = null
}

function refreshGraph() {
  const activeNodeId = selectedNodeId.value

  destroyGraph()

  nextTick(() => {
    initGraph()

    if (activeNodeId) {
      const node = cyInstance.value?.getElementById(activeNodeId)

      if (node?.length) {
        selectedNodeId.value = activeNodeId
      }
    }
  })
}

watch(
    () => props.filters,
    () => {
      refreshGraph()
    },
    {deep: true},
)

onMounted(() => {
  initGraph()
})

onBeforeUnmount(() => {
  destroyGraph()
})
</script>

<template>
  <div class="graph-shell">
    <div
        ref="graphRef"
        class="graph-canvas"
        :class="{ 'graph-canvas--ready': isGraphReady }"
    />
  </div>
</template>