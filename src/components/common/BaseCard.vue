<script setup>
defineProps({
  title: {
    type: String,
    default: '',
  },
  subtitle: {
    type: String,
    default: '',
  },
  padding: {
    type: String,
    default: 'md',
    validator: (value) => ['none', 'sm', 'md', 'lg'].includes(value),
  },
})
</script>

<template>
  <section
      class="base-card"
      :class="{
      'base-card--padding-none': padding === 'none',
      'base-card--padding-sm': padding === 'sm',
      'base-card--padding-md': padding === 'md',
      'base-card--padding-lg': padding === 'lg',
    }"
  >
    <header
        v-if="title || subtitle || $slots.header"
        class="base-card__header"
    >
      <slot name="header">
        <div>
          <h2
              v-if="title"
              class="base-card__title"
          >
            {{ title }}
          </h2>

          <p
              v-if="subtitle"
              class="base-card__subtitle"
          >
            {{ subtitle }}
          </p>
        </div>
      </slot>
    </header>

    <div class="base-card__content">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.base-card {
  background: #ffffff;
  border: 1px solid #edf1f5;
  border-radius: 18px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.04);
}

.base-card--padding-none {
  padding: 0;
}

.base-card--padding-sm {
  padding: 12px;
}

.base-card--padding-md {
  padding: 16px;
}

.base-card--padding-lg {
  padding: 24px;
}

.base-card__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
}

.base-card__title {
  font-weight: 500;
  font-size: 16px;
  line-height: 1.4;
  vertical-align: middle;
  margin: 0;
  color: #111827;
}

.base-card__subtitle {
  font-weight: 400;
  font-size: 13px;
  line-height: 1.2;
  vertical-align: middle;
  margin: 2px 0 0;
  color: #8b95a7;
}

.base-card__content {
  min-width: 0;
}

@media (max-width: 768px) {
  .base-card--padding-md {
    padding: 16px;
  }

  .base-card--padding-lg {
    padding: 18px;
  }
}
</style>