<script setup lang="ts">
import {computed} from "vue";

const props = withDefaults(defineProps<{
  status?: string
  statusLabel?: string
  score?: number
}>(), {
  status: 'unknown',
  statusLabel: 'unknown',
  score: 0,
})

const normalizedScore = computed(() => {
  return Math.max(0, Math.min(100, props.score))
})
</script>

<template>
  <div class="details-status-card" :data-status="status">
    <div class="details-status-card__left">
      <span class="details-status-card__dot" />
      <span class="details-status-card__label">
        {{ statusLabel }}
      </span>
    </div>

    <div class="details-status-card__right">
      <span class="details-status-card__score">
        {{ normalizedScore }}/100
      </span>
      <span class="details-status-card__ring" />
    </div>
  </div>
</template>

<style scoped>
.details-status-card {
  margin-bottom: 12px;
  min-height: 34px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  background: #ffffff;
  border-radius: 10px;
}

.details-status-card__left {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.details-status-card__dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #16a34a;
  position: relative;
  flex: none;
}

.details-status-card__dot::after {
  content: '✓';
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 9px;
  font-weight: 700;
}

.details-status-card__label {
  color: #111827;
  font-size: 12px;
  font-weight: 500;
  line-height: 1;
}

.details-status-card__right {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: none;
}

.details-status-card__score {
  color: #7c8594;
  font-size: 12px;
  font-weight: 500;
  line-height: 1;
}

.details-status-card__ring {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid #22c55e;
  border-top-color: transparent;
  transform: rotate(35deg);
  flex: none;
}

.details-status-card[data-status='active'] .details-status-card__dot {
  background: #16a34a;
}

.details-status-card[data-status='warning'] .details-status-card__dot {
  background: #f59e0b;
}

.details-status-card[data-status='danger'] .details-status-card__dot {
  background: #ef4444;
}

.details-status-card[data-status='unknown'] .details-status-card__dot {
  background: #9ca3af;
}
</style>