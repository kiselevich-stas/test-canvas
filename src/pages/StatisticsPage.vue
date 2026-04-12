<script setup>
import { storeToRefs } from 'pinia'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart, BarChart, PieChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components'
import VChart from 'vue-echarts'
import { useStatisticsStore } from '@/store/statisticStore.js'

import BaseCard from '@/components/common/BaseCard.vue'
import BaseSection from '@/components/common/BaseSection.vue'
import StatisticsHeader from '@/components/statistics/StatisticsHeader.vue'
import StatisticsOverviewCards from '@/components/statistics/StatisticsOverviewCards.vue'
import StatisticsStatusesCard from '@/components/statistics/StatisticsStatusesCard.vue'
import StatisticsTransactionsCard from '@/components/statistics/StatisticsTransactionsCard.vue'
import StatisticsTopMerchantsCard from "@/components/statistics/StatisticsTopMerchantsCard.vue";

use([
  CanvasRenderer,
  LineChart,
  BarChart,
  PieChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
])

const statisticsStore = useStatisticsStore()

const {
  overviewCards,
  nodeStatuses,
  lineChartOption,
  donutChartOption,
  merchantsChartOption,
} = storeToRefs(statisticsStore)
</script>

<template>
  <BaseSection class="statistics-page">
    <StatisticsHeader />

    <StatisticsOverviewCards :cards="overviewCards" />

    <section class="statistics-page__charts statistics-page__charts--top">
      <StatisticsTransactionsCard :chart-option="lineChartOption" />

      <StatisticsStatusesCard
          :chart-option="donutChartOption"
          :statuses="nodeStatuses"
      />
    </section>

    <section class="statistics-page__charts">
      <StatisticsTopMerchantsCard :chart-option="merchantsChartOption"  :merchants="topMerchants" />
    </section>
  </BaseSection>
</template>

<style scoped>
.statistics-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: 100%;
}

.statistics-page__charts {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 16px;
}

.statistics-page__charts--top {
  grid-template-columns: minmax(0, 2fr) minmax(320px, 1fr);
}

.chart {
  width: 100%;
}

.chart--bar {
  height: 320px;
}

@media (max-width: 1200px) {
  .statistics-page__charts--top {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .chart--bar {
    height: 280px;
  }
}
</style>