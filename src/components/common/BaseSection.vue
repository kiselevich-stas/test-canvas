<template>
  <div class="base-section">
    <slot></slot>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.base-section{
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 14px 16px 12px;
  background: #f2f2f4;
  border-radius: 16px;
  overflow: auto;

}
</style>