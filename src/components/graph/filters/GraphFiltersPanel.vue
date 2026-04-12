<script setup>
import { computed } from 'vue'
import { useGraphStore } from '@/store/graphStore.js'
import GraphFilterOption from './GraphFilterOption.vue'
import GraphFilterSwitch from './GraphFilterSwitch.vue'

const emit = defineEmits(['close'])

const graphStore = useGraphStore()

const participantTypes = [
  { label: 'Хаб', value: 'hub', color: '#8b5cf6', icon: 'hub' },
  { label: 'Процессинги', value: 'processor', color: '#24b9d7', icon: 'processor' },
  { label: 'Мерчанты', value: 'merchant', color: '#3b82f6', icon: 'merchant' },
]

const statuses = [
  { label: 'Активные', value: 'active', color: '#22c55e' },
  { label: 'Подозрительные', value: 'warning', color: '#f97316' },
  { label: 'Скам', value: 'danger', color: '#ef4444' },
  { label: 'Неактивные', value: 'unknown', color: '#8f8f8f' },
]

const selectedParticipantType = computed(() => graphStore.selectedParticipantType)
const selectedStatus = computed(() => graphStore.selectedStatus)
const alertsOnly = computed(() => graphStore.alertsOnly)

function setParticipantType(value) {
  graphStore.setParticipantTypeFilter(value)
}

function setStatus(value) {
  graphStore.setStatusFilter(value)
}

function setAlertsOnly(value) {
  graphStore.setAlertsOnlyFilter(value)
}

function resetFilters() {
  graphStore.resetFilters()
}
</script>

<template>
  <div class="graph-filters-panel">
    <button
        type="button"
        class="graph-filters-panel__close"
        aria-label="Закрыть фильтры"
        @click="emit('close')"
    >
      ×
    </button>

    <div class="graph-filters-panel__card">
      <div class="graph-filters-panel__section">
        <div class="graph-filters-panel__title">Тип участника</div>

        <GraphFilterOption
            label="Все типы"
            :active="selectedParticipantType === null"
            icon="all"
            @click="setParticipantType(null)"
        />

        <GraphFilterOption
            v-for="item in participantTypes"
            :key="item.value"
            :label="item.label"
            :active="selectedParticipantType === item.value"
            :color="item.color"
            :icon="item.icon"
            @click="setParticipantType(item.value)"
        />
      </div>

      <div class="graph-filters-panel__divider" />

      <div class="graph-filters-panel__section">
        <div class="graph-filters-panel__title">Статус</div>

        <GraphFilterOption
            label="Все статусы"
            :active="selectedStatus === null"
            icon="all"
            @click="setStatus(null)"
        />

        <GraphFilterOption
            v-for="item in statuses"
            :key="item.value"
            :label="item.label"
            :active="selectedStatus === item.value"
            :color="item.color"
            @click="setStatus(item.value)"
        />
      </div>

      <div class="graph-filters-panel__divider" />

      <div class="graph-filters-panel__bottom">
        <GraphFilterSwitch
            label="Только с алертами"
            :model-value="alertsOnly"
            @update:model-value="setAlertsOnly"
        />

        <button
            type="button"
            class="graph-filters-panel__reset"
            @click="resetFilters"
        >
          Сбросить фильтры
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.graph-filters-panel {
  position: absolute;
  top: 0;
  right: 0;
  width: 232px;
}

.graph-filters-panel__close {
  position: absolute;
  top: 0;
  right: 0;
  width: 38px;
  height: 38px;
  border: 0;
  border-radius: 11px;
  background: #f4f4f6;
  color: #111827;
  font-size: 28px;
  line-height: 1;
  cursor: pointer;
  z-index: 2;
}

.graph-filters-panel__card {
  margin-top: 42px;
  background: #f4f4f6;
  border-radius: 20px;
  padding: 14px 14px 16px;
  box-shadow: 0 2px 14px rgba(15, 23, 42, 0.04);
}

.graph-filters-panel__section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.graph-filters-panel__title {
  color: #a3a3ad;
  font-size: 12px;
  line-height: 1.25;
}

.graph-filters-panel__divider {
  height: 1px;
  background: #e7e7eb;
  margin: 12px 0;
}

.graph-filters-panel__bottom {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.graph-filters-panel__reset {
  border: 0;
  background: transparent;
  color: #111827;
  font-size: 15px;
  font-weight: 500;
  line-height: 1.2;
  cursor: pointer;
  padding: 0;
  text-align: center;
}
</style>