<script setup lang="ts">
defineProps<{
  node: {
    label?: string
    type?: string
    status?: string
    meta?: {
      shortName?: string
      typeLabel?: string
      statusTag?: string
      statusScore?: number
      statusLabel?: string
    }
  } | null
}>()
</script>

<template>
  <div class="details-head">
    <div class="details-head__main">
      <div class="details-avatar">
        {{ node?.meta?.shortName || node?.label?.slice(0, 2) || '??' }}
      </div>

      <div class="details-head__content">
        <div class="details-head__top">
          <div class="details-head__titles">
            <div class="details-title">{{ node?.label }}</div>

            <div class="details-subline">
              <span class="details-subtitle">
                {{ node?.meta?.typeLabel || node?.type }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<style scoped>
.details-head {
  width: 100%;
}

.details-head__main {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  min-width: 0;
}

.details-avatar {
  width: 38px;
  height: 38px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: #d9eef5;
  color: #18a6cf;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
}

.details-head__content {
  min-width: 0;
  flex: 1;
}

.details-head__top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
}

.details-head__titles {
  min-width: 0;
  flex: 1;
}

.details-title {
  color: #111827;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.2;
  min-width: 0;
}

.details-subline {
  margin-top: 2px;
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.details-subtitle {
  color: #2bb7df;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.2;
}
</style>