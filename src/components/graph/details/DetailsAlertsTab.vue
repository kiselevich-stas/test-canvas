<script setup lang="ts">
defineProps<{
  alerts: Array<{
    title: string
    date: string
    text: string
  }>
}>()
</script>

<template>
  <div class="details-stack">
    <template v-if="alerts.length">
      <article
          v-for="alert in alerts"
          :key="`${alert.title}-${alert.date}`"
          class="details-list-card details-list-card--column"
      >
        <div class="details-card__row">
          <span class="details-warning">{{ alert.title }}</span>
          <span class="details-muted">{{ alert.date }}</span>
        </div>

        <div class="details-description">{{ alert.text }}</div>
      </article>
    </template>

    <div v-else class="details-empty">
      Алертов пока нет.
    </div>
  </div>
</template>

<style scoped>
.details-stack {
  display: grid;
  gap: 12px;
}

.details-list-card {
  background: #ffffff;
  border: 1px solid rgba(15, 23, 42, 0.05);
  border-radius: 16px;
  padding: 14px;
}

.details-list-card--column {
  display: grid;
  align-items: stretch;
}

.details-card__row {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
}

.details-warning {
  color: #f97316;
  font-size: 12px;
  font-weight: 600;
}

.details-muted {
  color: #8b95a7;
  font-size: 12px;
}

.details-description {
  margin-top: 10px;
  color: #5b6473;
  font-size: 13px;
  line-height: 1.45;
}

.details-empty {
  padding: 16px;
  background: rgba(255, 255, 255, 0.72);
  border: 1px dashed rgba(139, 149, 167, 0.35);
  border-radius: 16px;
  color: #6b7280;
  font-size: 13px;
}
</style>