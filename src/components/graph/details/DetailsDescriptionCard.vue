<script setup lang="ts">
defineProps<{
  description?: string
  contacts: string[]
}>()
</script>

<template>
  <section class="details-card">
    <p class="details-description">
      {{ description || 'Описание отсутствует.' }}
    </p>

    <div v-if="contacts.length" class="details-contacts">
      <div v-for="contact in contacts" :key="contact" class="details-contact">
        {{ contact }}
      </div>
    </div>
  </section>
</template>

<style scoped>
.details-card {
}

.details-card__title {
  color: #1e293b;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.2;
}

.details-description {
  margin: 0 0;
  color: #5f6b7d;
  font-size: 13px;
  line-height: 1.45;
}

.details-contacts {
  margin-top: 8px;
  display: grid;
  gap: 10px;
}

.details-contact {
  color: #667085;
  font-size: 13px;
  line-height: 1.3;
}
</style>