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
      title="Объём транзакций"
      subtitle="Последние 6 месяцев, $M"
      class="statistics-transactions-card"
  >
    <div class="statistics-transactions-card__content">
      <VChart
          class="statistics-transactions-card__chart"
          :option="chartOption"
          autoresize
      />
    </div>
  </BaseCard>
</template>

<style scoped>
.statistics-transactions-card__content {
  height: 257px;
}

.statistics-transactions-card__chart {
  width: 100%;
  height: 100%;
}

@media (max-width: 768px) {
  .statistics-transactions-card__content {
    height: 220px;
  }
}
</style>