<template>
  <div class="content">
    <button class="goHome" @click="goHome">首页</button>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";

defineOptions({ name: "LoginPage" });
const router = useRouter();
const goHome = () => {
  router.push("/home");
};
</script>

<style lang="scss" scoped>
.content {
  background: #2b5cab;
  // background-image: url(noise.png);
  background-image: url("noise.png");
  background-attachment: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .goHome {
    width: 144px;
    height: 48px;
    background-color: #fff;
    // border: 3px ridge rgba(250, 69, 49, 0.1);
    border: 3px ridge rgba(43, 92, 171, 0.1);
    border-radius: 12px;
    font-size: 24px;
    font-weight: 900;
    cursor: pointer;
    // color: rgb(250, 69, 49);
    color: #2b5cab;
    font-weight: 900;
    letter-spacing: 2px;
    transition: all .3s linear;
  }

  .goHome:hover {
    // background-color: #000;
    // background-color: rgb(250, 69, 49);
    background-color: #2b5cab;
    color: #fff;
  }

  .goHome:active {
    transform: matrix3d(0.95, 0, 0, 0, 0, 0.95, 0, 0, 0, 0, 0.95, 0, 0, 0, 0, 1);
  }
}
</style>
