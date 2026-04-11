<script setup>
import { computed } from 'vue'
import { useGraphStore } from '../../store/graphStore'
import SidebarSearch from './SidebarSearch.vue'

const graphStore = useGraphStore()

const isCollapsed = computed(() => graphStore.sidebarCollapsed)

const search = computed({
  get: () => graphStore.filters.search,
  set: (value) => graphStore.setSearch(value),
})

function toggleSidebar() {
  graphStore.toggleSidebar()
}
</script>

<template>
  <aside :class="['sidebar', { collapsed: isCollapsed }]">
    <div class="sidebar-header">
      <div v-if="!isCollapsed" class="brand">
        <img src="/assets/icons/logo.svg" alt="logo">
        <span>Twix.im</span>
      </div>

      <button class="toggle-btn" type="button" @click="toggleSidebar">
        <img v-if="!isCollapsed" src="/assets/icons/arrow-left.svg" alt="arrow-icon">
        <img v-else src="/assets/icons/logo.svg" alt="logo">
      </button>
    </div>

    <div class="sidebar-wrapper">
      <SidebarSearch
          v-if="!isCollapsed"
          v-model="search"
      />

      <nav class="sidebar-menu">
        <button class="menu-item active" type="button">
          <img src="/assets/icons/git-fork.svg" alt="git-fork-icon">
          <span v-if="!isCollapsed">Сеть партнеров</span>
        </button>

        <button class="menu-item" type="button">
          <img src="/assets/icons/link.svg" alt="link-icon">
          <span v-if="!isCollapsed">Связи</span>
        </button>

        <button class="menu-item" type="button">
          <img src="/assets/icons/spam.svg" alt="scam-icon">
          <span v-if="!isCollapsed">Скам-алерты</span>
        </button>

        <button class="menu-item" type="button">
          <img src="/assets/icons/waterfall-up.svg" alt="statistics-icon">
          <span v-if="!isCollapsed">Статистика</span>
        </button>
      </nav>

      <div class="sidebar-footer">
        <button class="menu-item ghost" type="button">
          <img src="/assets/icons/notification.svg" alt="notification-icon">
          <span v-if="!isCollapsed">Уведомления</span>
        </button>

        <button class="menu-item ghost" type="button">
          <img src="/assets/icons/setting.svg" alt="setting-icon">
          <span v-if="!isCollapsed">Настройки</span>
        </button>

        <button class="menu-item ghost" type="button">
          <img src="/assets/icons/telegram.svg" alt="telegram-icon">
          <span v-if="!isCollapsed">Telegram</span>
        </button>
      </div>
    </div>
  </aside>
</template>

<style lang="scss">
.sidebar {
  width: 240px;
  padding: 8px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  transition: width 0.25s ease;
}

.sidebar.collapsed {
  width: 72px;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  padding: 8px 10px;
  background: #F1F2F4CC;
  border-radius: 12px;
  height: 36px;
}

.sidebar-wrapper {
  display: flex;
  flex-direction: column;
  padding: 8px;
  background: #F1F2F4CC;
  flex-grow: 1;
  border-radius: 12px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;

  span {
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0;
    vertical-align: middle;
    color: #131313;
  }
}

.toggle-btn {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  border: none;
  background: #ececec;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sidebar-menu,
.sidebar-footer {
  display: grid;
  gap: 6px;
}

.sidebar-footer {
  margin-top: auto;
}

.menu-item {
  padding: 8px 10px;
  border: none;
  border-radius: 10px;
  background: transparent;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  color: #6b7280;

  span {
    white-space: nowrap;
    font-weight: 500;
    font-size: 14px;
    line-height: 1.4;
    vertical-align: middle;
    color: #838383;
  }
}

.menu-item.active {
  background: #FFFFFF;
  color: #131313;

  span {
    color: #131313;
  }
}

.menu-item.ghost {
  background: transparent;
}

.sidebar.collapsed .menu-item {
  justify-content: center;
  padding-left: 0;
  padding-right: 0;
}
</style>