<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import BaseSection from '@/components/common/BaseSection.vue'
import BaseCard from '@/components/common/BaseCard.vue'
import BaseSwitch from '@/components/common/BaseSwitch.vue'
import BasePagination from '@/components/common/BasePagination.vue'
import UiSelect from '@/components/ui/UiSelect.vue'

import ScamAlertsHeader from '@/components/scam-alerts/ScamAlertsHeader.vue'
import ScamAlertsStatCard from '@/components/scam-alerts/ScamAlertsStatCard.vue'
import ScamAlertsItem from '@/components/scam-alerts/ScamAlertsItem.vue'
import ScamAlertsItemSkeleton from '@/components/scam-alerts/ScamAlertsItemSkeleton.vue'

import { useScamAlertsStore } from '@/store/scamAlerts'

const scamAlertsStore = useScamAlertsStore()

const {
  paginatedItems,
  filteredItems,
  totalPages,
  currentPage,
  stats,
  isLoading,
  selectedStatus,
  selectedType,
  onlyConfirmed,
} = storeToRefs(scamAlertsStore)

const statusOptions = computed(() => [
  { label: 'Все статусы', value: 'all', dotColor: 'gray' },
  { label: 'Критический', value: 'critical', dotColor: 'red' },
  { label: 'Высокий', value: 'high', dotColor: 'orange' },
  { label: 'Средний', value: 'medium', dotColor: 'yellow' },
  { label: 'Низкий', value: 'low', dotColor: 'dark' },
])

const typeOptions = computed(() => [
  { label: 'Все типы', value: 'all', dotColor: 'gray' },
  { label: 'Фрод', value: 'fraud', dotColor: 'red' },
  { label: 'Чарджбэк', value: 'chargeback', dotColor: 'orange' },
  { label: 'Скам', value: 'scam', dotColor: 'yellow' },
  { label: 'Спор', value: 'delay', dotColor: 'orange' },
  { label: 'AML', value: 'aml', dotColor: 'dark' },
])

function handlePageChange(page: number): void {
  scamAlertsStore.setPage(page)
}

onMounted(() => {
  scamAlertsStore.fetch()
})
</script>

<template>
  <BaseSection class="scam-alerts-page">
    <ScamAlertsHeader />

    <div class="scam-alerts-page__stats">
      <ScamAlertsStatCard
          title="Критические"
          :value="stats.critical"
          trend="↗ +2 за неделю"
          accent="critical"
      />

      <ScamAlertsStatCard
          title="Высокие"
          :value="stats.high"
          trend="↗ +1 за неделю"
          accent="high"
      />

      <ScamAlertsStatCard
          title="Скам-нодов"
          :value="stats.scamNodes"
          trend="↗ +2 за неделю"
          accent="nodes"
      />

      <ScamAlertsStatCard
          title="Подозрительных"
          :value="stats.suspicious"
          trend="↗ +2 за неделю"
          accent="suspicious"
      />
    </div>

      <div class="scam-alerts-page__filters">
        <div class="scam-alerts-page__filters-left">
          <UiSelect
              v-model="selectedStatus"
              :options="statusOptions"
              placeholder="Все статусы"
          />

          <UiSelect
              v-model="selectedType"
              :options="typeOptions"
              placeholder="Все типы"
          />
        </div>

        <div class="scam-alerts-page__filters-right">
          <span class="scam-alerts-page__switch-label">
            Подтверждён сообществом
          </span>

          <BaseSwitch v-model="onlyConfirmed" />
        </div>
      </div>

    <div class="scam-alerts-page__content">
      <div
          v-if="isLoading"
          class="scam-alerts-page__list"
      >
        <ScamAlertsItemSkeleton :count="8" />
      </div>

      <div
          v-else-if="!filteredItems.length"
          class="scam-alerts-page__state"
      >
        Ничего не найдено
      </div>

      <div
          v-else
          class="scam-alerts-page__list"
      >
        <ScamAlertsItem
            v-for="item in paginatedItems"
            :key="item.id"
            :item="item"
        />
      </div>
    </div>

    <BasePagination
        :current-page="currentPage"
        :total-pages="totalPages"
        @change="handlePageChange"
    />
  </BaseSection>
</template>

<style scoped lang="scss">
.scam-alerts-page {
  display: flex;
  flex-direction: column;
  min-height: 0;

  &__stats {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 12px;
  }

  &__filters-card {
    padding: 12px;
    border-radius: 14px;
    margin-bottom: 16px;
    background: #fff;
  }

  &__filters {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }

  &__filters-left {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
  }

  &__filters-right {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-left: auto;
    flex-shrink: 0;
  }

  &__switch-label {
    font-size: 14px;
    line-height: 20px;
    color: #3d3d3d;
    white-space: nowrap;
  }

  &__content {
    min-height: 0;
    flex: 1;
    overflow: auto;
    padding-right: 4px;
  }

  &__list {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-radius: 12px;
    background: #fff;
  }

  &__state {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 220px;
    padding: 40px 16px;
    text-align: center;
    color: #8a8a8a;
    font-size: 14px;
    border-radius: 12px;
    background: #fff;
  }
}

@media (max-width: 1100px) {
  .scam-alerts-page {
    &__stats {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    &__filters {
      flex-direction: column;
      align-items: stretch;
    }

    &__filters-left {
      width: 100%;
      flex-wrap: wrap;
    }

    &__filters-right {
      width: 100%;
      margin-left: 0;
      justify-content: space-between;
    }
  }
}

@media (max-width: 640px) {
  .scam-alerts-page {
    &__stats {
      grid-template-columns: 1fr;
    }

    &__filters-left {
      flex-direction: column;
      align-items: stretch;
    }

    &__switch-label {
      font-size: 13px;
    }
  }
}
</style>