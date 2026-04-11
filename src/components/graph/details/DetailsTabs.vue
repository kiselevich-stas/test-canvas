<script setup lang="ts">
defineProps<{
  tabs: Array<{
    id: string
    label: string
    count: number | null
  }>
  activeTab: string
}>()

const emit = defineEmits<{
  change: [value: string]
}>()
</script>

<template>
  <div class="details-tabs">
    <button
        v-for="tab in tabs"
        :key="tab.id"
        type="button"
        class="details-tab"
        :class="{ 'details-tab--active': activeTab === tab.id }"
        @click="emit('change', tab.id)"
    >
      <span>{{ tab.label }}</span>

      <span v-if="tab.count" class="details-tab__count">
        {{ tab.count }}
      </span>
    </button>
  </div>
</template>

<style scoped>
.details-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 14px;
}

.details-tab {
  min-height: 40px;
  padding: 0 14px;
  border: 0;
  border-radius: 14px;
  background: #e1e1e6;
  color: #4b5563;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 500;
}

.details-tab--active {
  background: #ffffff;
  color: #111827;
  font-weight: 700;
}

.details-tab__count {
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: 999px;
  background: rgba(141, 151, 168, 0.16);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #4b5563;
  font-size: 12px;
  line-height: 1;
}
</style>