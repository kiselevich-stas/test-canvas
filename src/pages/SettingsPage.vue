<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import BaseSection from "@/components/common/BaseSection.vue";
import UiButton from "@/components/ui/UiButton.vue";
import SettingsNotificationsCard from "@/components/settings/SettingsNotificationsCard.vue";
import SettingsPrivacyCard from "@/components/settings/SettingsPrivacyCard.vue";
import { useSettingsStore} from "@/store/settingsStore";
import { useToastStore} from "@/store/toast";
import type { SettingsNotificationKey, SettingsPrivacyValue} from "@/types/settings";

const settingsStore = useSettingsStore()
const toastStore = useToastStore()

const {
  notifications,
  privacy,
  privacyOptions,
  isLoading,
  isSaving,
  hasChanges,
} = storeToRefs(settingsStore)

function handleToggleNotification(key: SettingsNotificationKey, value: boolean): void {
  settingsStore.setNotificationEnabled(key, value)
}

function handlePrivacyChange(value: SettingsPrivacyValue): void {
  settingsStore.setPrivacy(value)
}

async function handleSave(): Promise<void> {
  try {
    await settingsStore.saveSettings()

    toastStore.show({
      type: 'success',
      title: 'Настройки сохранены',
      message: 'Изменения успешно применены',
      duration: 3500,
      closable: true,
    })
  } catch (error) {
    toastStore.showError(error, {
      title: 'Ошибка сохранения',
      fallbackMessage: 'Не удалось сохранить настройки',
    })
  }
}

onMounted(async () => {
  await settingsStore.loadSettings()
})

onBeforeUnmount(() => {
  toastStore.clear()
})
</script>

<template>
  <BaseSection class="settings-page">
    <div class="settings-page__header">
      <div class="settings-page__header-content">
        <h1 class="settings-page__title">
          Настройки
        </h1>

        <div class="settings-page__subtitle">
          Управление параметрами платформы
        </div>
      </div>

      <UiButton
          theme="primary"
          size="sm"
          :disabled="isLoading || isSaving || !hasChanges"
          :loading="isSaving"
          @click="handleSave"
      >
        Сохранить
      </UiButton>
    </div>

    <div class="settings-page__content">
      <SettingsNotificationsCard
          :items="notifications"
          @toggle="handleToggleNotification"
      />

      <SettingsPrivacyCard
          :model-value="privacy"
          :options="privacyOptions"
          @update:modelValue="handlePrivacyChange"
      />
    </div>
  </BaseSection>
</template>

<style scoped lang="scss">
.settings-page {
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.settings-page__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
}

.settings-page__title {
  margin: 0;
  color: #1f1f24;
  font-size: 28px;
  font-weight: 700;
  line-height: 32px;
}

.settings-page__subtitle {
  margin-top: 4px;
  color: #91919a;
  font-size: 14px;
  line-height: 18px;
}

.settings-page__content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.settings-page__hint {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  width: min(100%, 490px);
  margin: auto auto 0;
  padding: 12px 14px;
  border-radius: 12px;
  background: #dff4e8;
  border: 1px solid #cbead8;
}

.settings-page__hint-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 18px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1.5px solid #21a366;
  color: #21a366;
  font-size: 11px;
  line-height: 1;
  margin-top: 2px;
}

.settings-page__hint-content {
  flex: 1;
  min-width: 0;
}

.settings-page__hint-title {
  color: #17a34a;
  font-size: 13px;
  font-weight: 700;
  line-height: 16px;
}

.settings-page__hint-text {
  margin-top: 2px;
  color: #8a8d93;
  font-size: 12px;
  line-height: 16px;
}

.settings-page__hint-close {
  flex: 0 0 auto;
  border: none;
  background: transparent;
  color: #a6aaa9;
  cursor: pointer;
  font-size: 12px;
  line-height: 1;
  margin-top: 2px;
}

@media (max-width: 768px) {
  .settings-page__header {
    flex-direction: column;
    align-items: stretch;
  }

  .settings-page__hint {
    width: 100%;
  }
}
</style>