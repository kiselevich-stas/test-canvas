<script setup>
import DashboardLayout from './layouts/DashboardLayout.vue'
import DashboardMetrics from './components/dashboard/DashboardMetrics.vue'
import GraphCanvas from './components/GraphCanvas.vue'
</script>

<template>
  <DashboardLayout>
    <DashboardMetrics />
    <GraphCanvas />
  </DashboardLayout>
</template>
