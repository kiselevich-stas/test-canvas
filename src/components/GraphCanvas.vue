<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import cytoscape from 'cytoscape'
import GraphLegend from './graph/GraphLegend.vue'
import GraphDetailsPanel from './graph/GraphDetailsPanel.vue'
import { graphToElements } from '../utils/mapToElements'
import { useGraphStore } from '../store/graphStore'

const DEFAULT_CENTER_ID = 'core'
const STORAGE_KEY_VIEWPORT = 'twix-graph-viewport'
const STORAGE_KEY_POSITIONS = 'twix-graph-node-positions'

const graphStore = useGraphStore()

const graphRef = ref(null)
const cyInstance = ref(null)
const isGraphReady = ref(false)

const { filteredGraph: graph } = storeToRefs(graphStore)

/**
 * Создает стили Cytoscape для отображения узлов и связей.
 *
 * @returns {Array<object>} Конфигурация stylesheet для Cytoscape.
 */
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

/**
 * Читает сохраненный viewport графа.
 *
 * @returns {{pan: {x:number,y:number}, zoom:number} | null}
 */
function readViewport() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_VIEWPORT) || 'null')
  } catch {
    return null
  }
}

/**
 * Сохраняет текущий viewport.
 */
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

/**
 * Читает сохраненные позиции узлов.
 *
 * @returns {Record<string, {x:number,y:number}>}
 */
function readNodePositions() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_POSITIONS) || '{}')
  } catch {
    return {}
  }
}

/**
 * Сохраняет позиции узлов.
 */
function saveNodePositions() {
  if (!cyInstance.value) return

  const positions = {}

  cyInstance.value.nodes().forEach((node) => {
    positions[node.id()] = node.position()
  })

  localStorage.setItem(STORAGE_KEY_POSITIONS, JSON.stringify(positions))
}

/**
 * Подмешивает сохраненные позиции узлов в текущий граф.
 *
 * @param {{nodes:Array<object>, edges:Array<object>}} currentGraph
 * @returns {{nodes:Array<object>, edges:Array<object>}}
 */
function mergeGraphWithSavedPositions(currentGraph) {
  const savedPositions = readNodePositions()

  return {
    ...currentGraph,
    nodes: currentGraph.nodes.map((node) => {
      if (!savedPositions[node.id]) return node

      return {
        ...node,
        x: savedPositions[node.id].x,
        y: savedPositions[node.id].y,
      }
    }),
  }
}

/**
 * Вычисляет стартовый viewport.
 *
 * @param {{nodes:Array<object>}} currentGraph
 * @returns {{pan: {x:number,y:number}, zoom:number}}
 */
function getInitialViewport(currentGraph) {
  const savedViewport = readViewport()

  if (savedViewport?.pan && typeof savedViewport?.zoom === 'number') {
    return savedViewport
  }

  const centerNode = currentGraph.nodes.find((node) => node.id === DEFAULT_CENTER_ID)

  if (centerNode) {
    return {
      pan: {
        x: window.innerWidth / 2 - centerNode.x - 100,
        y: window.innerHeight / 2 - centerNode.y - 40,
      },
      zoom: 1,
    }
  }

  return {
    pan: { x: 0, y: 0 },
    zoom: 1,
  }
}

/**
 * Снимает визуальное выделение со всех элементов.
 */
function clearHighlight() {
  if (!cyInstance.value) return
  cyInstance.value.elements().removeClass('faded selected-focus')
}

/**
 * Применяет визуальное выделение к выбранному узлу.
 *
 * @param {string} nodeId
 */
function applySelectionState(nodeId) {
  if (!cyInstance.value || !nodeId) return

  const node = cyInstance.value.getElementById(nodeId)
  if (!node?.length) return

  clearHighlight()
  node.addClass('selected-focus')
  cyInstance.value.elements().difference(node.closedNeighborhood()).addClass('faded')
}

/**
 * Выбирает узел.
 *
 * @param {string} nodeId
 */
function selectNode(nodeId) {
  graphStore.selectNode(nodeId)
  applySelectionState(nodeId)
}

/**
 * Очищает выбранный узел и снимает визуальное выделение.
 */
function clearSelection() {
  graphStore.clearSelection()
  clearHighlight()
}

/**
 * Инициализирует граф Cytoscape.
 */
function initGraph() {
  if (!graphRef.value) return

  isGraphReady.value = false

  const graphWithSavedPositions = mergeGraphWithSavedPositions(graph.value)
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

  cyInstance.value.on('dragfree', 'node', saveNodePositions)
  cyInstance.value.on('pan zoom', saveViewport)

  cyInstance.value.ready(() => {
    isGraphReady.value = true

    if (graphStore.selectedNodeId) {
      applySelectionState(graphStore.selectedNodeId)
    }
  })
}

/**
 * Уничтожает экземпляр Cytoscape.
 */
function destroyGraph() {
  if (!cyInstance.value) return
  cyInstance.value.destroy()
  cyInstance.value = null
}

/**
 * Пересоздает граф после изменения фильтров.
 */
function refreshGraph() {
  const currentSelectedNodeId = graphStore.selectedNodeId
  const currentActiveTab = graphStore.activeTab

  destroyGraph()
  initGraph()

  const isSelectedNodeVisible = graph.value.nodes.some(
      (node) => node.id === currentSelectedNodeId,
  )

  if (currentSelectedNodeId && isSelectedNodeVisible) {
    graphStore.selectNode(currentSelectedNodeId)
    graphStore.setActiveTab(currentActiveTab)
    applySelectionState(currentSelectedNodeId)
  } else {
    clearSelection()
  }
}

/**
 * Вписывает граф в область просмотра.
 */
function fitGraph() {
  if (!cyInstance.value) return
  cyInstance.value.fit(cyInstance.value.elements(), 90)
  saveViewport()
}

/**
 * Сбрасывает viewport и выбор узла.
 */
function resetGraph() {
  localStorage.removeItem(STORAGE_KEY_VIEWPORT)
  fitGraph()
  clearSelection()
}

/**
 * Увеличивает масштаб.
 */
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

/**
 * Уменьшает масштаб.
 */
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
    () => graphStore.filters,
    () => {
      refreshGraph()
    },
    { deep: true },
)

watch(
    () => graphStore.selectedNodeId,
    (nodeId) => {
      if (!cyInstance.value) return

      if (!nodeId) {
        clearHighlight()
        return
      }

      applySelectionState(nodeId)
    },
)

defineExpose({
  zoomIn,
  zoomOut,
  fitGraph,
  resetGraph,
})
</script>

<template>
  <div class="graph-shell">
    <div ref="graphRef" class="graph-canvas" :class="{ 'graph-canvas--ready': isGraphReady }" />
    <GraphLegend />
    <GraphDetailsPanel />
  </div>
</template>