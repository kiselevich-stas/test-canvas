<script setup>
import UiButton from '@/components/ui/UiButton.vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  buttonText: {
    type: String,
    default: 'Загрузить фото',
  },
  buttonDeleteText: {
    type: String,
    default: 'Очистить фото',
  },
  accept: {
    type: String,
    default: 'image/*',
  },
})

const emit = defineEmits(['update:modelValue'])

function openFilePicker() {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = props.accept

  input.onchange = () => {
    const file = input.files?.[0]

    if (!file) {
      return
    }

    const fileUrl = URL.createObjectURL(file)
    emit('update:modelValue', fileUrl)
  }

  input.click()
}

function removeImage() {
  emit('update:modelValue', '')
}
</script>

<template>
  <div class="ui-image-uploader">
    <div class="ui-image-uploader__preview">
      <img
          v-if="modelValue"
          :src="modelValue"
          alt="Загруженное фото"
          class="ui-image-uploader__image"
      >
      <span
          v-else
          class="ui-image-uploader__placeholder"
      >
        ⦿
      </span>
    </div>
    <div class="ui-image-uploader__actions">
      <UiButton
          v-if="!modelValue"
          variant="secondary"
          type="button"
          @click="openFilePicker"
      >
        {{ buttonText }}
      </UiButton>
      <UiButton
          v-else
          variant="secondary"
          type="button"
          @click="removeImage"
      >
        {{ buttonDeleteText }}
      </UiButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
.ui-image-uploader {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.ui-image-uploader__preview {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 92px;
  height: 92px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.72);
}

.ui-image-uploader__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ui-image-uploader__placeholder {
  font-size: 24px;
  color: #bfc3cb;
}

.ui-image-uploader__actions {
  display: flex;
  align-items: center;
  gap: 8px;
}
.delete-image{
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -50%) !important;
}
</style>