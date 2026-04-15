<script setup>
import { computed, reactive } from 'vue'
import UiButton from '@/components/ui/UiButton.vue'
import UiInput from '@/components/ui/UiInput.vue'
import UiCheckbox from '@/components/ui/UiCheckbox.vue'

const form = reactive({
  login: '',
  password: '',
  remember: true,
})

const isFormFilled = computed(() => {
  return Boolean(form.login.trim() && form.password.trim())
})

function handleSubmit() {
  if (!isFormFilled.value) {
    return
  }

  console.log('login payload', {
    login: form.login,
    password: form.password,
    remember: form.remember,
  })
}
</script>

<template>
  <div class="login-page">
    <div class="login-page__card">
      <img
          class="login-page__logo"
          src="/assets/icons/logo.svg"
          alt="Twix logo"
      >

      <h1 class="login-page__title">
        Вход в систему
      </h1>

      <p class="login-page__subtitle">
        Введите свои данные для доступа
        <br>
        к панели управления
      </p>

      <div class="login-page__form">
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

        <UiCheckbox
            v-model="form.remember"
            label="Запомнить меня"
        />

        <UiButton
            variant="primary"
            block
            type="button"
            :disabled="!isFormFilled"
            @click="handleSubmit"
        >
          Войти
        </UiButton>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  box-sizing: border-box;
  background: #E6E6E6;
}

.login-page__card {
  width: 100%;
  max-width: 343px;
  padding: 32px 16px 16px;
  border-radius: 14px;
  background: #F1F2F4CC;
  box-sizing: border-box;
}

.login-page__logo {
  display: block;
  width: 54px;
  height: 54px;
  margin: 0 auto 16px;
  object-fit: contain;
}

.login-page__title {
  margin: 0;
  text-align: center;
  font-size: 18px;
  line-height: 24px;
  font-weight: 700;
  color: #131313;
}

.login-page__subtitle {
  margin: 6px 0 0;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.3;
  letter-spacing: -4%;
  text-align: center;
  vertical-align: middle;
  color: #838383;

}

.login-page__form {
  display: grid;
  gap: 14px;
  margin-top: 24px;
}
</style>