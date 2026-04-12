<script setup>
import { computed } from 'vue'
import BaseCard from '@/components/common/BaseCard.vue'

const props = defineProps({
  card: {
    type: Object,
    required: true,
  },
})

const deltaClass = computed(() => {
  return {
    'statistics-overview-card__delta--positive': props.card.deltaType === 'positive',
    'statistics-overview-card__delta--negative': props.card.deltaType === 'negative',
  }
})
</script>

<template>
  <BaseCard
      padding="sm"
      class="statistics-overview-card"
  >
    <div class="statistics-overview-card__top">
      <div class="statistics-overview-card__title-wrap">
        <img
            v-if="card.icon"
            :src="`/assets/icons/${card.icon}`"
            :alt="card.title"
            class="statistics-overview-card__icon"
        >

        <span class="statistics-overview-card__title">
          {{ card.title }}
        </span>
      </div>

      <span
          v-if="card.meta"
          class="statistics-overview-card__meta"
      >
        {{ card.meta }}
      </span>
    </div>

    <div class="statistics-overview-card__bottom">
      <div class="statistics-overview-card__value">
        {{ card.value }}
      </div>

      <div
          v-if="card.delta"
          class="statistics-overview-card__delta"
          :class="deltaClass"
      >
        {{ card.delta }}
      </div>
    </div>
  </BaseCard>
</template>

<style scoped>
.statistics-overview-card {
  height: 100%;
}

.statistics-overview-card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.statistics-overview-card__title-wrap {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
}

.statistics-overview-card__icon {
  width: 14px;
  height: 14px;
  object-fit: contain;
  flex-shrink: 0;
}

.statistics-overview-card__title {
  font-weight: 400;
  font-size: 13px;
  line-height: 1.2;
  text-align: center;


  color: #5f6368;
  white-space: nowrap;
}

.statistics-overview-card__meta {
  flex-shrink: 0;
  font-size: 12px;
  line-height: 1.2;
  color: #a3a3a3;
  white-space: nowrap;
}

.statistics-overview-card__bottom {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
  margin-top: 12px;
}

.statistics-overview-card__value {
  font-weight: 600;
  font-size: 20px;
  line-height: 1.2;
  text-align: center;

  color: #1f1f1f;
  white-space: nowrap;
}

.statistics-overview-card__delta {

  font-size: 13px;
  line-height: 1.2;


  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 22px;
  padding: 4px 8px;
  border-radius: 8px;
  font-weight: 500;
  white-space: nowrap;
}

.statistics-overview-card__delta--positive {
  color: #16a34a;
  background: #ecfdf3;
}

.statistics-overview-card__delta--negative {
  color: #ef4444;
  background: #fef2f2;
}
</style>