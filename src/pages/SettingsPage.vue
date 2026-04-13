<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useSettingsStore } from '@/store/settingsStore'

import SettingsNotificationsCard from '@/components/settings/SettingsNotificationsCard.vue'
import SettingsPrivacyCard from '@/components/settings/SettingsPrivacyCard.vue'
import SettingsNotificationsSkeleton from '@/components/settings/SettingsNotificationsSkeleton.vue'
import SettingsPrivacySkeleton from '@/components/settings/SettingsPrivacySkeleton.vue'

import BaseSection from '@/components/common/BaseSection.vue'
import StatisticsHeader from '@/components/statistics/StatisticsHeader.vue'
import BaseCard from "@/components/common/BaseCard.vue";

const settingsStore = useSettingsStore()

const {
  notifications,
  privacy,
  privacyOptions,
  isLoading,
} = storeToRefs(settingsStore)

onMounted(() => {
  settingsStore.loadSettings()
})

function handleToggle(key, value) {
  settingsStore.setNotificationEnabled(key, value)
}

function handlePrivacyChange(value) {
  settingsStore.setPrivacy(value)
}
</script>

<template>
  <BaseSection class="settings-page">
    <StatisticsHeader/>

    <template v-if="isLoading">
     <BaseCard>
       <SettingsNotificationsSkeleton/>
     </BaseCard>
   <BaseCard>
     <SettingsPrivacySkeleton/>
   </BaseCard>
    </template>

    <template v-else>
    <BaseCard>
      <SettingsNotificationsCard
          :items="notifications"
          @toggle="handleToggle"
      />
    </BaseCard>

    <BaseCard>
      <SettingsPrivacyCard
          :model-value="privacy"
          :options="privacyOptions"
          @update:modelValue="handlePrivacyChange"
      />
    </BaseCard>
    </template>
  </BaseSection>
</template>

<style scoped lang="scss">
.settings-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 100%;
}
</style>