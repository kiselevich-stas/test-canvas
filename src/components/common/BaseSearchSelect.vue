<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  search: {
    type: String,
    default: '',
  },
  options: {
    type: Array,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: 'Поиск...',
  },
  emptyText: {
    type: String,
    default: 'Ничего не найдено',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  maxVisibleOptions: {
    type: Number,
    default: 5,
  },
})

const emit = defineEmits([
  'update:modelValue',
  'update:search',
  'search',
])

const isOpen = ref(false)

const selectedIds = computed(() => {
  return new Set(props.modelValue.map((item) => item.id))
})

const filteredOptions = computed(() => {
  return props.options
      .filter((option) => !selectedIds.value.has(option.id))
      .slice(0, props.maxVisibleOptions)
})

const hasQuery = computed(() => props.search.trim().length > 0)

const showDropdown = computed(() => {
  return isOpen.value && (props.loading || hasQuery.value)
})

function openDropdown() {
  isOpen.value = true
}

function closeDropdown() {
  isOpen.value = false
}

function selectOption(option) {
  emit('update:modelValue', [...props.modelValue, option])
  emit('update:search', '')
  emit('search', '')
  isOpen.value = false
}

function removeOption(id) {
  emit(
      'update:modelValue',
      props.modelValue.filter((item) => item.id !== id),
  )
}

function handleInput(event) {
  const value = event.target.value

  emit('update:search', value)
  emit('search', value)
  isOpen.value = true
}

function handleBlur() {
  setTimeout(() => {
    closeDropdown()
  }, 120)
}

function clearSearch() {
  emit('update:search', '')
  emit('search', '')
  isOpen.value = false
}

function getBadgeClass(variant) {
  return `base-search-select__badge--${variant || 'default'}`
}
</script>

<template>
  <div class="base-search-select">
    <div class="base-search-select__input-wrap">
      <img src="/assets/icons/search.svg" alt="search" class="base-search-select__search-icon" />

      <input
          :value="search"
          type="text"
          class="base-search-select__input"
          :placeholder="placeholder"
          @focus="openDropdown"
          @input="handleInput"
          @blur="handleBlur"
      >

      <button
          v-if="search"
          type="button"
          class="base-search-select__clear"
          @click="clearSearch"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.4108 4.4108C14.7363 4.08536 15.2638 4.08536 15.5892 4.4108C15.9146 4.73623 15.9146 5.26374 15.5892 5.58918L11.1784 9.99999L15.5892 14.4108L15.6462 14.4743C15.9131 14.8016 15.8943 15.2841 15.5892 15.5892C15.2841 15.8943 14.8016 15.9131 14.4743 15.6461L14.4108 15.5892L10 11.1784L5.58921 15.5892C5.26377 15.9146 4.73626 15.9146 4.41083 15.5892C4.08539 15.2637 4.08539 14.7362 4.41083 14.4108L8.82163 9.99999L4.41083 5.58918C4.08539 5.26374 4.08539 4.73623 4.41083 4.4108C4.73626 4.08536 5.26377 4.08536 5.58921 4.4108L10 8.8216L14.4108 4.4108Z" fill="currentColor"/>
        </svg>
      </button>
    </div>

    <div
        v-if="showDropdown"
        class="base-search-select__dropdown"
    >
      <div
          v-if="loading"
          class="base-search-select__state"
      >
        Поиск...
      </div>

      <template v-else-if="filteredOptions.length">
        <button
            v-for="option in filteredOptions"
            :key="option.id"
            type="button"
            class="base-search-select__option"
            @mousedown.prevent="selectOption(option)"
        >
          <div
              v-if="option.shortName"
              class="base-search-select__badge"
              :class="getBadgeClass(option.badgeVariant)"
          >
            {{ option.shortName }}
          </div>

          <div class="base-search-select__option-content">
            <div class="base-search-select__option-label">
              {{ option.label }}
            </div>

            <div
                v-if="option.caption"
                class="base-search-select__option-caption"
            >
              {{ option.caption }}
            </div>
          </div>
        </button>
      </template>

      <div
          v-else
          class="base-search-select__state"
      >
        {{ emptyText }}
      </div>
    </div>

    <div
        v-if="modelValue.length"
        class="base-search-select__selected"
    >
      <div
          v-for="item in modelValue"
          :key="item.id"
          class="base-search-select__selected-item"
      >
        <div
            v-if="item.shortName"
            class="base-search-select__badge"
            :class="getBadgeClass(item.badgeVariant)"
        >
          {{ item.shortName }}
        </div>

        <div class="base-search-select__selected-label">
          {{ item.label }}
        </div>

        <button
            type="button"
            class="base-search-select__selected-remove"
            @click="removeOption(item.id)"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.4108 4.4108C14.7363 4.08536 15.2638 4.08536 15.5892 4.4108C15.9146 4.73623 15.9146 5.26374 15.5892 5.58918L11.1784 9.99999L15.5892 14.4108L15.6462 14.4743C15.9131 14.8016 15.8943 15.2841 15.5892 15.5892C15.2841 15.8943 14.8016 15.9131 14.4743 15.6461L14.4108 15.5892L10 11.1784L5.58921 15.5892C5.26377 15.9146 4.73626 15.9146 4.41083 15.5892C4.08539 15.2637 4.08539 14.7362 4.41083 14.4108L8.82163 9.99999L4.41083 5.58918C4.08539 5.26374 4.08539 4.73623 4.41083 4.4108C4.73626 4.08536 5.26377 4.08536 5.58921 4.4108L10 8.8216L14.4108 4.4108Z" fill="currentColor"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.base-search-select {
  position: relative;
}

.base-search-select__input-wrap {
  position: relative;
  display: flex;
  gap: 8px;
  align-items: center;
  height: 34px;
  border-radius: 8px;
  background: #F9F9F9;
  overflow: hidden;
  padding: 6px 10px;
}

.base-search-select__search-icon {
  flex: 0 0 auto;
}

.base-search-select__input {
  flex: 1;
  min-width: 0;
  height: 100%;
  border: none;
  background: transparent;
  outline: none;
  color: #1f1f24;
  font-size: 14px;
}

.base-search-select__input::placeholder {
  color: #b1b1b8;
}

.base-search-select__clear {
  padding: 0;
  outline: none;
  box-shadow: none;
  border: none;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  svg{
    width: 10px;
    height: auto;
  }
}

.base-search-select__dropdown {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  z-index: 10;
  padding: 4px;
  border-radius: 10px;
  border: 1px solid #ececf1;
  background: #ffffff;
  box-shadow: 0 10px 30px rgba(31, 31, 36, 0.08);
}

.base-search-select__state {
  padding: 8px 10px;
  color: #9ea1a9;
  font-size: 12px;
  line-height: 14px;
}

.base-search-select__option {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 28px;
  padding: 4px 6px;
  border: none;
  border-radius: 8px;
  background: transparent;
  text-align: left;
  cursor: pointer;
}

.base-search-select__option:hover {
  background: #f7f9fc;
}

.base-search-select__option-content {
  min-width: 0;
}

.base-search-select__option-label {
  color: #4d4d54;
  font-size: 13px;
  line-height: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.base-search-select__option-caption {
  margin-top: 1px;
  color: #9ea1a9;
  font-size: 11px;
  line-height: 13px;
}

.base-search-select__selected {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 8px;
}

.base-search-select__selected-item {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 28px;
  padding: 4px 6px;
  border: 1px solid #ececf1;
  border-radius: 8px;
  background: #f7f7f8;
}

.base-search-select__selected-label {
  flex: 1;
  min-width: 0;
  color: #4d4d54;
  font-size: 13px;
  line-height: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.base-search-select__selected-remove {
  padding: 0;
  outline: none;
  box-shadow: none;
  border: none;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  svg{
    width: 10px;
    height: auto;
  }
}

.base-search-select__badge {
  flex: 0 0 22px;
  width: 22px;
  height: 22px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 600;
  line-height: 1;
}

.base-search-select__badge--hub {
  background: #eee8fb;
  color: #8d69f6;
}

.base-search-select__badge--processor {
  background: #dff0f4;
  color: #1aa8dc;
}

.base-search-select__badge--merchant {
  background: #e1ebf9;
  color: #4c88ff;
}

.base-search-select__badge--default {
  background: #ececef;
  color: #7b7b85;
}
</style>