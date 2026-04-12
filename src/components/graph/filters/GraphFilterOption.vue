<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <button
      type="button"
      class="graph-filter-option"
      :class="{ 'graph-filter-option--active': active }"
  >
    <span class="graph-filter-option__icon">
      <svg
          v-if="active"
          viewBox="0 0 16 16"
          aria-hidden="true"
          class="graph-filter-option__check"
      >
        <path
            d="M3.5 8.5L6.5 11.5L12.5 5.5"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.7"
        />
      </svg>

      <template v-else>
        <span
            v-if="color"
            class="graph-filter-option__dot"
            :style="{ backgroundColor: color }"
        />

        <svg
            v-else-if="icon === 'all'"
            viewBox="0 0 20 20"
            aria-hidden="true"
            class="graph-filter-option__symbol"
        >
          <path d="M10 4L15 6.5L10 9L5 6.5L10 4Z" fill="none" stroke="currentColor" stroke-width="1.4"/>
          <path d="M5 9.5L10 12L15 9.5" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
          <path d="M5 12.5L10 15L15 12.5" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
        </svg>

        <svg
            v-else-if="icon === 'hub'"
            viewBox="0 0 20 20"
            aria-hidden="true"
            class="graph-filter-option__symbol"
        >
          <path d="M10 4L15 6.5L10 9L5 6.5L10 4Z" fill="none" stroke="currentColor" stroke-width="1.4"/>
          <path d="M5 9.5L10 12L15 9.5" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
        </svg>

        <svg
            v-else-if="icon === 'processor'"
            viewBox="0 0 20 20"
            aria-hidden="true"
            class="graph-filter-option__symbol"
        >
          <rect x="5.5" y="5.5" width="9" height="9" rx="2" fill="none" stroke="currentColor" stroke-width="1.4"/>
          <path d="M8 2.5V5M12 2.5V5M8 15V17.5M12 15V17.5M15 8H17.5M15 12H17.5M2.5 8H5M2.5 12H5" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
        </svg>

        <svg
            v-else-if="icon === 'merchant'"
            viewBox="0 0 20 20"
            aria-hidden="true"
            class="graph-filter-option__symbol"
        >
          <circle cx="7" cy="8" r="2.2" fill="none" stroke="currentColor" stroke-width="1.4"/>
          <circle cx="13" cy="8" r="2.2" fill="none" stroke="currentColor" stroke-width="1.4"/>
          <path d="M3.5 15C4.4 12.8 5.8 11.8 7 11.8C8.2 11.8 9.6 12.8 10.5 15" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
          <path d="M9.5 15C10.4 12.8 11.8 11.8 13 11.8C14.2 11.8 15.6 12.8 16.5 15" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
        </svg>
      </template>
    </span>

    <span class="graph-filter-option__label">
      {{ label }}
    </span>
  </button>
</template>

<style scoped>
.graph-filter-option {
  width: 100%;
  min-height: 38px;
  padding: 0 12px;
  border: 0;
  border-radius: 12px;
  background: transparent;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  text-align: left;
  color: #7b7b85;
}

.graph-filter-option--active {
  background: #ffffff;
  color: #111827;
}

.graph-filter-option__icon {
  width: 16px;
  height: 16px;
  flex: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.graph-filter-option__check {
  width: 14px;
  height: 14px;
}

.graph-filter-option__symbol {
  width: 16px;
  height: 16px;
}

.graph-filter-option__dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.graph-filter-option__label {
  font-size: 14px;
  line-height: 1.2;
  font-weight: 400;
}

.graph-filter-option--active .graph-filter-option__label {
  font-weight: 500;
}
</style>