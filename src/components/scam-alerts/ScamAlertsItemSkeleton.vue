<script setup>
defineProps({
  count: {
    type: Number,
    default: 8,
  },
})
</script>

<template>
  <div class="scam-skeleton-list">
    <div
        v-for="index in count"
        :key="index"
        class="scam-skeleton-item"
    >
      <div class="scam-skeleton-item__main">
        <div class="scam-skeleton-item__badges">
          <span class="scam-skeleton scam-skeleton--badge" />
          <span class="scam-skeleton scam-skeleton--badge scam-skeleton--badge-short" />
          <span class="scam-skeleton scam-skeleton--badge scam-skeleton--badge-wide" />
        </div>

        <div class="scam-skeleton-item__title">
          <span class="scam-skeleton scam-skeleton--title" />
        </div>
      </div>

      <div class="scam-skeleton-item__aside">
        <div class="scam-skeleton-item__top-meta">
          <span class="scam-skeleton scam-skeleton--date" />
          <span class="scam-skeleton scam-skeleton--confirmations" />
        </div>

        <div class="scam-skeleton-item__bottom-meta">
          <span class="scam-skeleton scam-skeleton--meta" />
          <span class="scam-skeleton scam-skeleton--meta" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.scam-skeleton-list {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 12px;
  background: #fff;
}

.scam-skeleton-item {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  min-height: 58px;
  padding: 8px 14px 9px;
  border-bottom: 1px solid #ececec;
  background: #fff;

  &:last-child {
    border-bottom: none;
  }

  &__main {
    min-width: 0;
    flex: 1;
    padding-top: 1px;
  }

  &__badges {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 6px;
  }

  &__aside {
    width: 290px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 6px;
  }

  &__top-meta {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__bottom-meta {
    display: flex;
    align-items: center;
    gap: 16px;
  }
}

.scam-skeleton {
  display: inline-block;
  position: relative;
  overflow: hidden;
  border-radius: 999px;
  background: #f1f1f1;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    transform: translateX(-100%);
    background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.7) 50%,
            rgba(255, 255, 255, 0) 100%
    );
    animation: shimmer 1.3s infinite;
  }

  &--badge {
    width: 64px;
    height: 18px;
  }

  &--badge-short {
    width: 78px;
  }

  &--badge-wide {
    width: 146px;
  }

  &--title {
    width: 260px;
    height: 14px;
    border-radius: 6px;
  }

  &--date {
    width: 72px;
    height: 12px;
    border-radius: 6px;
  }

  &--confirmations {
    width: 60px;
    height: 12px;
    border-radius: 6px;
  }

  &--meta {
    width: 92px;
    height: 12px;
    border-radius: 6px;
  }
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

@media (max-width: 1100px) {
  .scam-skeleton-item {
    &__aside {
      width: 250px;
    }
  }
}

@media (max-width: 900px) {
  .scam-skeleton-item {
    flex-direction: column;
    align-items: stretch;

    &__aside {
      width: 100%;
      align-items: flex-start;
    }

    &__top-meta,
    &__bottom-meta {
      justify-content: flex-start;
      flex-wrap: wrap;
    }
  }
}
</style>