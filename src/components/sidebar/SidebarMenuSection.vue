<script setup>
/**
 * Универсальный блок пунктов меню для сайдбара.
 *
 * @typedef {Object} SidebarMenuItem
 * @property {string} label - Текст пункта меню.
 * @property {string} icon - Путь до иконки.
 * @property {string} alt - Alt-текст иконки.
 * @property {boolean} [active] - Признак активного пункта.
 * @property {boolean} [ghost] - Облегчённый визуальный стиль пункта.
 * @property {boolean} [showLabel] - Нужно ли показывать подпись.
 */

defineProps({
  items: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <div class="sidebar-menu-section">
    <button
      v-for="item in items"
      :key="item.label"
      class="menu-item"
      :class="{ active: item.active, ghost: item.ghost }"
      type="button"
    >
      <img :src="item.icon" :alt="item.alt">
      <span v-if="item.showLabel">{{ item.label }}</span>
    </button>
  </div>
</template>
