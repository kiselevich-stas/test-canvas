<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

function handleChange(event) {
  emit('update:modelValue', event.target.checked)
}
</script>

<template>
  <label
      class="ui-checkbox"
      :class="{ 'ui-checkbox--disabled': disabled }"
  >
    <input
        class="ui-checkbox__input"
        type="checkbox"
        :checked="modelValue"
        :disabled="disabled"
        @change="handleChange"
    >

    <span class="ui-checkbox__box">
      <img
          v-if="modelValue"
          class="ui-checkbox__icon"
          src="/assets/icons/check.svg"
          alt=""
      >
    </span>

    <span v-if="label" class="ui-checkbox__label">
      {{ label }}
    </span>
  </label>
</template>

<style scoped lang="scss">
.ui-checkbox {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
}

.ui-checkbox--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.ui-checkbox__input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.ui-checkbox__box {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 6px;
  border: 1px solid #d7dbe3;
  background: #ffffff;
  box-sizing: border-box;
  transition:
      background-color 0.18s ease,
      border-color 0.18s ease;
}

.ui-checkbox__input:checked + .ui-checkbox__box {
  background: #007BFF;
  border-color: #007BFF;
}

.ui-checkbox__icon {
  width: 12px;
  height: 12px;
  display: block;
}

.ui-checkbox__label {
  font-size: 14px;
  line-height: 20px;
  color: #1f1f24;
}
</style>