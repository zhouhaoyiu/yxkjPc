<template>
  <div class="content">
    <button class="goHome" @click="goHome">去首页</button>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
const router = useRouter();
const goHome = () => {
  router.push("/home");
};
</script>

<style lang="scss" scoped>
.content {
  background: #d6eff8;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .goHome {
    width: 100px;
    height: 40px;
    background-color: #fff;
    border: 1px solid #000;
    border-radius: 5px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
  }
}
</style>
