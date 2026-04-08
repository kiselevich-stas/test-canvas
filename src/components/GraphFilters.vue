<template>
  <div class="panel filters-panel">
    <div class="panel-title">Фильтры</div>

    <label class="field-label">
      Поиск
      <input
        :value="modelValue.search"
        class="ui-input"
        type="text"
        placeholder="Например: Alpha, Twix, Shop"
        @input="updateField('search', $event.target.value)"
      />
    </label>

    <div class="filter-block">
      <div class="field-title">Тип узлов</div>
      <div class="chip-grid">
        <label v-for="type in allTypes" :key="type" class="chip-option">
          <input
            type="checkbox"
            :checked="modelValue.types.includes(type)"
            @change="toggleArrayValue('types', type)"
          />
          <span>{{ type }}</span>
        </label>
      </div>
    </div>

    <div class="filter-block">
      <div class="field-title">Статус</div>
      <div class="chip-grid">
        <label v-for="status in allStatuses" :key="status" class="chip-option">
          <input
            type="checkbox"
            :checked="modelValue.statuses.includes(status)"
            @change="toggleArrayValue('statuses', status)"
          />
          <span>{{ status }}</span>
        </label>
      </div>
    </div>

    <div class="filter-block">
      <div class="field-title">Тип связей</div>
      <div class="chip-grid">
        <label v-for="edgeType in allEdgeTypes" :key="edgeType" class="chip-option">
          <input
            type="checkbox"
            :checked="modelValue.edgeTypes.includes(edgeType)"
            @change="toggleArrayValue('edgeTypes', edgeType)"
          />
          <span>{{ edgeType }}</span>
        </label>
      </div>
    </div>

    <label class="checkbox-row">
      <input
        type="checkbox"
        :checked="modelValue.hideIsolated"
        @change="updateField('hideIsolated', $event.target.checked)"
      />
      <span>Скрывать изолированные узлы</span>
    </label>

    <button class="ui-button wide" @click="$emit('reset')">Сбросить фильтры</button>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue', 'reset'])

const allTypes = ['hub', 'processor', 'merchant']
const allStatuses = ['active', 'warning', 'danger']
const allEdgeTypes = ['hub', 'direct', 'dashed']

function updateField(field, value) {
  emit('update:modelValue', {
    ...props.modelValue,
    [field]: value,
  })
}

function toggleArrayValue(field, value) {
  const list = props.modelValue[field]
  const next = list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value]

  emit('update:modelValue', {
    ...props.modelValue,
    [field]: next,
  })
}
</script>
