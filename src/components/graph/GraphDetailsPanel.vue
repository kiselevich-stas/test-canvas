<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useGraphStore } from '../../store/graphStore'

const graphStore = useGraphStore()
const { selectedNode, activeTab } = storeToRefs(graphStore)

const tabs = computed(() => {
  const relationsCount = selectedNode.value?.meta?.relations?.length || 0
  const alertsCount = selectedNode.value?.meta?.alerts?.length || 0

  return [
    { id: 'info', label: 'Инфо', count: null },
    { id: 'connections', label: 'Связи', count: relationsCount || null },
    { id: 'alerts', label: 'Алерты', count: alertsCount || null },
  ]
})

/**
 * Закрывает карточку выбранного узла.
 */
function clearSelection() {
  graphStore.clearSelection()
}

/**
 * Переключает активную вкладку карточки.
 *
 * @param {string} tabId
 */
function setTab(tabId) {
  graphStore.setActiveTab(tabId)
}
</script>

<template>
  <aside class="canvas-side panel" :class="{ 'canvas-side--open': !!selectedNode }">
    <template v-if="selectedNode">
      <div class="side-header">
        <div class="side-header-main">
          <div class="side-avatar">
            {{ selectedNode.meta?.shortName || selectedNode.label.slice(0, 2) }}
          </div>

          <div>
            <div class="side-title">{{ selectedNode.label }}</div>

            <div class="side-tags">
              <span class="side-chip side-chip--type">
                {{ selectedNode.meta?.typeLabel || selectedNode.type }}
              </span>

              <span
                  v-if="selectedNode.meta?.statusTag"
                  class="side-chip side-chip--alert"
              >
                {{ selectedNode.meta.statusTag }}
              </span>
            </div>
          </div>
        </div>

        <button class="close-button" type="button" @click="clearSelection">×</button>
      </div>

      <div class="status-card">
        <div class="status-row">
          <div class="status-pill" :data-status="selectedNode.status">
            <span class="status-pill-dot"></span>
            {{ selectedNode.meta?.statusLabel || selectedNode.status }}
          </div>

          <div class="status-score">
            {{ selectedNode.meta?.statusScore ?? 0 }}/100
            <span class="status-ring"></span>
          </div>
        </div>
      </div>

      <div class="tabs-row">
        <button
            v-for="tab in tabs"
            :key="tab.id"
            type="button"
            class="tab-button"
            :class="{ active: activeTab === tab.id }"
            @click="setTab(tab.id)"
        >
          {{ tab.label }}
          <span v-if="tab.count" class="tab-count">{{ tab.count }}</span>
        </button>
      </div>

      <div v-if="activeTab === 'info'" class="side-section stack-gap">
        <p class="side-description">
          {{ selectedNode.meta?.description || 'Описание отсутствует.' }}
        </p>

        <div class="contact-list">
          <div
              v-for="contact in selectedNode.meta?.contacts || []"
              :key="contact"
              class="contact-item"
          >
            {{ contact }}
          </div>
        </div>

        <div class="metric-card">
          <div class="metric-card-row">
            <span>Репутация</span>
            <span class="metric-card-tag">
              {{ selectedNode.meta?.reputation?.label || '—' }}
            </span>
          </div>

          <div class="metric-card-value">
            {{ selectedNode.meta?.reputation?.value || 0 }} из 100
          </div>

          <div class="metric-progress">
            <div
                class="metric-progress-bar"
                :style="{ width: `${selectedNode.meta?.reputation?.value || 0}%` }"
            />
          </div>
        </div>

        <div class="metrics-grid">
          <div
              v-for="metric in selectedNode.meta?.metrics || []"
              :key="metric.label"
              class="small-metric"
          >
            <div class="small-metric-label">{{ metric.label }}</div>
            <div class="small-metric-value">{{ metric.value }}</div>
          </div>
        </div>
      </div>

      <div v-else-if="activeTab === 'connections'" class="side-section stack-gap">
        <div v-if="selectedNode.meta?.relations?.length" class="relation-list">
          <div
              v-for="relation in selectedNode.meta.relations"
              :key="`${relation.name}-${relation.role}`"
              class="relation-item"
          >
            <div class="relation-left">
              <div class="relation-avatar">{{ relation.initials }}</div>
              <div>
                <div class="relation-name">{{ relation.name }}</div>
                <div class="relation-role">{{ relation.role }}</div>
              </div>
            </div>

            <div class="relation-status" :data-tone="relation.tone">
              {{ relation.status }}
            </div>
          </div>
        </div>

        <div v-else class="empty-state empty-state--inline">
          Для этого узла пока нет связанных карточек.
        </div>
      </div>

      <div v-else class="side-section stack-gap">
        <div v-if="selectedNode.meta?.alerts?.length" class="alert-list">
          <div
              v-for="alert in selectedNode.meta.alerts"
              :key="`${alert.title}-${alert.date}`"
              class="alert-item"
          >
            <div class="alert-top">
              <span class="alert-badge">{{ alert.title }}</span>
              <span class="alert-date">{{ alert.date }}</span>
            </div>

            <div class="alert-text">{{ alert.text }}</div>
          </div>
        </div>

        <div v-else class="empty-state empty-state--inline">
          Алертов пока нет.
        </div>
      </div>

      <button class="report-button" type="button">Пожаловаться на скам</button>
    </template>

    <div v-else class="side-empty">
      <div class="panel-title">Выбранный узел</div>
      <div class="empty-state">
        Нажми на любой узел на канвасе — справа появится карточка с информацией,
        связями и алертами.
      </div>
    </div>
  </aside>
</template>