<script setup lang="ts">
import { storeToRefs } from 'pinia'
import UiDrawer from '@/components/ui/UiDrawer.vue'
import { useNotificationStore } from '@/store/notificationStore.js'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const notificationStore = useNotificationStore()

const {
  notifications,
  unreadCount,
} = storeToRefs(notificationStore)

function handleClose(value) {
  emit('update:modelValue', value)
}

function handleReadAll() {
  notificationStore.markAllAsRead()
}
</script>

<template>
  <UiDrawer
      :model-value="modelValue"
      title="Уведомления"
      width="360px"
      :overlay="true"
      @update:modelValue="handleClose"
  >
    <div class="notifications">
      <div class="notifications__subtitle">
        {{ unreadCount }} непрочитанных
      </div>

      <div
          v-for="item in notifications"
          :key="item.id"
          class="notification-item"
          :class="{ 'notification-item--read': item.read }"
      >
        <div class="notification-item__title">
          {{ item.title }}
        </div>

        <div class="notification-item__desc">
          {{ item.description }}
        </div>

        <div class="notification-item__time">
          {{ item.time }}
        </div>
      </div>
    </div>

    <template #footer>
      <button
          class="notifications__read-all"
          type="button"
          @click="handleReadAll"
      >
        Прочитать все
      </button>
    </template>
  </UiDrawer>
</template>

<style scoped lang="scss">
.notifications {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.notifications__subtitle {
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 6px;
}

.notification-item {
  padding: 10px 12px;
  border-radius: 12px;
  background: #ffffff;
}

.notification-item--read {
  opacity: 0.7;
}

.notification-item__title {
  font-size: 13px;
  font-weight: 600;
  color: #111827;
}

.notification-item__desc {
  margin-top: 4px;
  font-size: 12px;
  color: #6b7280;
}

.notification-item__time {
  margin-top: 6px;
  font-size: 11px;
  color: #9ca3af;
}

.notifications__read-all {
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  border: none;
  background: #ffffff;
  cursor: pointer;
}
</style>