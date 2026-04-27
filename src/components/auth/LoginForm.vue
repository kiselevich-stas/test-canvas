<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import UiButton from '@/components/ui/UiButton.vue'
import UiInput from '@/components/ui/UiInput.vue'
import UiCheckbox from '@/components/ui/UiCheckbox.vue'
import { useAuthStore } from '@/store/authStore'

const router = useRouter()
const authStore = useAuthStore()

onMounted(() => {
  authStore.getCaptcha()
})

async function handleSubmit(): Promise<void> {
  const success = await authStore.login()

  if (success) {
    await router.push({ name: 'network' })
  }
}
</script>

<template>
  <form
      class="login-page__form"
      @submit.prevent="handleSubmit"
  >
    <Transition name="fade">
      <p
          v-if="authStore.errorText.value"
          class="login-page__error"
      >
        {{ authStore.errorText.value }}
      </p>
    </Transition>

    <UiInput
        v-model="authStore.form.login"
        label="Логин"
        placeholder="Введите логин"
        :error="authStore.errors.login"
    />

    <UiInput
        v-model="authStore.form.password"
        type="password"
        label="Пароль"
        placeholder="Введите пароль"
        :error="authStore.errors.password"
    />

    <UiCheckbox
        v-model="authStore.form.remember"
        label="Запомнить меня"
    />

    <UiButton
        variant="primary"
        block
        type="submit"
        :loading="authStore.loading.value"
        :disabled="!authStore.form.login || !authStore.form.password || authStore.loading.value"
    >
      Войти
    </UiButton>
  </form>
</template>

<style scoped lang="scss">
.login-page__form {
  display: grid;
  gap: 14px;
  margin-top: 24px;
}

.login-page__error {
  margin: 0;
  font-size: 13px;
  line-height: 18px;
  text-align: center;
  color: #e53935;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>