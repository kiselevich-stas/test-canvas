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
      <svg v-if="!isOpen" viewBox="0 0 20 20" aria-hidden="true">
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
      <svg v-else width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.4108 4.41083C14.7363 4.08539 15.2638 4.08539 15.5892 4.41083C15.9146 4.73626 15.9146 5.26377 15.5892 5.58921L11.1784 10L15.5892 14.4108L15.6462 14.4743C15.9131 14.8016 15.8943 15.2841 15.5892 15.5892C15.2841 15.8943 14.8016 15.9131 14.4743 15.6462L14.4108 15.5892L10 11.1784L5.58921 15.5892C5.26377 15.9146 4.73626 15.9146 4.41083 15.5892C4.08539 15.2638 4.08539 14.7363 4.41083 14.4108L8.82163 10L4.41083 5.58921C4.08539 5.26377 4.08539 4.73626 4.41083 4.41083C4.73626 4.08539 5.26377 4.08539 5.58921 4.41083L10 8.82163L14.4108 4.41083Z" fill="#131313"/>
      </svg>

    </button>

    <transition name="graph-filters-widget-fade">
      <GraphFiltersPanel  ref="panelRef" v-if="isOpen" @close="close" />
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
  width: 40px;
  height: 36px;
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

  z-index: 2;
  position: relative;
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