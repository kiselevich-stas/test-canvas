<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  options: {
    type: Array,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: 'Выберите значение',
  },
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const rootRef = ref(null)

const selectedOption = computed(() => {
  return props.options.find(option => option.value === props.modelValue) || null
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const closeDropdown = () => {
  isOpen.value = false
}

const selectOption = (option) => {
  emit('update:modelValue', option.value)
  closeDropdown()
}

const handleClickOutside = (event) => {
  if (!rootRef.value) {
    return
  }

  if (!rootRef.value.contains(event.target)) {
    closeDropdown()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div
      ref="rootRef"
      class="ui-select"
      :class="{ 'ui-select--open': isOpen }"
  >
    <button
        type="button"
        class="ui-select__trigger"
        @click="toggleDropdown"
    >
      <span class="ui-select__value-wrap">
        <span
            v-if="selectedOption && selectedOption.dotColor"
            class="ui-select__dot"
            :class="`ui-select__dot--${selectedOption.dotColor}`"
        />

        <span class="ui-select__value">
          {{ selectedOption ? selectedOption.label : placeholder }}
        </span>
      </span>

      <svg
          class="ui-select__arrow"
          viewBox="0 0 16 16"
          fill="none"
      >
        <path
            d="M4 10L8 6L12 10"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
      </svg>
    </button>

    <div
        v-if="isOpen"
        class="ui-select__dropdown"
    >
      <button
          v-for="option in options"
          :key="option.value"
          type="button"
          class="ui-select__option"
          :class="{ 'ui-select__option--active': option.value === modelValue }"
          @click="selectOption(option)"
      >
        <div class="ui-select__option-left">
          <span
              v-if="option.dotColor"
              class="ui-select__dot"
              :class="`ui-select__dot--${option.dotColor}`"
          />

          <span class="ui-select__option-label">
            {{ option.label }}
          </span>
        </div>

        <svg
            v-if="option.value === modelValue"
            class="ui-select__check"
            viewBox="0 0 20 20"
            fill="none"
        >
          <path
              d="M4.5 10.5L8.5 14.5L15.5 6.5"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.ui-select {
  position: relative;
  width: 228px;

  &__trigger {
    width: 100%;
    height: 40px;
    border: none;
    border-radius: 10px;
    background: #fff;
    padding: 0 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    box-shadow: inset 0 0 0 1px #ececec;
  }

  &__value-wrap {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
  }

  &__value {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    color: #3d3d3d;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__arrow {
    width: 16px;
    height: 16px;
    color: #c1c1c1;
    transition: transform 0.2s ease;
  }

  &--open &__arrow {
    transform: rotate(180deg);
  }

  &__dropdown {
    position: absolute;
    top: calc(100% + 6px);
    left: 0;
    width: 100%;
    background: #fff;
    border-radius: 12px;
    box-shadow:
        0 10px 30px rgba(0, 0, 0, 0.08),
        0 0 0 1px #ececec;
    overflow: hidden;
    z-index: 20;
  }

  &__option {
    width: 100%;
    min-height: 50px;
    padding: 0 16px;
    border: none;
    border-bottom: 1px solid #f1f1f1;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    text-align: left;

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      background: #fafafa;
    }
  }

  &__option-left {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__option-label {
    font-size: 16px;
    font-weight: 400;
    line-height: 22px;
    color: #4a4a4a;
  }

  &__check {
    width: 18px;
    height: 18px;
    color: #18b663;
    flex-shrink: 0;
  }

  &__dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;

    &--gray {
      background: #d4d4d4;
    }

    &--red {
      background: #ef4444;
    }

    &--orange {
      background: #fb923c;
    }

    &--yellow {
      background: #f59e0b;
    }

    &--dark {
      background: #8b8b8b;
    }
  }
}
</style>