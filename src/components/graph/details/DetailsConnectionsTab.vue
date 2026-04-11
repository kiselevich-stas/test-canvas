<script setup lang="ts">
defineProps<{
  relations: Array<{
    name: string
    role: string
    initials: string
    status: string
    tone: string
  }>
}>()
</script>

<template>
  <div class="details-stack">
    <template v-if="relations.length">
      <article
          v-for="relation in relations"
          :key="`${relation.name}-${relation.role}`"
          class="details-list-card"
      >
        <div class="details-list-card__main">
          <div class="details-list-avatar">{{ relation.initials }}</div>

          <div>
            <div class="details-list-name">{{ relation.name }}</div>
            <div class="details-list-role">{{ relation.role }}</div>
          </div>
        </div>

        <div class="details-tone" :data-tone="relation.tone">
          {{ relation.status }}
        </div>
      </article>
    </template>

    <div v-else class="details-empty">
      Для этого узла пока нет связанных карточек.
    </div>
  </div>
</template>

<style scoped>
.details-stack {
  display: grid;
  gap: 12px;
}

.details-list-card {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
  background: #ffffff;
  border: 1px solid rgba(15, 23, 42, 0.05);
  border-radius: 16px;
  padding: 14px;
}

.details-list-card__main {
  display: flex;
  align-items: center;
  gap: 10px;
}

.details-list-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 12px;
  background: #eef2ff;
  color: #6366f1;
  font-weight: 700;
}

.details-list-name {
  color: #111827;
  font-weight: 700;
}

.details-list-role {
  color: #8b95a7;
  font-size: 12px;
}

.details-tone {
  font-size: 12px;
  font-weight: 600;
}

.details-tone[data-tone='green'] {
  color: #16a34a;
}

.details-tone[data-tone='orange'] {
  color: #f97316;
}

.details-tone[data-tone='red'] {
  color: #ef4444;
}

.details-tone[data-tone='blue'] {
  color: #2563eb;
}

.details-empty {
  padding: 16px;
  background: rgba(255, 255, 255, 0.72);
  border: 1px dashed rgba(139, 149, 167, 0.35);
  border-radius: 16px;
  color: #6b7280;
  font-size: 13px;
}
</style>