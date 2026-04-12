<script setup>
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import GraphFiltersPanel from './GraphFiltersPanel.vue'
import { useGraphStore } from '@/store/graphStore'

const graphStore = useGraphStore()
const { selectedNode } = storeToRefs(graphStore)

const isOpen = ref(false)

const isDrawerOpen = computed(() => !!selectedNode.value)

function toggle() {
  isOpen.value = !isOpen.value
}

function close() {
  isOpen.value = false
}
</script>

<template>
  <div
      class="graph-filters-widget"
      :class="{
      'graph-filters-widget--shifted': isDrawerOpen,
    }"
  >
    <button
        type="button"
        class="graph-filters-widget__trigger"
        aria-label="Открыть фильтры"
        @click="toggle"
    >
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <path
            d="M7 4V12"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-width="1.6"
        />
        <path
            d="M13 8V16"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-width="1.6"
        />
        <circle cx="7" cy="14" r="2.2" fill="none" stroke="currentColor" stroke-width="1.6" />
        <circle cx="13" cy="6" r="2.2" fill="none" stroke="currentColor" stroke-width="1.6" />
      </svg>
    </button>

    <transition name="graph-filters-widget-fade">
      <GraphFiltersPanel v-if="isOpen" @close="close" />
    </transition>
  </div>
</template>

<style scoped>
.graph-filters-widget {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 20;
  transition: right 0.22s ease;
}

/* когда открыт drawer */
.graph-filters-widget--shifted {
  right: 360px;
}

.graph-filters-widget__trigger {
  width: 26px;
  height: 26px;
  border: none;
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.92);
  color: #6f6f79;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.06);
  cursor: pointer;
  transition: background 0.18s ease, color 0.18s ease, box-shadow 0.18s ease;
}

.graph-filters-widget__trigger:hover {
  background: #ffffff;
  color: #2f2f35;
}

.graph-filters-widget__trigger svg {
  width: 14px;
  height: 14px;
}

.graph-filters-widget-fade-enter-active,
.graph-filters-widget-fade-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.graph-filters-widget-fade-enter-from,
.graph-filters-widget-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>