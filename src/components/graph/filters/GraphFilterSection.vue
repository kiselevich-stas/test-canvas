<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <section class="graph-filter-section">
    <div class="graph-filter-section__title">
      {{ title }}
    </div>

    <div class="graph-filter-section__content">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.graph-filter-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.graph-filter-section__title {
  color: #a0a0ab;
  font-size: 10px;
  font-weight: 500;
  line-height: 1.2;
}

.graph-filter-section__content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>