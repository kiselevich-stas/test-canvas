<template>
  <div class="app-shell">
    <aside class="left-sidebar">
      <div class="app-brand panel">
        <div class="eyebrow">Vue 3 + Cytoscape</div>
        <h1>Интерактивный граф</h1>
        <p>
          Готовый стартовый проект на Vite. Есть pan, zoom, drag узлов, фильтры,
          разные типы линий и цветовые индикаторы статуса.
        </p>
      </div>

      <GraphToolbar
        @zoom-in="graphCanvas?.zoomIn()"
        @zoom-out="graphCanvas?.zoomOut()"
        @fit="graphCanvas?.fitGraph()"
        @reset="handleResetView"
      />

      <GraphFilters v-model="filters" @reset="resetFilters" />

      <div class="panel stats-panel">
        <div class="panel-title">Статистика</div>
        <div class="stats-grid">
          <div>
            <div class="stats-number">{{ graph.nodes.length }}</div>
            <div class="stats-label">узлов</div>
          </div>
          <div>
            <div class="stats-number">{{ graph.edges.length }}</div>
            <div class="stats-label">связей</div>
          </div>
        </div>
      </div>
    </aside>

    <main class="main-area">
      <GraphCanvas ref="graphCanvas" :graph="graph" :filters="filters" />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import GraphCanvas from './components/GraphCanvas.vue'
import GraphFilters from './components/GraphFilters.vue'
import GraphToolbar from './components/GraphToolbar.vue'
import { sampleGraph } from './data/sampleGraph'

const graph = sampleGraph
const graphCanvas = ref(null)

const defaultFilters = () => ({
  search: '',
  types: ['hub', 'processor', 'merchant'],
  statuses: ['active', 'warning', 'danger'],
  edgeTypes: ['hub', 'direct', 'dashed'],
  hideIsolated: false,
})

const filters = ref(defaultFilters())

function resetFilters() {
  filters.value = defaultFilters()
}

function handleResetView() {
  resetFilters()
  requestAnimationFrame(() => {
    graphCanvas.value?.resetGraph()
  })
}
</script>
