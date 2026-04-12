<script setup lang="ts">
interface Props {
  currentPage: number
  totalPages: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  change: [page: number]
}>()

function goToPage(page: number): void {
  if (page < 1 || page > props.totalPages || page === props.currentPage) {
    return
  }

  emit('change', page)
}
</script>

<template>
  <div
      v-if="totalPages > 1"
      class="connections-pagination"
  >
    <button
        type="button"
        class="connections-pagination__button"
        :disabled="currentPage === 1"
        @click="goToPage(currentPage - 1)"
    >
      Назад
    </button>

    <div class="connections-pagination__pages">
      <button
          v-for="page in totalPages"
          :key="page"
          type="button"
          class="connections-pagination__page"
          :class="{ 'connections-pagination__page--active': page === currentPage }"
          @click="goToPage(page)"
      >
        {{ page }}
      </button>
    </div>

    <button
        type="button"
        class="connections-pagination__button"
        :disabled="currentPage === totalPages"
        @click="goToPage(currentPage + 1)"
    >
      Далее
    </button>
  </div>
</template>

<style scoped lang="scss">
.connections-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 16px 0 4px;
}

.connections-pagination__pages {
  display: flex;
  align-items: center;
  gap: 8px;
}

.connections-pagination__button,
.connections-pagination__page {
  height: 36px;
  min-width: 36px;
  padding: 0 12px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background: #ffffff;
  color: #1f1f24;
  font-size: 14px;
  cursor: pointer;
  transition:
      background-color 0.2s ease,
      border-color 0.2s ease,
      color 0.2s ease;
}

.connections-pagination__button:hover,
.connections-pagination__page:hover {
  background: #f5f7fb;
}

.connections-pagination__button:disabled {
  opacity: 0.5;
  cursor: default;
}

.connections-pagination__page--active {
  border-color: #1677ff;
  background: #1677ff;
  color: #ffffff;
}
</style>