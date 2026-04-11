<script setup lang="ts">
import { computed } from 'vue'

import UiDrawer from '@/components/ui/UiDrawer.vue'
import DetailsHeader from "@/components/graph/details/DetailsHeader.vue";
import DetailsTabs from "@/components/graph/details/DetailsTabs.vue";
import DetailsInfoTab from "@/components/graph/details/DetailsInfoTab.vue";
import DetailsConnectionsTab from "@/components/graph/details/DetailsConnectionsTab.vue";
import DetailsAlertsTab from "@/components/graph/details/DetailsAlertsTab.vue";
import DetailsFooterActions from "@/components/graph/details/DetailsFooterActions.vue";
import DetailsNodeStatusBar from "@/components/graph/details/DetailsNodeStatusBar.vue";

type Metric = {
  label: string
  value: string
  icon?: string
}

type Relation = {
  name: string
  role: string
  initials: string
  status: string
  tone: string
}

type Alert = {
  title: string
  date: string
  text: string
}

type ContactNodeMeta = {
  shortName?: string
  typeLabel?: string
  statusTag?: string
  statusScore?: number
  statusLabel?: string
  description?: string
  contacts?: string[]
  reputation?: {
    label: string
    value: number
  }
  metrics?: Metric[]
  relations?: Relation[]
  alerts?: Alert[]
}

const props = defineProps<{
  modelValue: boolean
  node: {
    label?: string
    type?: string
    status?: string
    meta?: ContactNodeMeta
  } | null
  activeTab: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'update:activeTab': [value: string]
  close: []
}>()

const tabs = computed(() => {
  const relationsCount = props.node?.meta?.relations?.length || 0
  const alertsCount = props.node?.meta?.alerts?.length || 0

  return [
    { id: 'info', label: 'Инфо', count: null },
    { id: 'connections', label: 'Связи', count: relationsCount || null },
    { id: 'alerts', label: 'Алерты', count: alertsCount || null },
  ]
})

function closeDrawer() {
  emit('update:modelValue', false)
  emit('close')
}
</script>

<template>
  <UiDrawer
      :model-value="modelValue"
      width="360px"
      @update:model-value="emit('update:modelValue', $event)"
      @close="closeDrawer"
  >
    <template #header>
      <DetailsHeader :node="node" />
    </template>

    <template v-if="node">
      <DetailsNodeStatusBar
          :status="node?.status || 'unknown'"
          :status-label="node?.meta?.statusLabel || node?.status || 'unknown'"
          :score="node?.meta?.statusScore ?? 0"
      />
      <DetailsTabs
          :tabs="tabs"
          :active-tab="activeTab"
          @change="emit('update:activeTab', $event)"
      />

      <DetailsInfoTab
          v-if="activeTab === 'info'"
          :description="node.meta?.description"
          :contacts="node.meta?.contacts || []"
          :reputation="node.meta?.reputation"
          :metrics="node.meta?.metrics || []"
      />

      <DetailsConnectionsTab
          v-else-if="activeTab === 'connections'"
          :relations="node.meta?.relations || []"
      />

      <DetailsAlertsTab
          v-else
          :alerts="node.meta?.alerts || []"
      />
    </template>

    <template #footer>
      <DetailsFooterActions />
    </template>
  </UiDrawer>
</template>