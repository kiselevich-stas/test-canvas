<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

function handleChange(event) {
  emit('update:modelValue', event.target.checked)
}
</script>

<template>
  <label
      class="base-switch"
      :class="{ 'base-switch--disabled': disabled }"
  >
    <input
        class="base-switch__input"
        type="checkbox"
        :checked="modelValue"
        :disabled="disabled"
        @change="handleChange"
    >

    <span class="base-switch__track">
      <span class="base-switch__thumb" />
    </span>
  </label>
</template>

<style scoped lang="scss">
.base-switch {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 40px;
  height: 22px;
  cursor: pointer;
  user-select: none;
  flex-shrink: 0;
}

.base-switch--disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.base-switch__input {
  position: absolute;
  inset: 0;
  margin: 0;
  opacity: 0;
  cursor: inherit;
}

.base-switch__track {
  position: relative;
  width: 40px;
  height: 22px;
  border-radius: 999px;
  background: #f3f3f4;
  border: 1px solid #d7d7db;
  transition: background-color 0.2s ease, border-color 0.2s ease;
  box-sizing: border-box;
}

.base-switch__thumb {
  position: absolute;
  top: 1px;
  left: 1px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #cfcfd4;
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.base-switch__input:checked + .base-switch__track {
  background: #eaf3ff;
  border-color: #3b82f6;
}

.base-switch__input:checked + .base-switch__track .base-switch__thumb {
  transform: translateX(18px);
  background: #1677ff;
}

.base-switch__input:focus-visible + .base-switch__track {
  box-shadow: 0 0 0 3px rgba(22, 119, 255, 0.12);
}
</style>