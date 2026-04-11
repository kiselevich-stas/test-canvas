<script setup>
import { computed } from 'vue'
import { useGraphStore } from '../../store/graphStore'

const graphStore = useGraphStore()

/**
 * Двусторонняя модель поля поиска, привязанная к Pinia-стору.
 */
const search = computed({
  get: () => graphStore.filters.search,
  set: (value) => graphStore.setSearch(value),
})
</script>

<template>
  <div class="sidebar-search">
    <img src="/assets/icons/search.svg" alt="search" class="search-icon" />
    <input
      v-model="search"
      type="text"
      placeholder="Поиск..."
      class="search-input"
    />
  </div>
</template>

<style scoped>
.sidebar-search {
  height: 34px;
  margin-bottom: 8px;
  border-radius: 12px;
  background: #F9F9F9;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 12px;
}

.search-input {
  border: none;
  outline: none;
  background: transparent;
  width: 100%;
  font-size: 14px;
  color: #131313;
}

.search-input::placeholder {
  color: #9a9a9a;
}
</style>
