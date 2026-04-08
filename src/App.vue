<script setup>
import { ref } from 'vue'
import GraphCanvas from './components/GraphCanvas.vue'
import Sidebar from './components/sidebar/Sidebar.vue'
import DashboardMetrics from './components/dashboard/DashboardMetrics.vue'
import { sampleGraph } from './data/sampleGraph'

const graphCanvas = ref(null)
const graph = sampleGraph

const stats = ref({
  nodes: graph.nodes.length,
  edges: graph.edges.length,
})

function handleStatsChange(nextStats) {
  stats.value = nextStats
}
</script>

<template>
  <div class="dashboard-layout">
    <Sidebar />

    <main class="dashboard-main">
      <DashboardMetrics :stats="stats" />

      <GraphCanvas
          ref="graphCanvas"
          :graph="graph"
          :filters="{
          search: '',
          types: ['hub', 'processor', 'merchant'],
          statuses: ['active', 'warning', 'danger', 'unknown'],
          edgeTypes: ['hub', 'direct', 'dashed'],
          hideIsolated: false,
        }"
          @stats-change="handleStatsChange"
      />
    </main>
  </div>
</template>