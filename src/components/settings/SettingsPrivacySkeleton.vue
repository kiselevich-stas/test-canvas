<script setup>
const rows = [
  { id: 1, width: '175px' },
  { id: 2, width: '155px' },
  { id: 3, width: '182px' }
]
</script>

<template>
  <section class="settings-card">
    <div class="settings-card__title skeleton-block" />
    <div class="settings-card__description skeleton-block" />

    <div class="settings-card__list">
      <div
          v-for="row in rows"
          :key="row.id"
          class="settings-skeleton-option"
      >
        <div class="settings-skeleton-option__radio skeleton-block" />
        <div
            class="settings-skeleton-option__label skeleton-block"
            :style="{ width: row.width }"
        />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@keyframes skeleton-shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.settings-card {
}

.settings-card__title {
  width: 118px;
  height: 20px;
  border-radius: 8px;
}

.settings-card__description {
  width: 205px;
  height: 14px;
  margin-top: 8px;
  border-radius: 8px;
}

.settings-card__list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 18px;
}

.settings-skeleton-option {
  display: flex;
  align-items: center;
  gap: 12px;
}

.settings-skeleton-option__radio {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  flex-shrink: 0;
}

.settings-skeleton-option__label {
  height: 18px;
  border-radius: 7px;
}

.skeleton-block {
  background: linear-gradient(
          90deg,
          #ececef 0%,
          #f6f6f8 50%,
          #ececef 100%
  );
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.4s linear infinite;
}
</style>