<script setup lang="ts">
import UiButton from '@/components/ui/UiButton.vue'
</script>

<template>
  <div class="details-footer">
    <UiButton
        class="details-footer__button"
        variant="danger"
        icon="icon-flag"
    >
      Скам
    </UiButton>

    <UiButton
        class="details-footer__button"
        variant="secondary"
        icon="icon-edit"
    >
      Редактировать
    </UiButton>
  </div>
</template>

<style scoped>
.details-footer {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  width: 100%;
}

.details-footer__button {
  width: 100%;
}
</style>