<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

function toggle() {
  emit('update:modelValue', !props.modelValue)
}
</script>

<template>
  <button type="button" class="graph-filter-switch" @click="toggle">
    <div class="graph-filter-switch__left">
      <img src="/assets/icons/spam.svg" alt="">

      <span class="graph-filter-switch__label">{{ label }}</span>
    </div>

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
  min-height: 36px;
  width: 100%;
  border: 0;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  cursor: pointer;
}

.graph-filter-switch__left {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.graph-filter-switch__icon {
  width: 16px;
  height: 16px;
  color: #8f8f98;
  flex: none;
}

.graph-filter-switch__label {
  color: #7b7b85;
  font-size: 14px;
  line-height: 1.25;
  text-align: left;
}

.graph-filter-switch__control {
  position: relative;
  width: 30px;
  height: 20px;
  border-radius: 999px;
  background: #d5d5da;
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
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #ffffff;
  transition: transform 0.2s ease;
}

.graph-filter-switch__control--active .graph-filter-switch__thumb {
  transform: translateX(10px);
}
</style>