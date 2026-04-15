<script setup>
import UiToastContainer from "@/components/ui/toast/UiToastContainer.vue";
</script>

<template>
  <main class="main">
    <slot/>
    <UiToastContainer/>
  </main>
</template>
