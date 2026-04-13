<script setup>
import BaseRadio from "@/components/common/BaseRadio.vue";

defineProps({
  value: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  modelValue: {
    type: String,
    default: ''
  }
})

defineEmits(['update:modelValue'])
</script>

<template>
  <BaseRadio
      :value="value"
      :label="label"
      :model-value="modelValue"
      name="settings-privacy"
      @update:modelValue="$emit('update:modelValue', $event)"
  />
</template>