<script setup lang="ts">
import { storeToRefs } from 'pinia'
import ConnectionsHeader from '@/components/connections/ConnectionsHeader.vue'
import ConnectionsTabs from '@/components/connections/ConnectionsTabs.vue'
import ConnectionsList from "@/components/connections/ConnectionsList.vue";
import ConnectionsPendingBanner from "@/components/connections/ConnectionsPendingBanner.vue";
import { useConnectionsStore} from "@/store/connectionsStore";

const connectionsStore = useConnectionsStore()

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
</script>

<template>
  <section class="connections-page">
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

    <div class="connections-page__banner">
      <ConnectionsPendingBanner :pending-count="pendingCount" />
    </div>
  </section>
</template>

<style scoped>
.connections-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 14px 16px 12px;
  background: #f2f2f4;
  border-radius: 16px;
  overflow: hidden;
}

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

.connections-page__banner {
  display: flex;
  justify-content: center;
}
</style>