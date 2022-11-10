<template>
  <div v-show="!dis" class="page">
    <div class="topInfo">
      <div>太原供水</div>
      <div>有限空间作业</div>
    </div>
    <div>
      <button class="buttonList" @click="goPage(index)" :class="index === focusButton ? 'buttonActive' : ''"
        v-for="(button, index) in buttonList">
        {{ button.name }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
let dis = computed(() => {
  return router.currentRoute.value.path == "/home/info";
});
let focusButton = ref(0);
let buttonList = ref([
  {
    name: "审批列表",
    path: "/list",
  },
  {
    name: "审批列表",
    path: "/list",
  },
  {
    name: "审批列表",
    path: "/list",
  },
  {
    name: "审批列表",
    path: "/list",
  },
]);
let goPage = (index) => {
  focusButton.value = index;
  router.push("/home" + buttonList.value[index].path);
};
onMounted(() => {
  if (router.currentRoute.value.fullPath === "/home") {
    router.push("/home" + buttonList.value[0].path);
  }
});
</script>

<style lang="scss" scoped>
.page {
  padding: 4px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  .topInfo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 22px;
    font-weight: 600;
    width: 100%;
    height: 120px;
    background-color: #fff;
    color: #073a8d;
    // box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    // padding: 0 10px;
  }

  .buttonList {
    width: 90%;
    height: 40px;
    background-color: #fff;
    border: none;
    border-radius: 5px;
    margin: 5px 0;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;

    &:hover {
      background-color: #2b5cab99;
      color: #fff;
    }
  }

  .buttonActive {
    background-color: #2b5cab;
    color: #fff;
  }
}
</style>
