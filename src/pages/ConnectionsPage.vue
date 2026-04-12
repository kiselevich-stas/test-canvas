<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { watch, onMounted } from 'vue'
import ConnectionsHeader from '@/components/connections/ConnectionsHeader.vue'
import ConnectionsTabs from '@/components/connections/ConnectionsTabs.vue'
import ConnectionsList from '@/components/connections/ConnectionsList.vue'
import { useConnectionsStore } from '@/store/connectionsStore'
import { useToastStore} from "@/store/toast";
import BaseSection from '@/components/common/BaseSection.vue'

const connectionsStore = useConnectionsStore()
const toastStore = useToastStore()

const {
  activeTab,
  counts,
  filteredItems,
  pendingCount,
} = storeToRefs(connectionsStore)

function handleTabChange(tab: 'all' | 'pending' | 'active') {
  connectionsStore.setActiveTab(tab)
}

function handleRequestConnection() {
  console.log('request connection')
}

function showPendingConnectionsToast(count: number): void {
  if (count <= 0) {
    return
  }

  toastStore.show({
    type: 'warning',
    title: `${count} запрос${getRequestsWordEnding(count)} ожида${count === 1 ? 'ет' : 'ют'} подтверждения`,
    message: 'Новые связи становятся активными только после взаимного подтверждения',
    duration: 500000,
    closable: true,
  })
}
function getRequestsWordEnding(count: number): string {
  const lastTwoDigits = count % 100
  const lastDigit = count % 10

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return 'ов'
  }

  if (lastDigit === 1) {
    return ''
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return 'а'
  }

  return 'ов'
}

onMounted(() => {
  showPendingConnectionsToast(pendingCount.value)
})

watch(pendingCount, (newValue, oldValue) => {
  if (newValue > 0 && newValue !== oldValue) {
    showPendingConnectionsToast(newValue)
  }
})
</script>

<template>
  <BaseSection class="connections-page">
    <ConnectionsHeader @request="handleRequestConnection" />

    <div class="connections-page__toolbar">
      <ConnectionsTabs
          :active-tab="activeTab"
          :counts="counts"
          @change="handleTabChange"
      />
    </div>

    <div class="connections-page__content">
      <ConnectionsList :items="filteredItems" />
    </div>
  </BaseSection>
</template>

<style scoped>
.connections-page__toolbar {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.connections-page__content {
  min-height: 0;
  flex: 1;
  overflow: auto;
  padding-right: 4px;
}
</style>