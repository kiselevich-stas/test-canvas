<script setup lang="ts">
import { computed, reactive } from 'vue'
import BaseModal from '@/components/common/BaseModal.vue'
import UiButton from '@/components/ui/UiButton.vue'
import UiInput from '@/components/ui/UiInput.vue'
import UiImageUploader from '@/components/ui/UiImageUploader.vue'
import { useGraphStore } from '@/store/graphStore.js'
import { useToastStore } from '@/store/toast'

defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const graphStore = useGraphStore()
const toastStore = useToastStore()

const form = reactive({
  name: '',
  login: '',
  password: '',
  telegram: '',
  photo: '',
  type: 'merchant',
  status: 'active',
})

const isFormValid = computed(() => {
  return Boolean(
      form.name.trim() &&
      form.login.trim() &&
      form.password.trim() &&
      form.telegram.trim() &&
      form.photo.trim()
  )
})

function resetForm() {
  form.name = ''
  form.login = ''
  form.password = ''
  form.telegram = ''
  form.photo = ''
  form.type = 'merchant'
  form.status = 'active'
}

function close() {
  emit('update:modelValue', false)
}

function handleClose() {
  resetForm()
  close()
}

function validateForm() {
  if (!form.name.trim()) {
    toastStore.error('Введите название участника', 'Ошибка')
    return false
  }

  if (!form.login.trim()) {
    toastStore.error('Введите логин', 'Ошибка')
    return false
  }

  if (form.login.trim().length < 3) {
    toastStore.error('Логин должен быть не короче 3 символов', 'Ошибка')
    return false
  }

  if (!form.password.trim()) {
    toastStore.error('Введите пароль', 'Ошибка')
    return false
  }

  if (form.password.length < 6) {
    toastStore.error('Пароль должен быть не короче 6 символов', 'Ошибка')
    return false
  }

  if (!form.telegram.trim()) {
    toastStore.error('Введите ссылку Telegram', 'Ошибка')
    return false
  }

  const telegramPattern = /^https:\/\/t\.me\/[A-Za-z0-9_]+$/

  if (!telegramPattern.test(form.telegram.trim())) {
    toastStore.error('Укажите Telegram в формате https://t.me/username', 'Ошибка')
    return false
  }

  if (!form.photo.trim()) {
    toastStore.error('Загрузите фото участника', 'Ошибка')
    return false
  }

  return true
}

function handleSubmit() {
  if (!validateForm()) {
    return
  }

  graphStore.addParticipant({
    name: form.name.trim(),
    login: form.login.trim(),
    password: form.password,
    telegram: form.telegram.trim(),
    photo: form.photo,
    type: form.type,
    status: form.status,
  })

  toastStore.success('Участник успешно добавлен')
  resetForm()
  close()
}
</script>

<template>
  <BaseModal
      :model-value="modelValue"
      :width="310"
      @update:modelValue="$emit('update:modelValue', $event)"
      @close="handleClose"
  >
    <template #default>
      <div class="add-participant-modal">
        <div class="add-participant-modal__header">
          <div>
            <h2 class="add-participant-modal__title">Добавление участника</h2>
            <p class="add-participant-modal__subtitle">
              Заполните информацию о новом участнике
            </p>
          </div>

          <button
              class="add-participant-modal__close"
              type="button"
              aria-label="Закрыть"
              @click="handleClose"
          >
            <img src="/assets/icons/del.svg" alt="close">
          </button>
        </div>

        <div class="add-participant-modal__avatar-section">
          <UiImageUploader
              v-model="form.photo"
              button-text="Загрузить фото"
          />
        </div>

        <div class="add-participant-modal__form">
          <UiInput
              v-model="form.name"
              label="Название"
              placeholder="Введите название"
          />

          <UiInput
              v-model="form.login"
              label="Логин"
              placeholder="Введите логин"
          />

          <UiInput
              v-model="form.password"
              type="password"
              label="Пароль"
              placeholder="Введите пароль"
          />

          <UiInput
              v-model="form.telegram"
              label="Ссылка Telegram"
              placeholder="https://t.me/username"
          />
        </div>

        <div class="add-participant-modal__footer">
          <UiButton
              variant="secondary"
              type="button"
              block
              @click="handleClose"
          >
            Отмена
          </UiButton>

          <UiButton
              variant="primary"
              type="button"
              block
              :disabled="!isFormValid"
              @click="handleSubmit"
          >
            Добавить
          </UiButton>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<style scoped lang="scss">
.add-participant-modal {
  position: relative;
  padding: 12px;
  border-radius: 14px;
  background: #e6e6e6;
  box-shadow: 0 16px 40px rgba(31, 31, 36, 0.12);
}

.add-participant-modal__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
}

.add-participant-modal__title {
  margin: 0;
  font-size: 16px;
  line-height: 20px;
  font-weight: 700;
  color: #131313;
}

.add-participant-modal__subtitle {
  margin: 4px 0 0;
  font-size: 12px;
  line-height: 16px;
  color: #8f8f95;
}

.add-participant-modal__close {
  position: absolute;
  top: 12px;
  right: 8px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
  transition: 0.3s linear;

  img {
    width: 16px;
    height: 16px;
  }

  &:hover {
    background: #dcd7d7;
  }
}

.add-participant-modal__avatar-section {
  margin-top: 22px;
}

.add-participant-modal__form {
  display: grid;
  gap: 14px;
  margin-top: 18px;
}

.add-participant-modal__footer {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-top: 18px;
}
</style>