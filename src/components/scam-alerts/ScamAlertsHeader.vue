<script setup>
defineProps({
  title: {
    type: String,
    default: 'Скам-алерты',
  },
  description: {
    type: String,
    default: 'Система предупреждений о мошенничестве по линии партнёров',
  },
})
</script>

<template>
  <div class="scam-alerts-header">
    <div class="scam-alerts-header__content">
      <h1 class="scam-alerts-header__title">
        {{ title }}
      </h1>

      <p class="scam-alerts-header__description">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.scam-alerts-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;

  &__content {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &__title {
    margin: 0;
    font-size: 24px;
    font-weight: 600;
    line-height: 32px;
    color: #1f2937;
  }

  &__description {
    margin: 0;
    font-size: 14px;
    line-height: 20px;
    color: #6b7280;
  }
}
</style>