<script setup lang="ts">
import DetailsDescriptionCard from './DetailsDescriptionCard.vue'
import DetailsReputationCard from './DetailsReputationCard.vue'
import DetailsMetricsGrid from './DetailsMetricsGrid.vue'

defineProps<{
  description?: string
  contacts: string[]
  reputation?: {
    label: string
    value: number
  }
  metrics: Array<{
    label: string
    value: string
    icon?: string
  }>
}>()
</script>

<template>
  <div class="details-stack">
    <DetailsDescriptionCard
        :description="description"
        :contacts="contacts"
    />

    <DetailsReputationCard :reputation="reputation" />

    <DetailsMetricsGrid :metrics="metrics" />
  </div>
</template>

<style scoped>
.details-stack {
  display: grid;
  gap: 18px;
}
</style>