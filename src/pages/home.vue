<script lang="ts" setup>
import leftBar from "../components/leftBar.vue";
</script>

<template>
  <div class="home">
    <leftBar class="leftBar" />
    <RouterView class="routerview" />
  </div>
</template>

<style lang="scss" scoped>
.home {
  text-align: center;
  background: rgb(235, 238, 248);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: row;
  font-size: 14px;
  .leftBar {
    width: 220px;
    min-width: 220px;
    height: 100%;
    background-color: #fff;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  }
  .routerview {
    width: 100%;
    height: 100%;
    padding: 1%;
    // overflow-y: scroll;
  }
}
</style>
