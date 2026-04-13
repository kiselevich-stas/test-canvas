<script setup>
const rows = [
  { id: 1, titleWidth: '120px', descWidth: '190px' },
  { id: 2, titleWidth: '170px', descWidth: '180px' },
  { id: 3, titleWidth: '135px', descWidth: '175px' },
  { id: 4, titleWidth: '110px', descWidth: '165px' }
]
</script>

<template>
  <section class="settings-card">
    <div class="settings-card__title skeleton-block" />
    <div class="settings-card__description skeleton-block" />

    <div class="settings-card__grid">
      <div
          v-for="row in rows"
          :key="row.id"
          class="settings-skeleton-row"
      >
        <div class="settings-skeleton-row__content">
          <div
              class="settings-skeleton-row__title skeleton-block"
              :style="{ width: row.titleWidth }"
          />
          <div
              class="settings-skeleton-row__description skeleton-block"
              :style="{ width: row.descWidth }"
          />
        </div>

        <div class="settings-skeleton-row__switch skeleton-block" />
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
  width: 126px;
  height: 20px;
  border-radius: 8px;
}

.settings-card__description {
  width: 190px;
  height: 14px;
  margin-top: 8px;
  border-radius: 8px;
}

.settings-card__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 18px;
}

.settings-skeleton-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-height: 51px;
  padding: 14px 16px;
  border-radius: 14px;
  background: #fbfbfc;
}

.settings-skeleton-row__content {
  min-width: 0;
}

.settings-skeleton-row__title {
  height: 18px;
  border-radius: 7px;
}

.settings-skeleton-row__description {
  height: 14px;
  margin-top: 7px;
  border-radius: 7px;
}

.settings-skeleton-row__switch {
  width: 50px;
  height: 28px;
  border-radius: 999px;
  flex-shrink: 0;
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

@media (max-width: 900px) {
  .settings-card__grid {
    grid-template-columns: 1fr;
  }
}
</style>