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

</script>

<template>
  <div
      class="ui-toast-item"
      :class="`ui-toast-item--${toast.type}`"
  >
    <div class="ui-toast-item__icon">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.25 19C18.25 15.5482 15.4518 12.75 12 12.75C8.54822 12.75 5.75 15.5482 5.75 19V22H4.25V19C4.25 15.9112 6.05736 13.2453 8.67188 12C6.05736 10.7547 4.25 8.08879 4.25 5V2H5.75V5C5.75 8.45178 8.54822 11.25 12 11.25C15.4518 11.25 18.25 8.45178 18.25 5V2H19.75V5C19.75 8.0891 17.9421 10.7549 15.3271 12C17.9421 13.2451 19.75 15.9109 19.75 19V22H18.25V19Z" fill="currentColor"/>
        <path d="M20 21.25C20.4142 21.25 20.75 21.5858 20.75 22C20.75 22.4142 20.4142 22.75 20 22.75H4C3.58579 22.75 3.25 22.4142 3.25 22C3.25 21.5858 3.58579 21.25 4 21.25H20ZM20 1.25C20.4142 1.25 20.75 1.58579 20.75 2C20.75 2.41421 20.4142 2.75 20 2.75H4C3.58579 2.75 3.25 2.41421 3.25 2C3.25 1.58579 3.58579 1.25 4 1.25H20Z" fill="currentColor"/>
      </svg>
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
      background: #ffffff4d;
    }
  }

  &--success {
    background: #03B65C20;
    color: #03B65C;
  }

  &--error {
    background: #E539351A;
    color: #E53935;
  }

  &--warning {
    background: #FF7B2F1A;
    color: #FF7B2F;
  }

  &--info {
    background: #007BFF20;
    color: #007BFF;
  }
}
</style>