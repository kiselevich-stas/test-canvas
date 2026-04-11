<script setup lang="ts">
defineProps<{
  label: string
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

function toggle() {
  emit('update:modelValue', !__props.modelValue)
}
</script>

<template>
  <button type="button" class="graph-filter-switch" @click="toggle">
    <span class="graph-filter-switch__label">
      {{ label }}
    </span>

    <span
        class="graph-filter-switch__control"
        :class="{ 'graph-filter-switch__control--active': modelValue }"
    >
      <span class="graph-filter-switch__thumb" />
    </span>
  </button>
</template>

<style scoped>
.graph-filter-switch {
  width: 100%;
  border: none;
  background: transparent;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  cursor: pointer;
  text-align: left;
}

.graph-filter-switch__label {
  color: #7d7d88;
  font-size: 11px;
  line-height: 1.2;
}

.graph-filter-switch__control {
  position: relative;
  width: 28px;
  height: 16px;
  border-radius: 999px;
  background: #d7d7dc;
  flex: none;
  transition: background 0.2s ease;
}

.graph-filter-switch__control--active {
  background: #3b82f6;
}

.graph-filter-switch__thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #ffffff;
  transition: transform 0.2s ease;
}

.graph-filter-switch__control--active .graph-filter-switch__thumb {
  transform: translateX(12px);
}
</style>