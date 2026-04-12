<script setup lang="ts">
import SettingsNotificationRow from "@/components/settings/SettingsNotificationRow.vue";
import type { NotificationSettingItem, SettingsNotificationKey} from "@/types/settings";

interface Props {
  items: NotificationSettingItem[]
}

defineProps<Props>()

const emit = defineEmits<{
  toggle: [key: SettingsNotificationKey, value: boolean]
}>()

function handleToggle(key: SettingsNotificationKey, value: boolean): void {
  emit('toggle', key, value)
}
</script>

<template>
  <section class="settings-card">
    <div class="settings-card__title">
      Уведомления
    </div>

    <div class="settings-card__description">
      Настройте когда получать алерты
    </div>

    <div class="settings-card__grid">
      <SettingsNotificationRow
          v-for="item in items"
          :key="item.key"
          :title="item.title"
          :description="item.description"
          :model-value="item.enabled"
          @update:modelValue="handleToggle(item.key, $event)"
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

.settings-card__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 12px;
}

@media (max-width: 900px) {
  .settings-card__grid {
    grid-template-columns: 1fr;
  }
}
</style>