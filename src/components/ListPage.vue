<script lang="ts" setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
let page = ref(1);
let list = ref([
  {
    jobId: "1",
    jobContent: "1",
    jobGroup: "1",
    jobUuid: "1",
    jly: "1",
  },
]);
async function getInfoByPage() {
  const res = await axios.get(
    "http://localhost:8092/Job/adminGetSendJobByPage",
    {
      params: {
        page: page.value,
        size: 10,
      },
    }
  );
  console.log(res.data);
  list.value = res.data;
}

async function exportToTable(UUID: any) {
  router.push({ path: "/home/info", query: { UUID: UUID } });
}
onMounted(() => {
  getInfoByPage();
});
</script>

<template>
  <div style="overflow-y: auto">
    <h1>查找区域</h1>
    <div class="listContent">
      <div class="list" v-for="i in list" :key="i.jobId" @click="exportToTable(i.jobUuid)">
        <div class="jobContent">{{ i.jly }} 记录的{{ i.jobContent }}</div>
        <div>
          {{ i.jobGroup }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.listContent {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  .list {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    width: 200px;
    height: 70px;
    padding: 10px;
    margin: 7px;
    border-radius: 6px;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
    background-color: #3c5678;
    color: #fff;
    cursor: pointer;
    user-select: none;

    &:hover {
      background-color: rgba(42, 94, 197, 0.8);
      transform: scale(0.97);
    }

    &:active {
      background-color: rgba(42, 94, 197, 0.8);
      transform: scale(0.95);
    }

    .jobContent {
      font-size: 15px;
      font-weight: bold;
    }
  }
}
</style>
