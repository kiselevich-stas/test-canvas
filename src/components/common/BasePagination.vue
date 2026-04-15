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
      class="base-pagination"
  >
    <button
        type="button"
        class="base-pagination__button"
        :disabled="currentPage === 1"
        @click="goToPage(currentPage - 1)"
    >
      Назад
    </button>

    <div class="base-pagination__pages">
      <button
          v-for="page in totalPages"
          :key="page"
          type="button"
          class="base-pagination__page"
          :class="{ 'base-pagination__page--active': page === currentPage }"
          @click="goToPage(page)"
      >
        {{ page }}
      </button>
    </div>

    <button
        type="button"
        class="base-pagination__button"
        :disabled="currentPage === totalPages"
        @click="goToPage(currentPage + 1)"
    >
      Далее
    </button>
  </div>
</template>

<style scoped lang="scss">
.base-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.base-pagination__pages {
  display: flex;
  align-items: center;
  gap: 8px;
}

.base-pagination__button,
.base-pagination__page {
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

.base-pagination__button:hover,
.base-pagination__page:hover {
  background: #f5f7fb;
}

.base-pagination__button:disabled {
  opacity: 0.5;
  cursor: default;
}

.base-pagination__page--active {
  border-color: #007BFF;
  background: #007BFF;
  color: #ffffff;
}
</style>