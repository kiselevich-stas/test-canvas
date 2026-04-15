<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
  },
})

const typeMap = {
  fraud: {
    label: 'Фрод',
    className: 'badge--type-fraud',
  },
  chargeback: {
    label: 'Чарджбэк',
    className: 'badge--type-chargeback',
  },
  scam: {
    label: 'Скам',
    className: 'badge--type-scam',
  },
  delay: {
    label: 'Спор',
    className: 'badge--type-delay',
  },
  aml: {
    label: 'Фрод',
    className: 'badge--type-fraud',
  },
}

const severityMap = {
  critical: {
    label: 'Критический',
    className: 'badge--severity-critical',
  },
  high: {
    label: 'Высокий',
    className: 'badge--severity-high',
  },
  medium: {
    label: 'Средний',
    className: 'badge--severity-medium',
  },
  low: {
    label: 'Низкий',
    className: 'badge--severity-low',
  },
}
</script>

<template>
  <div class="scam-item">
    <div class="scam-item__main">
      <div class="scam-item__badges">
        <span
            class="badge"
            :class="typeMap[item.type]?.className"
        >
          <svg
              class="badge__icon"
              viewBox="0 0 16 16"
              fill="none"
          >
            <path
                d="M5.333 2.667h5.334L13.333 5.333v8H2.667v-8l2.666-2.666Z"
                stroke="currentColor"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
          </svg>

          {{ typeMap[item.type]?.label || item.type }}
        </span>

        <span
            class="badge"
            :class="severityMap[item.severity]?.className"
        >
          {{ severityMap[item.severity]?.label || item.severity }}
        </span>

        <span
            v-if="item.isCommunityConfirmed"
            class="badge badge--confirmed"
        >
          <svg
              class="badge__icon"
              viewBox="0 0 16 16"
              fill="none"
          >
            <circle
                cx="8"
                cy="8"
                r="5.5"
                stroke="currentColor"
                stroke-width="1.2"
            />
            <path
                d="M5.7 8.2 7.2 9.7 10.5 6.4"
                stroke="currentColor"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
          </svg>

          Подтверждён сообществом
        </span>
      </div>

      <div class="scam-item__title">
        {{ item.title }}
      </div>
    </div>

    <div class="scam-item__aside">
      <div class="scam-item__top-meta">
        <span class="scam-item__date">
          {{ item.createdAt }}
        </span>

        <span class="scam-item__confirmations">
          <svg
              class="scam-item__confirmations-icon"
              viewBox="0 0 16 16"
              fill="none"
          >
            <path
                d="M5.333 6.667a2.333 2.333 0 1 1 0-4.667 2.333 2.333 0 0 1 0 4.667Zm5.334 1.166a1.833 1.833 0 1 1 0-3.666 1.833 1.833 0 0 1 0 3.666ZM5.333 8.833c1.933 0 3.5 1.045 3.5 2.334V12H1.833v-.833c0-1.289 1.567-2.334 3.5-2.334Zm5.334.667c1.376 0 2.5.716 2.5 1.6V12h-2.5"
                stroke="currentColor"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
          </svg>

          {{ item.confirmationsCount }} подтв.
        </span>
      </div>

      <div class="scam-item__bottom-meta">
        <div class="scam-item__meta-group">
          <span class="scam-item__meta-label">Нод:</span>
          <span class="scam-item__meta-value">
            <span class="scam-item__avatar scam-item__avatar--blue">
              {{ item.node.shortName }}
            </span>
            {{ item.node.name }}
          </span>
        </div>

        <div class="scam-item__meta-group">
          <span class="scam-item__meta-label">Репортёр:</span>
          <span class="scam-item__meta-value">
            <span class="scam-item__avatar scam-item__avatar--violet">
              {{ item.reporter.shortName }}
            </span>
            {{ item.reporter.name }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.scam-item {
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
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 6px;
  }

  &__title {
    font-size: 12px;
    line-height: 18px;
    font-weight: 400;
    color: #1f1f1f;
    word-break: break-word;
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
    min-height: 16px;
  }

  &__date {
    font-size: 11px;
    line-height: 14px;
    color: #9f9f9f;
    white-space: nowrap;
  }

  &__confirmations {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 11px;
    line-height: 14px;
    color: #5f5f5f;
    white-space: nowrap;
  }

  &__confirmations-icon {
    width: 13px;
    height: 13px;
    color: #7b7b7b;
    flex-shrink: 0;
  }

  &__bottom-meta {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-wrap: wrap;
    gap: 10px 16px;
  }

  &__meta-group {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    white-space: nowrap;
  }

  &__meta-label {
    font-size: 11px;
    line-height: 14px;
    color: #a0a0a0;
  }

  &__meta-value {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 12px;
    line-height: 16px;
    color: #2f2f2f;
    font-weight: 400;
  }

  &__avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 17px;
    height: 17px;
    border-radius: 4px;
    font-size: 9px;
    line-height: 1;
    font-weight: 500;

    &--blue {
      background: #dbeafe;
      color: #2563eb;
    }

    &--violet {
      background: #ede9fe;
      color: #7c3aed;
    }
  }
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 18px;
  padding: 0 7px;
  border-radius: 999px;
  font-size: 11px;
  line-height: 1;
  font-weight: 400;
  white-space: nowrap;

  &__icon {
    width: 11px;
    height: 11px;
    flex-shrink: 0;
  }

  &--type-fraud {
    background: #fff1f0;
    color: #ff7a45;
  }

  &--type-chargeback {
    background: #f5f0ff;
    color: #7c3aed;
  }

  &--type-scam {
    background: #fff1f1;
    color: #ff5a5f;
  }

  &--type-delay {
    background: #fff7ed;
    color: #fb923c;
  }

  &--severity-critical {
    background: #fff1f1;
    color: #ef4444;
  }

  &--severity-high {
    background: #fff7ed;
    color: #fb923c;
  }

  &--severity-medium {
    background: #fff7df;
    color: #f59e0b;
  }

  &--severity-low {
    background: #f3f4f6;
    color: #666666;
  }

  &--confirmed {
    background: #e8f8ff;
    color: #11a8d8;
  }
}

@media (max-width: 1100px) {
  .scam-item {
    &__aside {
      width: 250px;
    }
  }
}

@media (max-width: 900px) {
  .scam-item {
    flex-direction: column;
    align-items: stretch;

    &__aside {
      width: 100%;
      align-items: flex-start;
    }

    &__top-meta {
      justify-content: flex-start;
      flex-wrap: wrap;
    }

    &__bottom-meta {
      justify-content: flex-start;
    }
  }
}
</style>