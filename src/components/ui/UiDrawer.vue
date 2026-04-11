<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: '360px',
  },
  closeOnEsc: {
    type: Boolean,
    default: true,
  },
  closeOnBackdrop: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  close: []
}>()

const drawerStyle = computed(() => ({
  '--ui-drawer-width': props.width,
}))

function close() {
  emit('update:modelValue', false)
  emit('close')
}

function handleKeydown(event: KeyboardEvent) {
  if (!props.closeOnEsc) return
  if (!props.modelValue) return
  if (event.key !== 'Escape') return

  close()
}

function handleBackdropClick() {
  if (!props.closeOnBackdrop) return
  close()
}

watch(
    () => props.modelValue,
    (isOpen) => {
      document.body.style.overflow = isOpen ? 'hidden' : ''
    },
    { immediate: true },
)

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <transition name="ui-drawer-fade">
      <div v-if="modelValue">
        <transition name="ui-drawer-slide">
          <aside class="ui-drawer" :style="drawerStyle" @click.stop>
            <header class="ui-drawer__header">
              <div class="ui-drawer__head">
                <slot name="header">
                  <div v-if="title" class="ui-drawer__title">{{ title }}</div>
                </slot>
              </div>

              <button class="ui-drawer__close" type="button" aria-label="Закрыть" @click="close">
                ×
              </button>
            </header>

            <div class="ui-drawer__content">
              <slot />
            </div>

            <footer v-if="$slots.footer" class="ui-drawer__footer">
              <slot name="footer" />
            </footer>
          </aside>
        </transition>
      </div>
    </transition>
  </Teleport>
</template>
<style scoped>
.ui-drawer-backdrop {
  position: fixed;
  inset: 0;
  z-index: 50;
  background: transparent;
  backdrop-filter: none;
}

.ui-drawer {
  position: absolute;
  top: 10px;
  right: 10px;
  bottom: 10px;
  display: grid;
  grid-template-rows: auto 1fr auto;
  background: #ebebee;
  border: 0;
  border-radius: 28px;
  box-shadow: none;
  overflow: hidden;
  max-width: 343px;
  width: 100%;
}

.ui-drawer__header {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 20px 16px 10px;
}

.ui-drawer__head {
  min-width: 0;
  width: 100%;
}

.ui-drawer__title {
  font-size: 18px;
  font-weight: 700;
  color: #111827;
}

.ui-drawer__close {
  flex: none;
  width: 40px;
  height: 40px;
  border: 0;
  border-radius: 14px;
  background: #e2e2e7;
  color: #9ca3af;
  font: inherit;
  font-size: 28px;
  line-height: 1;
  cursor: pointer;
}

.ui-drawer__close:hover {
  background: #d9d9df;
  color: #6b7280;
}

.ui-drawer__content {
  min-height: 0;
  overflow: auto;
  padding: 0 16px 16px;
}

.ui-drawer__footer {
  display: flex;
  gap: 10px;
  padding: 12px 16px 18px;
  background: #ebebee;
}

.ui-drawer-fade-enter-active,
.ui-drawer-fade-leave-active,
.ui-drawer-slide-enter-active,
.ui-drawer-slide-leave-active {
  transition: all 0.18s ease;
}

.ui-drawer-fade-enter-from,
.ui-drawer-fade-leave-to {
  opacity: 0;
}

.ui-drawer-slide-enter-from,
.ui-drawer-slide-leave-to {
  opacity: 0;
  transform: translateX(18px);
}


/* Chrome, Edge, Safari */
.ui-drawer__content::-webkit-scrollbar {
  width: 6px;
}

.ui-drawer__content::-webkit-scrollbar-track {
  background: transparent;
}

.ui-drawer__content::-webkit-scrollbar-thumb {
  background: #cfcfd6;
  border-radius: 999px;
}

.ui-drawer__content::-webkit-scrollbar-thumb:hover {
  background: #b9bac3;
}

</style>