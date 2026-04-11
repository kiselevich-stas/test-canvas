<script setup lang="ts">
import { computed } from 'vue'
import GraphFilterSection from './GraphFilterSection.vue'
import GraphFilterOption from './GraphFilterOption.vue'
import GraphFilterSwitch from './GraphFilterSwitch.vue'

export type FilterOption = {
  label: string
  value: string
  color?: string
}

const props = defineProps<{
  participantTypes: FilterOption[]
  statuses: FilterOption[]
  selectedParticipantType: string | null
  selectedStatus: string | null
  alertsOnly: boolean
}>()

const emit = defineEmits<{
  'update:selectedParticipantType': [value: string | null]
  'update:selectedStatus': [value: string | null]
  'update:alertsOnly': [value: boolean]
  reset: []
}>()

const selectedParticipantLabel = computed(() => {
  return props.participantTypes.find(item => item.value === props.selectedParticipantType)?.label || 'Все типы'
})

const selectedStatusLabel = computed(() => {
  return props.statuses.find(item => item.value === props.selectedStatus)?.label || 'Все статусы'
})

function selectParticipantType(value: string | null) {
  emit('update:selectedParticipantType', value)
}

function selectStatus(value: string | null) {
  emit('update:selectedStatus', value)
}

function updateAlertsOnly(value: boolean) {
  emit('update:alertsOnly', value)
}

function resetFilters() {
  emit('reset')
}
</script>

<template>
  <aside class="graph-filters-panel">
    <GraphFilterSection title="Тип участника">
      <div class="graph-filters-panel__group">
        <GraphFilterOption
            :label="selectedParticipantLabel"
            value="all"
            :active="selectedParticipantType === null"
            with-check
            @click="selectParticipantType(null)"
        />

        <GraphFilterOption
            v-for="type in participantTypes"
            :key="type.value"
            :label="type.label"
            :value="type.value"
            :active="selectedParticipantType === type.value"
            :color="type.color"
            @click="selectParticipantType(type.value)"
        />
      </div>
    </GraphFilterSection>

    <GraphFilterSection title="Статус">
      <div class="graph-filters-panel__group">
        <GraphFilterOption
            :label="selectedStatusLabel"
            value="all"
            :active="selectedStatus === null"
            with-check
            @click="selectStatus(null)"
        />

        <GraphFilterOption
            v-for="status in statuses"
            :key="status.value"
            :label="status.label"
            :value="status.value"
            :active="selectedStatus === status.value"
            :color="status.color"
            @click="selectStatus(status.value)"
        />
      </div>
    </GraphFilterSection>

    <div class="graph-filters-panel__bottom">
      <GraphFilterSwitch
          label="Только с алертами"
          :model-value="alertsOnly"
          @update:model-value="updateAlertsOnly"
      />

      <button class="graph-filters-panel__reset" type="button" @click="resetFilters">
        Сбросить фильтры
      </button>
    </div>
  </aside>
</template>

<style scoped>
.graph-filters-panel {
  width: 100%;
  max-width: 156px;
  padding: 12px;
  border-radius: 16px;
  background: #f4f4f6;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.graph-filters-panel__group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.graph-filters-panel__bottom {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding-top: 2px;
}

.graph-filters-panel__reset {
  border: none;
  background: transparent;
  color: #2f2f35;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.2;
  cursor: pointer;
  padding: 0;
  text-align: center;
}

.graph-filters-panel__reset:hover {
  opacity: 0.7;
}
</style>