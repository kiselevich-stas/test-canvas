<script setup lang="ts">
import SettingsPrivacyOption from "@/components/settings/SettingsPrivacyOption.vue";
import type { PrivacyOptionItem, SettingsPrivacyValue} from "@/types/settings";

interface Props {
  modelValue: SettingsPrivacyValue
  options: PrivacyOptionItem[]
}

defineProps<Props>()

defineEmits<{
  'update:modelValue': [value: SettingsPrivacyValue]
}>()
</script>

<template>
  <section class="settings-card">
    <div class="settings-card__title">
      Приватность
    </div>

    <div class="settings-card__description">
      Кто может видеть ваш профиль
    </div>

    <div class="settings-card__options">
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
  padding: 14px;
  border-radius: 16px;
  background: #f3f3f4;
  border: 1px solid #ececf0;
}

.settings-card__title {
  color: #1f1f24;
  font-size: 15px;
  font-weight: 700;
  line-height: 18px;
}

.settings-card__description {
  margin-top: 4px;
  color: #9b9ca4;
  font-size: 12px;
  line-height: 15px;
}

.settings-card__options {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 14px;
}
</style>