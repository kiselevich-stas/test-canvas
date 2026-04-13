<script setup lang="ts">
const props = withDefaults(
    defineProps<{
      modelValue?: string
      type?: string
      placeholder?: string
      disabled?: boolean
      label?: string
      name?: string
    }>(),
    {
      modelValue: '',
      type: 'text',
      placeholder: '',
      disabled: false,
      label: '',
      name: '',
    },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  blur: [event: FocusEvent]
}>()

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

function handleBlur(event: FocusEvent) {
  emit('blur', event)
}
</script>

<template>
  <label class="ui-input">
    <span v-if="label" class="ui-input__label">
      {{ label }}
    </span>

    <input
        :name="name"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        class="ui-input__field"
        @input="handleInput"
        @blur="handleBlur"
    >
  </label>
</template>

<style scoped lang="scss">
.ui-input {
  display: grid;
  gap: 6px;
  width: 100%;
}

.ui-input__label {
  font-size: 12px;
  line-height: 16px;
  font-weight: 400;
  color: #8f8f95;
}

.ui-input__field {
  width: 100%;
  height: 36px;
  padding: 8px 10px;
  border-radius: 8px;
  border: none;
  background: #ffffff;
  box-sizing: border-box;
  outline: none;
  font: inherit;
  font-size: 14px;
  line-height: 20px;
  color: #131313;
  transition:
      border-color 0.18s ease,
      box-shadow 0.18s ease,
      background-color 0.18s ease;
}

.ui-input__field::placeholder {
  color: #b7b7c0;
}

.ui-input__field:focus {
  border-color: #8bbcff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.ui-input__field:disabled {
  background: #f3f4f6;
  color: #9ca3af;
  cursor: not-allowed;
}
</style>