<script setup>
import BaseSwitch from "@/components/common/BaseSwitch.vue";

defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  modelValue: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="settings-notification-row">
    <div class="settings-notification-row__content">
      <div class="settings-notification-row__title">
        {{ title }}
      </div>

      <div class="settings-notification-row__description">
        {{ description }}
      </div>
    </div>

    <BaseSwitch
        :model-value="modelValue"
        @update:modelValue="$emit('update:modelValue', $event)"
    />
  </div>
</template>

<style scoped lang="scss">
.settings-notification-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-height: 42px;
  padding: 8px 10px;
  border-radius: 10px;
  background: #f7f7f8;
}

.settings-notification-row__content {
  min-width: 0;
}

.settings-notification-row__title {
  font-size: 14px;
  line-height: 18px;
  font-weight: 500;
  color: #1f1f24;
}

.settings-notification-row__description {
  margin-top: 2px;
  font-size: 12px;
  line-height: 15px;
  color: #9a9aa2;
}
</style>