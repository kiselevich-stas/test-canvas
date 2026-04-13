<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  value: {
    type: String,
    required: true
  },
  name: {
    type: String,
    default: 'base-radio'
  },
  label: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

function handleChange() {
  emit('update:modelValue', props.value)
}
</script>

<template>
  <label class="base-radio" :class="{ 'base-radio--disabled': disabled }">
    <input
        class="base-radio__input"
        type="radio"
        :name="name"
        :value="value"
        :checked="modelValue === value"
        :disabled="disabled"
        @change="handleChange"
    >

    <span class="base-radio__control" />

    <span v-if="label" class="base-radio__label">
      {{ label }}
    </span>
  </label>
</template>

<style scoped lang="scss">
.base-radio {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  user-select: none;
}

.base-radio--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.base-radio__input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.base-radio__control {
  position: relative;
  width: 16px;
  height: 16px;
  flex: 0 0 16px;
  border-radius: 50%;
  border: 1.5px solid #d8d8dd;
  background: #fff;
  box-sizing: border-box;
  transition: border-color 0.2s ease;
}

.base-radio__control::after {
  content: '';
  position: absolute;
  inset: 3px;
  border-radius: 50%;
  background: #007BFF;
  transform: scale(0);
  transition: transform 0.2s ease;
}

.base-radio__input:checked + .base-radio__control {
  border-color: #007BFF;
}

.base-radio__input:checked + .base-radio__control::after {
  transform: scale(1);
}

.base-radio__label {
  font-size: 14px;
  line-height: 18px;
  color: #1f1f24;
}
</style>