<script setup lang="ts">
import LoginForm from '@/components/auth/LoginForm.vue'
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

      <LoginForm />
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
  letter-spacing: -0.04em;
  text-align: center;
  color: #838383;
}
</style>