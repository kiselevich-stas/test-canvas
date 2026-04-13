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
  width: 50px;
  height: 22px;
  flex-shrink: 0;
  cursor: pointer;
  user-select: none;
}

.base-switch--disabled {
  opacity: 0.5;
  cursor: not-allowed;
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
  width: 50px;
  height: 22px;
  border-radius: 100px;
  background: #d9d9d9;
  transition: background-color 0.2s ease, box-shadow 0.2s ease;
}

.base-switch__thumb {
  position: absolute;
  top: 1.5px;
  left: 1.5px;
  width: 30px;
  height: 19px;
  border-radius: 78px;
  background: #ffffff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.16);
  transition: transform 0.2s ease;
}

.base-switch__input:checked + .base-switch__track {
  background: #007BFF;
}

.base-switch__input:checked + .base-switch__track .base-switch__thumb {
  transform: translateX(17px);
}

.base-switch__input:focus-visible + .base-switch__track {
  box-shadow: 0 0 0 3px rgba(24, 119, 242, 0.14);
}
</style>