<script setup lang="ts">
import UiButton from '@/components/ui/UiButton.vue'

defineEmits<{
  request: []
}>()
</script>

<template>
  <div class="connections-header">
    <div class="connections-header__left">
      <h1 class="connections-header__title">Управление связями</h1>
      <p class="connections-header__subtitle">
        Партнёрские связи подтверждаются обеими сторонами
      </p>
    </div>

    <UiButton
        variant="primary"
        icon="plus"
        @click="$emit('request')"
    >
      Запросить связь
    </UiButton>
  </div>
</template>

<style scoped>
.connections-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.connections-header__left {
  min-width: 0;
}

.connections-header__title {
  margin: 0;
  color: #1f1f24;
  font-size: 28px;
  font-weight: 700;
  line-height: 1.1;
}

.connections-header__subtitle {
  margin: 6px 0 0;
  color: #8d8d97;
  font-size: 15px;
  line-height: 1.3;
}
</style>