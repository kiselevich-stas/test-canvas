<script setup lang="ts">
interface Props {
  title: string
  description: string
  modelValue: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

function handleChange(event: Event): void {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.checked)
}
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

    <label class="settings-notification-row__switch">
      <input
          class="settings-notification-row__input"
          type="checkbox"
          :checked="modelValue"
          @change="handleChange"
      >

      <span class="settings-notification-row__slider" />
    </label>
  </div>
</template>

<style scoped lang="scss">
.settings-notification-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-height: 56px;
  padding: 8px 10px;
  border-radius: 12px;
  background: #f7f7f8;
  border: 1px solid #ececf0;
}

.settings-notification-row__content {
  min-width: 0;
}

.settings-notification-row__title {
  color: #1f1f24;
  font-size: 14px;
  font-weight: 600;
  line-height: 18px;
}

.settings-notification-row__description {
  margin-top: 2px;
  color: #9c9ca4;
  font-size: 12px;
  line-height: 15px;
}

.settings-notification-row__switch {
  position: relative;
  flex: 0 0 auto;
  width: 38px;
  height: 22px;
  cursor: pointer;
}

.settings-notification-row__input {
  position: absolute;
  inset: 0;
  opacity: 0;
  pointer-events: none;
}

.settings-notification-row__slider {
  position: absolute;
  inset: 0;
  border-radius: 999px;
  background: #dddddf;
  transition: background-color 0.2s ease;
}

.settings-notification-row__slider::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 0 1px 3px rgba(31, 31, 36, 0.16);
  transition: transform 0.2s ease;
}

.settings-notification-row__input:checked + .settings-notification-row__slider {
  background: #1677ff;
}

.settings-notification-row__input:checked + .settings-notification-row__slider::after {
  transform: translateX(16px);
}
</style>