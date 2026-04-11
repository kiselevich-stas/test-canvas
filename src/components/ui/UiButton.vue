<script setup lang="ts">
import { computed } from 'vue'

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost'
type IconPosition = 'left' | 'right'

const props = withDefaults(
    defineProps<{
      variant?: ButtonVariant
      block?: boolean
      type?: 'button' | 'submit' | 'reset'
      disabled?: boolean
      loading?: boolean
      icon?: string
      iconPosition?: IconPosition
      iconOnly?: boolean
    }>(),
    {
      variant: 'secondary',
      block: false,
      type: 'button',
      disabled: false,
      loading: false,
      icon: '',
      iconPosition: 'left',
      iconOnly: false,
    },
)

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const isDisabled = computed(() => props.disabled || props.loading)

const iconSrc = computed(() => {
  if (!props.icon) return ''
  return `/assets/icons/${props.icon}.svg`
})

const buttonClasses = computed(() => [
  'ui-button',
  `ui-button--${props.variant}`,
  {
    'ui-button--block': props.block,
    'ui-button--icon-only': props.iconOnly,
    'is-loading': props.loading,
    'is-disabled': isDisabled.value,
  },
])

function handleClick(event: MouseEvent) {
  if (isDisabled.value) {
    event.preventDefault()
    event.stopPropagation()
    return
  }

  emit('click', event)
}
</script>

<template>
  <button
      :type="type"
      :disabled="isDisabled"
      :aria-busy="loading"
      :aria-disabled="isDisabled"
      :class="buttonClasses"
      @click="handleClick"
  >
    <span v-if="loading" class="ui-button__loader" aria-hidden="true" />

    <span
        v-else-if="icon && iconPosition === 'left'"
        class="ui-button__icon"
        aria-hidden="true"
    >
      <img :src="iconSrc" alt="" />
    </span>

    <span v-if="!iconOnly" class="ui-button__label">
      <slot />
    </span>

    <span
        v-if="!loading && icon && iconPosition === 'right'"
        class="ui-button__icon"
        aria-hidden="true"
    >
      <img :src="iconSrc" alt="" />
    </span>
  </button>
</template>

<style scoped>
.ui-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: auto;
  min-height: 36px;
  padding: 0 14px;
  border: 1px solid transparent;
  border-radius: 12px;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  text-decoration: none;
  font: inherit;
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  transition:
      background-color 0.18s ease,
      border-color 0.18s ease,
      color 0.18s ease,
      transform 0.18s ease,
      box-shadow 0.18s ease,
      opacity 0.18s ease;
}

.ui-button:hover:not(:disabled) {
  transform: translateY(-1px);
}

.ui-button:active:not(:disabled) {
  transform: translateY(0);
}

.ui-button:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(31, 124, 255, 0.18);
}

.ui-button--block {
  width: 100%;
}

.ui-button--primary {
  background: #1f7cff;
  border-color: #1f7cff;
  color: #ffffff;
}

.ui-button--primary:hover:not(:disabled) {
  background: #176ee6;
  border-color: #176ee6;
}

.ui-button--secondary {
  background: #ffffff;
  border-color: transparent;
  color: #1f2937;
}

.ui-button--secondary:hover:not(:disabled) {
  background: #f8fafc;
}

.ui-button--danger {
  background: #f7e8e8;
  border-color: transparent;
  color: #ef4444;
}

.ui-button--danger:hover:not(:disabled) {
  background: #f3dede;
}

.ui-button--ghost {
  background: transparent;
  border-color: transparent;
  color: #374151;
}

.ui-button--ghost:hover:not(:disabled) {
  background: rgba(15, 23, 42, 0.05);
}

.ui-button.is-disabled,
.ui-button:disabled {
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
  opacity: 0.6;
}

.ui-button.is-loading {
  cursor: wait;
}

.ui-button__label {
  display: inline-flex;
  align-items: center;
}

.ui-button__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
}

.ui-button__icon img {
  display: block;
  width: 16px;
  height: 16px;
  object-fit: contain;
}

.ui-button__loader {
  width: 14px;
  height: 14px;
  flex: none;
  border-radius: 999px;
  border: 2px solid currentColor;
  border-right-color: transparent;
  animation: ui-button-spin 0.7s linear infinite;
}

@keyframes ui-button-spin {
  to {
    transform: rotate(360deg);
  }
}

.ui-button--icon-only {
  width: 36px;
  min-width: 36px;
  padding: 0;
}
</style>