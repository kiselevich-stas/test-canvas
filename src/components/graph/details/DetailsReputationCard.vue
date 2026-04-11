<script setup lang="ts">
defineProps<{
  reputation?: {
    label: string
    value: number
  }
}>()
</script>

<template>
  <section class="details-card">
    <div class="details-card__row">
      <span class="details-card__label">Репутация</span>
      <span class="details-positive">{{ reputation?.label || '—' }}</span>
    </div>

    <div class="details-reputation-value">
      {{ reputation?.value || 0 }} из 100
    </div>

    <div class="details-progress">
      <div
          class="details-progress__bar"
          :style="{ width: `${reputation?.value || 0}%` }"
      />
    </div>
  </section>
</template>

<style scoped>
.details-card {
  background: #ffffff;
  border-radius: 20px;
  padding: 16px;
}

.details-card__row {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
}

.details-card__label {
  color: #475467;
  font-size: 14px;
  line-height: 1.2;
}

.details-positive {
  color: #22c55e;
  font-size: 12px;
  font-weight: 500;
}

.details-reputation-value {
  margin-top: 12px;
  color: #111827;
  font-size: 18px;
  font-weight: 700;
  line-height: 1;
}

.details-progress {
  height: 6px;
  margin-top: 14px;
  border-radius: 999px;
  background: #e5e7eb;
  overflow: hidden;
}

.details-progress__bar {
  height: 100%;
  border-radius: inherit;
  background: #16a34a;
}
</style>