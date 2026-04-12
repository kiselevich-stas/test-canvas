<script setup lang="ts">
interface Props {
  value: string
  label: string
  modelValue: string
}

defineProps<Props>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <label class="settings-privacy-option">
    <input
        class="settings-privacy-option__input"
        type="radio"
        :value="value"
        :checked="modelValue === value"
        @change="$emit('update:modelValue', value)"
    >

    <span class="settings-privacy-option__radio" />

    <span class="settings-privacy-option__label">
      {{ label }}
    </span>
  </label>
</template>

<style scoped lang="scss">
.settings-privacy-option {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.settings-privacy-option__input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.settings-privacy-option__radio {
  position: relative;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #e3e3e6;
  border: 1px solid #e3e3e6;
  flex: 0 0 16px;
}

.settings-privacy-option__input:checked + .settings-privacy-option__radio {
  border-color: #1677ff;
  background: #ffffff;
}

.settings-privacy-option__input:checked + .settings-privacy-option__radio::after {
  content: '';
  position: absolute;
  inset: 3px;
  border-radius: 50%;
  background: #1677ff;
}

.settings-privacy-option__label {
  color: #2a2a31;
  font-size: 14px;
  line-height: 18px;
}
</style>