<script setup>
import StatisticsOverviewCard from '@/components/statistics/StatisticsOverviewCard.vue'

defineProps({
  cards: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <section class="statistics-overview-cards">
    <StatisticsOverviewCard
        v-for="card in cards"
        :key="card.id"
        :card="card"
    />
  </section>
</template>

<style scoped>
.statistics-overview-cards {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

@media (max-width: 1200px) {
  .statistics-overview-cards {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .statistics-overview-cards {
    grid-template-columns: 1fr;
  }
}
</style>