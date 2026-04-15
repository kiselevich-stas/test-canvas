<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import DashboardLayout from '@/layouts/DashboardLayout.vue'
import LoginLayout from "@/layouts/LoginLayout.vue";

const route = useRoute()

const layoutComponent = computed(() => {
  if (route.meta.layout === 'login') {
    return LoginLayout
  }

  return DashboardLayout
})
</script>

<template>
  <component :is="layoutComponent">
    <RouterView />
  </component>
</template>