<script lang="ts" setup>
import leftBar from "./components/leftBar.vue";
</script>

<template>
  <div class="app">
    <RouterView class="appview" />
  </div>
</template>

<style lang="scss" scoped>
.app {
  text-align: center;
  background: rgb(235, 238, 248);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: row;
  font-size: 14px;

  .appview {
    width: 100%;
    height: 100%;
  }
}
</style>
