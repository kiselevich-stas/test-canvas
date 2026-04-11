<script setup>
/**
 * Базовый layout дашборда.
 *
 * Держит постоянный сайдбар слева и область контента справа.
 * Визуально повторяет исходную структуру приложения,
 * но позволяет переиспользовать каркас без дублирования.
 */
import Sidebar from '../components/sidebar/Sidebar.vue'
</script>

<template>
  <div class="dashboard-layout">
    <Sidebar />

    <main class="dashboard-main">
      <slot />
    </main>
  </div>
</template>
