<script setup>
import VChart from 'vue-echarts'
import BaseCard from '@/components/common/BaseCard.vue'

defineProps({
  chartOption: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <BaseCard
      title="Топ мерчантов по объёму"
      subtitle="Ежемесячный оборот"
      class="statistics-top-merchants-card"
  >
    <div class="statistics-top-merchants-card__content">
      <VChart
          class="statistics-top-merchants-card__chart"
          :option="chartOption"
          autoresize
      />
    </div>
  </BaseCard>
</template>

<style scoped>
.statistics-top-merchants-card__content {
  height: 300px;
}

.statistics-top-merchants-card__chart {
  width: 100%;
  height: 100%;
}

@media (max-width: 768px) {
  .statistics-top-merchants-card__content {
    height: 260px;
  }
}
</style>