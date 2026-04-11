<script setup>
import { computed } from 'vue'
import { useGraphStore } from '../store/graphStore'

const graphStore = useGraphStore()
const filters = computed(() => graphStore.state.filters)

const allTypes = ['hub', 'processor', 'merchant']
const allStatuses = ['active', 'warning', 'danger', 'unknown']
const allEdgeTypes = ['hub', 'direct', 'dashed']
</script>

<template>
  <div class="panel filters-panel">
    <div class="panel-title">Фильтры</div>

    <label class="field-label">
      Поиск
      <input
        :value="filters.search"
        class="ui-input"
        type="text"
        placeholder="Например: Alpha, Twix, Shop"
        @input="graphStore.setSearch($event.target.value)"
      />
    </label>

    <div class="filter-block">
      <div class="field-title">Тип узлов</div>
      <div class="chip-grid">
        <label v-for="type in allTypes" :key="type" class="chip-option">
          <input type="checkbox" :checked="filters.types.includes(type)" @change="graphStore.toggleFilterValue('types', type)" />
          <span>{{ type }}</span>
        </label>
      </div>
    </div>

    <div class="filter-block">
      <div class="field-title">Статус</div>
      <div class="chip-grid">
        <label v-for="status in allStatuses" :key="status" class="chip-option">
          <input type="checkbox" :checked="filters.statuses.includes(status)" @change="graphStore.toggleFilterValue('statuses', status)" />
          <span>{{ status }}</span>
        </label>
      </div>
    </div>

    <div class="filter-block">
      <div class="field-title">Тип связи</div>
      <div class="chip-grid">
        <label v-for="edgeType in allEdgeTypes" :key="edgeType" class="chip-option">
          <input type="checkbox" :checked="filters.edgeTypes.includes(edgeType)" @change="graphStore.toggleFilterValue('edgeTypes', edgeType)" />
          <span>{{ edgeType }}</span>
        </label>
      </div>
    </div>

    <label class="checkbox-row">
      <input type="checkbox" :checked="filters.hideIsolated" @change="graphStore.setFilterField('hideIsolated', $event.target.checked)" />
      <span>Скрывать изолированные узлы</span>
    </label>

    <button class="ui-button wide" @click="graphStore.resetFilters()">Сбросить фильтры</button>
  </div>
</template>
