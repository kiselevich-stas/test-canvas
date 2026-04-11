<script setup>
defineEmits(['zoom-in', 'zoom-out', 'fit', 'reset'])
</script>

<template>
  <div class="panel toolbar-panel">
    <div class="panel-title">Управление</div>
    <div class="toolbar-row">
      <button class="ui-button" @click="$emit('zoom-in')">+</button>
      <button class="ui-button" @click="$emit('zoom-out')">−</button>
      <button class="ui-button wide" @click="$emit('fit')">Fit</button>
      <button class="ui-button wide" @click="$emit('reset')">Reset</button>
    </div>
    <div class="toolbar-hint">
      Колесо мыши — zoom, drag по пустому месту — pan, drag по узлу — перемещение.
    </div>
  </div>
</template>
