<script setup>
import { storeToRefs } from 'pinia'
import { useGraphStore } from '../../store/graphStore'

const graphStore = useGraphStore()
const { stats } = storeToRefs(graphStore)
</script>

<template>
  <div class="top-metrics">
    <div class="metric-pill">
      <span class="metric-dot blue"></span>
      {{ stats.nodes }} мерч.
    </div>

    <div class="metric-pill">
      <span class="metric-dot cyan"></span>
      12 проц.
    </div>

    <div class="metric-pill">
      <span class="metric-dot purple"></span>
      {{ stats.edges }} связей
    </div>

    <div class="metric-pill">
      <span class="metric-dot red"></span>
      {{ stats.danger }} скам
    </div>

    <div class="metric-pill">
      <span class="metric-dot orange"></span>
      {{ stats.warning }} подозр.
    </div>
  </div>
</template>

<style scoped lang="scss">
.top-metrics {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2;
}

.metric-pill {
  height: 36px;
  border-radius: 8px;
  background: rgba(245, 245, 245, 0.9);
  padding: 0 12px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #2f3137;
  font-size: 14px;
}

.metric-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.metric-dot.blue { background: #3b82f6; }
.metric-dot.cyan { background: #36c2da; }
.metric-dot.purple { background: #8b5cf6; }
.metric-dot.red { background: #ef4444; }
.metric-dot.orange { background: #f97316; }
</style>
