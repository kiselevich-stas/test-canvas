<script setup lang="ts">
defineProps<{
  pendingCount: number
}>()
</script>

<template>
  <div class="connections-pending-banner">
    <div class="connections-pending-banner__icon">⌛</div>

    <div class="connections-pending-banner__content">
      <div class="connections-pending-banner__title">
        {{ pendingCount }} запроса ожидают подтверждения
      </div>
      <div class="connections-pending-banner__text">
        Новые связи становятся активными только после взаимного подтверждения
      </div>
    </div>

    <button type="button" class="connections-pending-banner__close">×</button>
  </div>
</template>

<style scoped>
.connections-pending-banner {
  min-height: 56px;
  padding: 0 14px;
  border-radius: 14px;
  background: #fff0e5;
  display: flex;
  align-items: center;
  gap: 12px;
}

.connections-pending-banner__icon {
  color: #fb923c;
  font-size: 18px;
  line-height: 1;
}

.connections-pending-banner__content {
  min-width: 0;
  flex: 1;
}

.connections-pending-banner__title {
  color: #fb923c;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.2;
}

.connections-pending-banner__text {
  margin-top: 2px;
  color: #ad9b8e;
  font-size: 12px;
  line-height: 1.25;
}

.connections-pending-banner__close {
  border: 0;
  background: transparent;
  color: #c8b8ab;
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
}
</style>