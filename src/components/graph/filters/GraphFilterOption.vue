<script setup lang="ts">
const props = withDefaults(defineProps<{
  label: string
  value: string
  active?: boolean
  color?: string
  withCheck?: boolean
}>(), {
  active: false,
  color: '',
  withCheck: false,
})
</script>

<template>
  <button
      type="button"
      class="graph-filter-option"
      :class="{ 'graph-filter-option--active': active }"
  >
    <span v-if="withCheck" class="graph-filter-option__check">
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <path
            d="M3.5 8.5L6.5 11.5L12.5 5.5"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.6"
        />
      </svg>
    </span>

    <span
        v-else-if="color"
        class="graph-filter-option__dot"
        :style="{ backgroundColor: color }"
    />

    <span class="graph-filter-option__label">
      {{ label }}
    </span>
  </button>
</template>

<style scoped>
.graph-filter-option {
  width: 100%;
  min-height: 28px;
  border: none;
  border-radius: 10px;
  background: transparent;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  cursor: pointer;
  text-align: left;
}

.graph-filter-option--active {
  background: #ffffff;
}

.graph-filter-option__check {
  width: 14px;
  height: 14px;
  flex: none;
  color: #2f2f35;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.graph-filter-option__check svg {
  width: 14px;
  height: 14px;
}

.graph-filter-option__dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex: none;
}

.graph-filter-option__label {
  color: #2f2f35;
  font-size: 11px;
  font-weight: 400;
  line-height: 1.2;
}
</style>