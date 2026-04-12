<script setup>
defineProps({
  title: {
    type: String,
    default: 'Статистика сети',
  },
  subtitle: {
    type: String,
    default: 'Аналитика по всей партнёрской сети Twix',
  },
})
</script>

<template>
  <section class="statistics-header">
    <div>
      <h1 class="statistics-header__title">
        {{ title }}
      </h1>

      <p class="statistics-header__subtitle">
        {{ subtitle }}
      </p>
    </div>
  </section>
</template>

<style scoped>
.statistics-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.statistics-header__title {
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  color: #111827;
}

.statistics-header__subtitle {
  margin: 6px 0 0;
  color: #6b7280;
  font-size: 14px;
}

@media (max-width: 768px) {
  .statistics-header__title {
    font-size: 24px;
  }
}
</style>