<script setup lang="ts">
import type { ConnectionItem} from "@/types/connections";
import ConnectionRow from "@/components/connections/ConnectionRow.vue";
import ConnectionsRowSkeleton from "@/components/connections/ConnectionsRowSkeleton.vue";

defineProps<{
  items: ConnectionItem[]
  isLoading?: boolean
  skeletonRows?: Array<{ id: string }>
}>()
</script>

<template>
  <div class="connections-list">
    <template v-if="isLoading">
      <ConnectionsRowSkeleton
          v-for="row in skeletonRows"
          :key="row.id"
      />
    </template>

    <template v-else>
      <ConnectionRow
          v-for="item in items"
          :key="item.id"
          :item="item"
      />
    </template>
  </div>
</template>

<style scoped lang="scss">
.connections-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>