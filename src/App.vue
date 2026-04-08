<script setup>
import { ref } from 'vue'
import GraphCanvas from './components/GraphCanvas.vue'
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
    <aside class="dashboard-sidebar">
      <div class="brand-box">
        <div class="brand-dot"></div>
        <span>Twix.im</span>
      </div>

      <div class="sidebar-search">Поиск...</div>

      <nav class="sidebar-menu">
        <button class="menu-item active">Сеть партнеров</button>
        <button class="menu-item">Связи</button>
        <button class="menu-item">Скам-алерты</button>
        <button class="menu-item">Статистика</button>
      </nav>

      <div class="sidebar-footer">
        <button class="menu-item ghost">Уведомления</button>
        <button class="menu-item ghost">Настройки</button>
        <button class="menu-item ghost">Telegram</button>
      </div>
    </aside>

    <main class="dashboard-main">
      <div class="top-metrics">
        <div class="metric-pill"><span class="metric-dot blue"></span>{{ stats.nodes }} мерч.</div>
        <div class="metric-pill"><span class="metric-dot cyan"></span>12 проц.</div>
        <div class="metric-pill"><span class="metric-dot purple"></span>{{ stats.edges }} связей</div>
        <div class="metric-pill"><span class="metric-dot red"></span>5 скам</div>
        <div class="metric-pill"><span class="metric-dot orange"></span>3 подозр.</div>
      </div>

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