<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useToastStore} from "@/store/toast";
import UiToastItem from "@/components/ui/toast/UiToastItem.vue";

const toastStore = useToastStore()
const { items } = storeToRefs(toastStore)

function handleClose(id: string): void {
  toastStore.remove(id)
}
</script>

<template>
  <Teleport to="body">
    <div class="ui-toast-container">
      <TransitionGroup
          name="toast-list"
          tag="div"
          class="ui-toast-container__list"
      >
        <UiToastItem
            v-for="toast in items"
            :key="toast.id"
            :toast="toast"
            @close="handleClose"
        />
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
.ui-toast-container {
  position: fixed;
  left: 50%;
  bottom: 24px;
  z-index: 9999;
  transform: translateX(-50%);
  pointer-events: none;
  width: min(100%, 760px);
  padding: 0 16px;

  &__list {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }
}

:deep(.toast-list-enter-active),
:deep(.toast-list-leave-active),
:deep(.toast-list-move) {
  transition:
      opacity 0.3s ease,
      transform 0.3s ease;
}

:deep(.toast-list-enter-from) {
  opacity: 0;
  transform: translateY(20px) scale(0.96);
}

:deep(.toast-list-leave-to) {
  opacity: 0;
  transform: translateY(16px) scale(0.96);
}

:deep(.toast-list-leave-active) {
  position: absolute;
}
</style>