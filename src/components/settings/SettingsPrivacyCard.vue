<script setup>
import SettingsPrivacyOption from '@/components/settings/SettingsPrivacyOption.vue'

defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  options: {
    type: Array,
    default: () => []
  }
})

defineEmits(['update:modelValue'])
</script>

<template>
  <section class="settings-card">
    <div class="settings-card__title">
      Приватность
    </div>

    <div class="settings-card__description">
      Кто может видеть ваш профиль
    </div>

    <div class="settings-card__list">
      <SettingsPrivacyOption
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          :label="option.label"
          :model-value="modelValue"
          @update:modelValue="$emit('update:modelValue', $event)"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
.settings-card {
}

.settings-card__title {
  font-size: 15px;
  font-weight: 700;
  line-height: 18px;
  color: #1f1f24;
}

.settings-card__description {
  margin-top: 4px;
  font-size: 12px;
  line-height: 15px;
  color: #9b9ca4;
}

.settings-card__list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 14px;
}
</style>