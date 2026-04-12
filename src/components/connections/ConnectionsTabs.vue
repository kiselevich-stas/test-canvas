<script setup lang="ts">
import type { ConnectionTab } from '@/stores/connectionsStore'

defineProps<{
  activeTab: ConnectionTab
  counts: {
    all: number
    pending: number
    active: number
  }
}>()

defineEmits<{
  change: [tab: ConnectionTab]
}>()

const tabs: Array<{ label: string; value: ConnectionTab; countKey: 'all' | 'pending' | 'active' }> = [
  { label: 'Все', value: 'all', countKey: 'all' },
  { label: 'Ожидание', value: 'pending', countKey: 'pending' },
  { label: 'Активные', value: 'active', countKey: 'active' },
]
</script>

<template>
  <div class="connections-tabs">
    <button
        v-for="tab in tabs"
        :key="tab.value"
        type="button"
        class="connections-tabs__item"
        :class="{ 'connections-tabs__item--active': activeTab === tab.value }"
        @click="$emit('change', tab.value)"
    >
      <span class="connections-tabs__label">{{ tab.label }}</span>
      <span class="connections-tabs__count">{{ counts[tab.countKey] }}</span>
    </button>
  </div>
</template>

<style scoped>
.connections-tabs {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px;
  background: #ededee;
  border-radius: 12px;
}

.connections-tabs__item {
  min-height: 34px;
  padding: 0 12px;
  border: 0;
  border-radius: 9px;
  background: transparent;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  color: #8a8a93;
}

.connections-tabs__item--active {
  background: #ffffff;
  color: #1f1f24;
}

.connections-tabs__label {
  font-size: 14px;
  line-height: 1;
}

.connections-tabs__count {
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
}
</style>