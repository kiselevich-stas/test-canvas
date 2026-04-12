<script setup>
import DashboardMetrics from '@/components/dashboard/DashboardMetrics.vue'
import GraphCanvas from '@/components/GraphCanvas.vue'
</script>

<template>
  <div class="dashboard-page">
    <Transition name="dashboard-fade" appear>
      <DashboardMetrics />
    </Transition>

    <GraphCanvas />
  </div>
</template>

<style scoped lang="scss">
.dashboard-page {
  position: relative;
  min-height: 100%;
}

:deep(.dashboard-fade-enter-active) {
  transition:
      opacity 0.45s ease,
      transform 0.45s ease,
      filter 0.45s ease;
}

:deep(.dashboard-fade-enter-from) {
  opacity: 0;
  transform: translateY(-10px);
  filter: blur(8px);
}
</style>