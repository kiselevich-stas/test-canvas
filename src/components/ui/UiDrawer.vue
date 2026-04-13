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

  overlay: {
    type: Boolean,
    default: false,
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
        <div
            v-if="overlay"
            class="ui-drawer-backdrop"
            @click="handleBackdropClick"
        />

        <transition name="ui-drawer-slide">
          <aside class="ui-drawer" :style="drawerStyle" @click.stop>
            <header class="ui-drawer__header">
              <div class="ui-drawer__head">
                <slot name="header">
                  <div v-if="title" class="ui-drawer__title">
                    {{ title }}
                  </div>
                </slot>
              </div>

              <button
                  class="ui-drawer__close"
                  type="button"
                  aria-label="Закрыть"
                  @click="close"
              >
                <img src="/assets/icons/del.svg" alt="close">
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
/* 👇 overlay на весь экран */
.ui-drawer-backdrop {
  position: fixed;
  inset: 0;
  z-index: 50;
  background: rgba(17, 24, 39, 0.16);
  backdrop-filter: blur(2px);
}

.ui-drawer {
  position: absolute;
  top: 10px;
  right: 10px;
  bottom: 10px;
  display: grid;
  grid-template-rows: auto 1fr auto;

  width: min(var(--ui-drawer-width), calc(100vw - 20px));
  max-width: 343px;

  background: #ebebee;
  border-radius: 28px;
  overflow: hidden;
  z-index: 51; /* выше overlay */
}

.ui-drawer__header {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 20px 16px 10px;
}

.ui-drawer__head {
  width: 100%;
}

.ui-drawer__title {
  font-size: 18px;
  font-weight: 700;
  color: #111827;
}

.ui-drawer__close {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
  box-shadow: none;
  background: transparent;
  padding: 0;
  height: 30px;
  width: 30px;
  position: relative;
  top: -4px;
  transition: 0.3s linear;
  cursor: pointer;
  border-radius: 50%;
  &:hover{
    background: #dcd7d7;
  }
}

.ui-drawer__content {
  overflow: auto;
  padding: 0 16px 16px;
}

.ui-drawer__footer {
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
</style>