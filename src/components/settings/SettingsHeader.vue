<script setup>
import UiButton from '@/components/ui/UiButton.vue'

defineProps({
  title: {
    type: String,
    default: 'Настройки',
  },
  subtitle: {
    type: String,
    default: 'Управление параметрами платформы',
  },
  saveDisabled: {
    type: Boolean,
    default: true,
  },
  isSaving: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['save'])
</script>

<template>
  <section class="statistics-header">
    <div class="statistics-header__content">
      <h1 class="statistics-header__title">
        {{ title }}
      </h1>

      <p class="statistics-header__subtitle">
        {{ subtitle }}
      </p>
    </div>

    <UiButton
        variant="primary"
        :disabled="saveDisabled"
        :loading="isSaving"
        @click="$emit('save')"
    >
      Сохранить
    </UiButton>
  </section>
</template>

<style scoped>
.statistics-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.statistics-header__content {
  min-width: 0;
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
  .statistics-header {
    flex-direction: column;
    align-items: stretch;
  }

  .statistics-header__title {
    font-size: 24px;
  }
}
</style>