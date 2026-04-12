<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import BaseModal from '@/components/common/BaseModal.vue'
import BaseSearchSelect from '@/components/common/BaseSearchSelect.vue'
import UiButton from '@/components/ui/UiButton.vue'
import { useConnectionsStore } from '@/store/connectionsStore'
import type { BaseSearchSelectOption } from '@/components/common/BaseSearchSelect.vue'

interface Props {
  modelValue: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  success: []
}>()

const connectionsStore = useConnectionsStore()

const {
  isSubmittingRequest,
  requestSearchQuery,
  requestSearchResults,
  isRequestSearchLoading,
} = storeToRefs(connectionsStore)

const selectedOptions = ref<BaseSearchSelectOption[]>([])

const searchOptions = computed<BaseSearchSelectOption[]>(() => {
  return requestSearchResults.value.map((participant) => ({
    id: participant.id,
    label: participant.name,
    caption: participant.roleLabel,
    shortName: participant.shortName,
    badgeVariant: participant.roleKey,
  }))
})

const isSubmitDisabled = computed(() => {
  return isSubmittingRequest.value || !selectedOptions.value.length
})

function closeModal(): void {
  emit('update:modelValue', false)
}

function handleSearch(query: string): void {
  connectionsStore.searchRequestParticipants(query)
}

function handleUpdateSearch(query: string): void {
  connectionsStore.setRequestSearchQuery(query)
}

async function handleSubmit(): Promise<void> {
  const selectedIds = selectedOptions.value.map((item) => item.id)

  await connectionsStore.submitConnectionRequest(selectedIds)

  selectedOptions.value = []
  connectionsStore.resetRequestSearch()

  emit('update:modelValue', false)
  emit('success')
}

watch(
    () => props.modelValue,
    (isOpen) => {
      if (!isOpen) {
        selectedOptions.value = []
        connectionsStore.resetRequestSearch()
        return
      }

      connectionsStore.openRequestModal()
    },
)
</script>

<template>
  <BaseModal
      :model-value="modelValue"
      :width="370"
      @update:modelValue="emit('update:modelValue', $event)"
      @close="closeModal"
  >
    <div class="connections-request-modal">
      <button
          type="button"
          class="connections-request-modal__close"
          @click="closeModal"
      >
        <img src="/assets/icons/del.svg" alt="close">
      </button>

      <div class="connections-request-modal__title">
        Запросить связь
      </div>

      <div class="connections-request-modal__description">
        Запрос будет отправлен выбранному участнику на подтверждение
      </div>

      <div class="connections-request-modal__search">
        <BaseSearchSelect
            v-model="selectedOptions"
            :search="requestSearchQuery"
            :options="searchOptions"
            :loading="isRequestSearchLoading"
            placeholder="Поиск..."
            empty-text="Участники не найдены"
            @update:search="handleUpdateSearch"
            @search="handleSearch"
        />
      </div>

      <div class="connections-request-modal__actions">
        <UiButton
            variant="secondary"
            size="sm"
            class="connections-request-modal__button"
            @click="closeModal"
        >
          Отмена
        </UiButton>

        <UiButton
            variant="primary"
            size="sm"
            class="connections-request-modal__button"
            :disabled="isSubmitDisabled"
            :loading="isSubmittingRequest"
            @click="handleSubmit"
        >
          Отправить запрос
        </UiButton>
      </div>
    </div>
  </BaseModal>
</template>

<style scoped lang="scss">
.connections-request-modal {
  position: relative;
  padding: 12px;
  border-radius: 14px;
  background: #E6E6E6;
  box-shadow: 0 16px 40px rgba(31, 31, 36, 0.12);
}

.connections-request-modal__close {
  position: absolute;
  top: 12px;
  right: 8px;
  border: none;
  background: transparent;
  color: #b6b6bd;
  cursor: pointer;
  font-size: 12px;
  line-height: 1;
  transition: 0.3s linear;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
    border-radius: 50%;
  justify-content: center;
  &:hover{
    background: #dcd7d7;
  }
}

.connections-request-modal__title {
  padding-right: 20px;
  color: #232329;

  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: -4%;
  vertical-align: middle;

}

.connections-request-modal__description {
  margin-top: 4px;
  color: #9d9da5;

  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  letter-spacing: -4%;
  vertical-align: middle;

}

.connections-request-modal__search {
  margin-top: 14px;
}

.connections-request-modal__actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-top: 14px;
}

.connections-request-modal__button {
  width: 100%;
}
</style>