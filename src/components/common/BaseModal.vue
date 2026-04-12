<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, watch } from 'vue'

interface Props {
  modelValue: boolean
  width?: number | string
  closeOnOverlay?: boolean
  closeOnEsc?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  width: 420,
  closeOnOverlay: true,
  closeOnEsc: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  close: []
}>()

const modalWidth = computed(() => {
  return typeof props.width === 'number' ? `${props.width}px` : props.width
})

function close(): void {
  emit('update:modelValue', false)
  emit('close')
}

function handleOverlayClick(): void {
  if (!props.closeOnOverlay) {
    return
  }

  close()
}

function handleKeydown(event: KeyboardEvent): void {
  if (!props.modelValue || !props.closeOnEsc) {
    return
  }

  if (event.key === 'Escape') {
    close()
  }
}

watch(
    () => props.modelValue,
    (isOpen) => {
      if (typeof document === 'undefined') {
        return
      }

      document.body.style.overflow = isOpen ? 'hidden' : ''
    },
)

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)

  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition name="base-modal-fade">
      <div
          v-if="modelValue"
          class="base-modal"
      >
        <div
            class="base-modal__overlay"
            @click="handleOverlayClick"
        />

        <div class="base-modal__wrapper">
          <div
              class="base-modal__content"
              :style="{ width: modalWidth }"
              @click.stop
          >
            <slot :close="close" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
.base-modal {
  position: fixed;
  inset: 0;
  z-index: 1200;
}

.base-modal__overlay {
  position: absolute;
  inset: 0;
  background: rgba(14, 14, 18, 0.18);
  backdrop-filter: blur(2px);
}

.base-modal__wrapper {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  padding: 24px;
  box-sizing: border-box;
}

.base-modal__content {
  max-width: calc(100vw - 32px);
}

:global(.base-modal-fade-enter-active),
:global(.base-modal-fade-leave-active) {
  transition: opacity 0.2s ease;
}

:global(.base-modal-fade-enter-from),
:global(.base-modal-fade-leave-to) {
  opacity: 0;
}
</style>