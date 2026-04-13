<template>
  <div class="skeleton">
    <div v-for="i in 4" :key="i" class="skeleton-item">
      <div class="skeleton-line skeleton-line--title" />
      <div class="skeleton-line" />
      <div class="skeleton-line skeleton-line--short" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.skeleton {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.skeleton-item {
  padding: 10px 12px;
  border-radius: 12px;
  background: #ffffff;
}

.skeleton-line {
  height: 10px;
  border-radius: 6px;
  background: linear-gradient(
          90deg,
          #ececec 25%,
          #f5f5f5 50%,
          #ececec 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.2s infinite;
  margin-top: 6px;
}

.skeleton-line--title {
  width: 60%;
  height: 12px;
}

.skeleton-line--short {
  width: 40%;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>