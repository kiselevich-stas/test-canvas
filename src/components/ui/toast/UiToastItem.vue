<script setup lang="ts">
import { computed } from 'vue'
import type { ToastItem} from "@/types/toast";

interface Props {
  toast: ToastItem
}

const props = defineProps<Props>()

const emit = defineEmits<{
  close: [id: string]
}>()

const iconSrc = computed(() => {
  switch (props.toast.type) {
    case 'warning':
      return '/assets/icons/toast/hourglass.svg'
    case 'success':
      return '/assets/icons/toast/success.svg' // если добавишь
    case 'error':
      return '/assets/icons/toast/error.svg'
    case 'info':
    default:
      return '/assets/icons/toast/info.svg'
  }
})
</script>

<template>
  <div
      class="ui-toast-item"
      :class="`ui-toast-item--${toast.type}`"
  >
    <div class="ui-toast-item__icon">
      <img
          v-if="iconSrc"
          :src="iconSrc"
          alt=""
          class="ui-toast-item__icon-img"
      />
    </div>

    <div class="ui-toast-item__content">
      <p v-if="toast.title" class="ui-toast-item__title">
        {{ toast.title }}
      </p>

      <p class="ui-toast-item__message">
        {{ toast.message }}
      </p>
    </div>

    <button
        v-if="toast.closable !== false"
        class="ui-toast-item__close"
        @click="emit('close', toast.id)"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.5286 3.52864C11.789 3.26829 12.211 3.26829 12.4713 3.52864C12.7317 3.78899 12.7317 4.21099 12.4713 4.47134L8.9427 7.99999L12.4713 11.5286L12.5169 11.5794C12.7305 11.8413 12.7154 12.2273 12.4713 12.4713C12.2273 12.7154 11.8413 12.7305 11.5794 12.5169L11.5286 12.4713L7.99999 8.9427L4.47134 12.4713C4.21099 12.7317 3.78899 12.7317 3.52864 12.4713C3.26829 12.211 3.26829 11.789 3.52864 11.5286L7.05728 7.99999L3.52864 4.47134C3.26829 4.211 3.26829 3.78899 3.52864 3.52864C3.78899 3.26829 4.21099 3.26829 4.47134 3.52864L7.99999 7.05728L11.5286 3.52864Z" fill="currentColor"/>
      </svg>

    </button>
  </div>
</template>

<style scoped lang="scss">
.ui-toast-item {
  pointer-events: auto;
  display: flex;
  align-items: center;
  gap: 8px;
  max-width: 600px;
  width: 100%;
  min-height: 52px;
  padding: 8px;
  border-radius: 8px;
  backdrop-filter: blur(32px);

  &__content {
    flex: 1;
    min-width: 0;
  }

  &__title {
    font-weight: 500;
    font-size: 14px;
    line-height: 1.2;
    letter-spacing: -4%;
   margin: 0;
  }

  &__message {
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: -4%;
    margin: 2px 0 0;

    color: #838383;
    word-break: break-word;
  }

  &__close {
    top: -4px;
    position: relative;
    flex: 0 0 auto;
    align-self: baseline;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    padding: 0;
    margin-top: 1px;
    border: none;
    background: transparent;
    border-radius: 50%;
    cursor: pointer;
    font-size: 14px;
    line-height: 1;
    transition:
        opacity 0.2s ease,
        transform 0.2s ease,
        background-color 0.2s ease;
    color: #B3B3B3;
    &:hover {
      opacity: 1;
      transform: scale(1.05);
      background: #f3e2d6;
    }
  }

  &--success {
    background: #edf9f0;
    color: #1f6b37;
  }

  &--error {
    background: #fff1f1;
    color: #a12a2a;
  }

  &--warning {
    background: #FF7B2F1A;
    color: #FF7B2F;
  }

  &--info {
    background: #eef5ff;
    color: #2d5ea8;
  }
}
</style>