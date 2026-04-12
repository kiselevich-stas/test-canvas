<script setup lang="ts">
import { computed } from 'vue'
import type { ConnectionItem } from '@/stores/connectionsStore'

const props = defineProps<{
  item: ConnectionItem
}>()

const leftBadgeClass = computed(() => `connection-row__badge--${props.item.left.roleKey}`)
const rightBadgeClass = computed(() => `connection-row__badge--${props.item.right.roleKey}`)
const statusClass = computed(() => `connection-row__status-badge--${props.item.status}`)

const channelLabel = computed(() => {
  return props.item.channel === 'twix' ? 'Через TWIX' : 'Прямая'
})

const statusLabel = computed(() => {
  return props.item.status === 'confirmed' ? 'Подтверждена' : 'Ожидание'
})
</script>

<template>
  <article class="connection-row">
    <div class="connection-row__box connection-row__box--party">
      <div class="connection-row__party">
        <div class="connection-row__badge" :class="leftBadgeClass">
          {{ item.left.shortName }}
        </div>

        <div class="connection-row__meta">
          <div class="connection-row__name">
            {{ item.left.name }}
          </div>

          <div class="connection-row__role">
            {{ item.left.roleLabel }}
          </div>
        </div>
      </div>
    </div>

    <div class="connection-row__arrow" aria-hidden="true">
      <span>≫</span>
    </div>

    <div class="connection-row__box connection-row__box--status">
      <div class="connection-row__center">
        <div class="connection-row__status-badge" :class="statusClass">
          {{ statusLabel }}
        </div>

        <div class="connection-row__channel">
          {{ channelLabel }}
        </div>
      </div>
    </div>

    <div class="connection-row__arrow" aria-hidden="true">
      <span>≫</span>
    </div>

    <div class="connection-row__box connection-row__box--party">
      <div class="connection-row__party connection-row__party--right">
        <div class="connection-row__meta connection-row__meta--right">
          <div class="connection-row__name">
            {{ item.right.name }}
          </div>

          <div class="connection-row__role">
            {{ item.right.roleLabel }}
          </div>
        </div>

        <div class="connection-row__badge" :class="rightBadgeClass">
          {{ item.right.shortName }}
        </div>
      </div>
    </div>

    <div class="connection-row__box connection-row__box--finance">
      <div class="connection-row__finance">
        <div class="connection-row__amount">
          {{ item.amountLabel }}
        </div>

        <div class="connection-row__date">
          {{ item.dateLabel }}
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped lang="scss">
.connection-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 24px minmax(0, 1fr) 24px minmax(0, 1fr) 116px;
  align-items: stretch;
  column-gap: 12px;
  background: #F9F9F9;
  border-radius: 14px;
}

.connection-row__box {
  min-height: 50px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
}

.connection-row__box--party {
  padding: 0 14px;
}

.connection-row__box--status {
  justify-content: center;
  padding: 0 10px;
}

.connection-row__box--finance {
  justify-content: flex-end;
  padding: 0 12px;
}

.connection-row__party {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  min-width: 0;
}

.connection-row__party--right {
  justify-content: flex-end;
}

.connection-row__badge {
  flex: 0 0 40px;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
}

.connection-row__badge--hub {
  color: #8d69f6;
}

.connection-row__badge--processor {
  color: #1aa8dc;
}

.connection-row__badge--merchant {
  color: #4c88ff;
}

.connection-row__meta {
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.connection-row__meta--right {
  text-align: right;
  align-items: flex-end;
}

.connection-row__name {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #1f1f24;
  font-size: 13px;
  font-weight: 600;
  line-height: 16px;
}

.connection-row__role {
  margin-top: 3px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #22b7eb;
  font-size: 12px;
  font-weight: 400;
  line-height: 14px;
}

.connection-row__arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #d1d1d7;
  font-size: 18px;
  line-height: 1;
  user-select: none;
}

.connection-row__arrow span {
  display: inline-block;
  transform: scaleX(0.82);
}

.connection-row__center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 0;
  text-align: center;
}

.connection-row__status-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 18px;
  padding: 0 8px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 500;
  line-height: 1;
  white-space: nowrap;
}

.connection-row__status-badge--confirmed {
  background: #ddf3e3;
  color: #29bf61;
}

.connection-row__status-badge--waiting {
  background: #fde7d7;
  color: #f48a34;
}

.connection-row__channel {
  margin-top: 4px;
  color: #9d9da5;
  font-size: 11px;
  line-height: 13px;
  white-space: nowrap;
}

.connection-row__finance {
  width: 100%;
  min-width: 0;
  text-align: right;
  position: relative;
  padding-left: 12px;
}

.connection-row__finance::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  width: 1px;
  height: 34px;
  background: #e7e7eb;
  transform: translateY(-50%);
}

.connection-row__amount {
  color: #1f1f24;
  font-size: 13px;
  font-weight: 500;
  line-height: 16px;
  white-space: nowrap;
}

.connection-row__date {
  margin-top: 4px;
  color: #b1b1b8;
  font-size: 12px;
  line-height: 14px;
  white-space: nowrap;
}

@media (max-width: 1200px) {
  .connection-row {
    grid-template-columns: minmax(0, 1fr) 20px minmax(0, 1fr) 20px minmax(0, 1fr) 104px;
    column-gap: 10px;
  }

  .connection-row__box--party {
    padding: 0 12px;
  }

  .connection-row__box--finance {
    padding: 0 10px;
  }
}

@media (max-width: 900px) {
  .connection-row {
    grid-template-columns: 1fr;
    row-gap: 8px;
  }

  .connection-row__arrow {
    display: none;
  }

  .connection-row__box--party,
  .connection-row__box--status,
  .connection-row__box--finance {
    min-height: 48px;
  }

  .connection-row__party--right {
    justify-content: space-between;
  }

  .connection-row__meta--right {
    order: 1;
    text-align: left;
    align-items: flex-start;
  }

  .connection-row__party--right .connection-row__badge {
    order: 2;
  }

  .connection-row__box--finance {
    justify-content: flex-start;
  }

  .connection-row__finance {
    text-align: left;
    padding-left: 0;
  }

  .connection-row__finance::before {
    display: none;
  }

  .connection-row__box--status {
    justify-content: flex-start;
  }

  .connection-row__center {
    align-items: flex-start;
    text-align: left;
  }
}
</style>