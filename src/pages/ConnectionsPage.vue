<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { watch, onMounted, ref } from 'vue'
import ConnectionsHeader from '@/components/connections/ConnectionsHeader.vue'
import ConnectionsTabs from '@/components/connections/ConnectionsTabs.vue'
import ConnectionsList from '@/components/connections/ConnectionsList.vue'
import ConnectionsPagination from '@/components/connections/ConnectionsPagination.vue'
import ConnectionsRequestModal from "@/components/connections/modal/ConnectionsRequestModal.vue";
import { useConnectionsStore } from '@/store/connectionsStore'
import { useToastStore } from '@/store/toast'
import BaseSection from '@/components/common/BaseSection.vue'

const connectionsStore = useConnectionsStore()
const toastStore = useToastStore()
const isInitialLoadCompleted = ref(false)

const {
  activeTab,
  counts,
  paginatedItems,
  pendingCount,
  isLoading,
  currentPage,
  totalPages,
  skeletonRows,
  items,
  isRequestModalOpen,
  isSubmittingRequest,
} = storeToRefs(connectionsStore)

function handleTabChange(tab: 'all' | 'pending' | 'active') {
  connectionsStore.setActiveTab(tab)
}

function handleRequestConnection() {
  connectionsStore.openRequestModal()
}

function handlePageChange(page: number): void {
  connectionsStore.setPage(page)
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

onMounted(async () => {
  await connectionsStore.loadConnections()
  isInitialLoadCompleted.value = true
  showPendingConnectionsToast(pendingCount.value)
})

watch(pendingCount, (newValue, oldValue) => {
  if (!isInitialLoadCompleted.value) {
    return
  }

  if (newValue > 0 && newValue !== oldValue) {
    showPendingConnectionsToast(newValue)
  }
})
function handleRequestSuccess(): void {
  toastStore.show({
    type: 'success',
    title: 'Запрос отправлен',
    message: 'Запрос на создание связи успешно отправлен',
    duration: 4000,
    closable: true,
  })
}
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
      <ConnectionsList
          :items="paginatedItems"
          :is-loading="isLoading"
          :skeleton-rows="skeletonRows"
      />
    </div>

    <ConnectionsPagination
        :current-page="currentPage"
        :total-pages="totalPages"
        @change="handlePageChange"
    />

    <ConnectionsRequestModal
        v-model="isRequestModalOpen"
        @success="handleRequestSuccess"
    />
  </BaseSection>
</template>

<style scoped lang="scss">
.connections-page {
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.connections-page__toolbar {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 12px;
}

.connections-page__content {
  min-height: 0;
  flex: 1;
  overflow: auto;
  padding-right: 4px;
}
</style>