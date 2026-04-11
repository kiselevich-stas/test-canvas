<script setup lang="ts">
defineProps<{
  metrics: Array<{
    label: string
    value: string
    icon?: string
  }>
}>()
</script>

<template>
  <section v-if="metrics.length" class="details-metrics">
    <article
        v-for="metric in metrics"
        :key="metric.label"
        class="details-mini-card"
    >
      <div class="details-mini-card__label">
        <img
            v-if="metric.icon"
            class="details-mini-card__icon"
            :src="`/assets/icons/${metric.icon}.svg`"
            alt=""
        />
        <span>{{ metric.label }}</span>
      </div>

      <div class="details-mini-card__value">{{ metric.value }}</div>
    </article>
  </section>
</template>

<style scoped>
.details-metrics {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.details-mini-card {
  min-height: 90px;
  padding: 16px;
  background: #ffffff;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.details-mini-card__label {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #98a2b3;
  font-size: 12px;
  line-height: 1.2;
}

.details-mini-card__icon {
  width: 14px;
  height: 14px;
  object-fit: contain;
  flex: none;
}

.details-mini-card__value {
  margin-top: 14px;
  color: #111827;
  font-size: 28px;
  font-weight: 700;
  line-height: 1;
}
</style>