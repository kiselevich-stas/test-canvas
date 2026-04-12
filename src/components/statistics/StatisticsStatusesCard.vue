<script setup>
import BaseCard from '@/components/common/BaseCard.vue'

defineProps({
  chartOption: {
    type: Object,
    required: true,
  },
  statuses: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <BaseCard
      title="Статусы нодов"
      subtitle="Распределение по статусам"
      class="statistics-statuses-card"
  >
    <div class="statistics-statuses-card__content">
      <VChart
          class="statistics-statuses-card__chart"
          :option="chartOption"
          autoresize
      />

      <div class="statistics-statuses-card__legend">
        <div
            v-for="item in statuses"
            :key="item.name"
            class="statistics-statuses-card__legend-item"
        >
          <span
              class="statistics-statuses-card__dot"
              :class="{
              'statistics-statuses-card__dot--green': item.name === 'Активные',
              'statistics-statuses-card__dot--orange': item.name === 'Подозрит.',
              'statistics-statuses-card__dot--red': item.name === 'Скам',
              'statistics-statuses-card__dot--gray': item.name === 'Неактивные',
            }"
          />

          <span class="statistics-statuses-card__label">
            {{ item.name }}
          </span>

          <span class="statistics-statuses-card__value">
            {{ item.value }}
          </span>
        </div>
      </div>
    </div>
  </BaseCard>
</template>

<script>
import VChart from 'vue-echarts'

export default {
  components: {
    VChart,
  },
}
</script>

<style scoped>
.statistics-statuses-card__content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.statistics-statuses-card__chart {
  width: 100%;
  height: 210px;
}

.statistics-statuses-card__legend {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px 14px;
  margin-top: 4px;
}

.statistics-statuses-card__legend-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #6b7280;
  font-size: 14px;
  line-height: 1;
  white-space: nowrap;
}

.statistics-statuses-card__label {
  color: #7b7b7b;
  font-weight: 400;
}

.statistics-statuses-card__value {
  color: #1f1f1f;
  font-weight: 700;
}

.statistics-statuses-card__dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  flex-shrink: 0;
}

.statistics-statuses-card__dot--green {
  background: #10b85a;
}

.statistics-statuses-card__dot--orange {
  background: #ff8a2a;
}

.statistics-statuses-card__dot--red {
  background: #ef3b3b;
}

.statistics-statuses-card__dot--gray {
  background: #e3e3e3;
}
</style>