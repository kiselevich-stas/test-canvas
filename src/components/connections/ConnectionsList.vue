<script setup lang="ts">
import ConnectionRow from './ConnectionRow.vue'
import type { ConnectionItem } from '@/stores/connectionsStore'

defineProps<{
  items: ConnectionItem[]
}>()
</script>

<template>
  <div class="connections-list">
    <ConnectionRow
        v-for="item in items"
        :key="item.id"
        :item="item"
    />
  </div>
</template>

<style scoped>
.connections-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
</style>