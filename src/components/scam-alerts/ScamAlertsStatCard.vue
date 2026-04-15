<script setup>
import BaseCard from "@/components/common/BaseCard.vue";

defineProps({
  title: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  trend: {
    type: String,
    default: '',
  },
  accent: {
    type: String,
    default: 'default',
  },
  icon: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <BaseCard
      class="scam-stat-card"
      :class="`scam-stat-card--${accent}`"
  >
    <div class="scam-stat-card__top">
      <div class="scam-stat-card__title-wrap">
        <span
            v-if="icon"
            class="scam-stat-card__icon"
        >
          {{ icon }}
        </span>

        <span class="scam-stat-card__title">
          {{ title }}
        </span>
      </div>
    </div>

    <div class="scam-stat-card__bottom">
      <div class="scam-stat-card__value">
        {{ value }}
      </div>

      <div
          v-if="trend"
          class="scam-stat-card__trend"
      >
        {{ trend }}
      </div>
    </div>
  </BaseCard>
</template>

<style scoped lang="scss">
.scam-stat-card {
  padding: 14px 16px;
  border-radius: 12px;
  min-height: 88px;
  background: #fff;

  &__top {
    margin-bottom: 10px;
  }

  &__title-wrap {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  &__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    line-height: 1;
  }

  &__title {
    font-size: 13px;
    font-weight: 400;
    line-height: 18px;
    color: #5f6368;
  }

  &__bottom {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 10px;
  }

  &__value {
    font-size: 36px;
    font-weight: 600;
    line-height: 1;
  }

  &__trend {
    display: inline-flex;
    align-items: center;
    height: 24px;
    padding: 0 10px;
    border-radius: 999px;
    background: #e8f7ec;
    color: #18a957;
    font-size: 12px;
    font-weight: 500;
    white-space: nowrap;
  }

  &--critical &__value {
    color: #ef3b3b;
  }

  &--high &__value {
    color: #ff8a1f;
  }

  &--nodes &__value {
    color: #7a4cff;
  }

  &--suspicious &__value {
    color: #f59e0b;
  }
}
</style>