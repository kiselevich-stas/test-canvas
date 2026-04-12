<script setup lang="ts">
import { computed } from 'vue'
import type { ConnectionItem } from '@/stores/connectionsStore'

const props = defineProps<{
  item: ConnectionItem
}>()

const leftBadgeClass = computed(() => `connection-row__badge--${props.item.left.roleKey}`)
const rightBadgeClass = computed(() => `connection-row__badge--${props.item.right.roleKey}`)
const statusClass = computed(() => `connection-row__status-badge--${props.item.status}`)
const channelLabel = computed(() => props.item.channel === 'twix' ? 'Через TWIX' : 'Прямая')
const statusLabel = computed(() => props.item.status === 'confirmed' ? 'Подтверждена' : 'Ожидание')
</script>

<template>
  <div class="connection-row">
    <div class="connection-row__side">
      <div class="connection-row__party">
        <div class="connection-row__badge" :class="leftBadgeClass">
          {{ item.left.shortName }}
        </div>

        <div class="connection-row__meta">
          <div class="connection-row__name">{{ item.left.name }}</div>
          <div class="connection-row__role">{{ item.left.roleLabel }}</div>
        </div>
      </div>
    </div>

    <div class="connection-row__arrow">≫</div>

    <div class="connection-row__center">
      <div class="connection-row__status-badge" :class="statusClass">
        {{ statusLabel }}
      </div>
      <div class="connection-row__channel">
        {{ channelLabel }}
      </div>
    </div>

    <div class="connection-row__arrow">≫</div>

    <div class="connection-row__side connection-row__side--right">
      <div class="connection-row__party connection-row__party--right">
        <div class="connection-row__meta connection-row__meta--right">
          <div class="connection-row__name">{{ item.right.name }}</div>
          <div class="connection-row__role">{{ item.right.roleLabel }}</div>
        </div>

        <div class="connection-row__badge" :class="rightBadgeClass">
          {{ item.right.shortName }}
        </div>
      </div>

      <div class="connection-row__finance">
        <div class="connection-row__amount">{{ item.amountLabel }}</div>
        <div class="connection-row__date">{{ item.dateLabel }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.connection-row {
  min-height: 74px;
  padding: 0 16px;
  border-radius: 16px;
  background: #f7f7f8;
  display: grid;
  grid-template-columns: minmax(220px, 1fr) 44px 200px 44px minmax(300px, 1.2fr);
  align-items: center;
  gap: 8px;
}

.connection-row__side {
  min-width: 0;
}

.connection-row__side--right {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.connection-row__party {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

.connection-row__party--right {
  justify-content: flex-end;
}

.connection-row__badge {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
}

.connection-row__badge--hub {
  background: #efe8ff;
  color: #8b5cf6;
}

.connection-row__badge--processor {
  background: #ddf4f7;
  color: #14b8d4;
}

.connection-row__badge--merchant {
  background: #e6f0ff;
  color: #3b82f6;
}

.connection-row__meta {
  min-width: 0;
}

.connection-row__meta--right {
  text-align: right;
}

.connection-row__name {
  color: #1f1f24;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.15;
  white-space: nowrap;
}

.connection-row__role {
  margin-top: 4px;
  color: #25b8df;
  font-size: 14px;
  line-height: 1.15;
}

.connection-row__arrow {
  color: #cbcbcf;
  font-size: 30px;
  line-height: 1;
  text-align: center;
}

.connection-row__center {
  text-align: center;
}

.connection-row__status-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 22px;
  padding: 0 10px;
  border-radius: 999px;
  font-size: 13px;
  line-height: 1;
}

.connection-row__status-badge--confirmed {
  background: #dff4e6;
  color: #22c55e;
}

.connection-row__status-badge--waiting {
  background: #feecd9;
  color: #fb923c;
}

.connection-row__channel {
  margin-top: 6px;
  color: #9a9aa2;
  font-size: 13px;
  line-height: 1.15;
}

.connection-row__finance {
  min-width: 86px;
  padding-left: 16px;
  border-left: 1px solid #e8e8eb;
  text-align: right;
}

.connection-row__amount {
  color: #1f1f24;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.1;
}

.connection-row__date {
  margin-top: 6px;
  color: #b0b0b8;
  font-size: 13px;
  line-height: 1.1;
}
</style>