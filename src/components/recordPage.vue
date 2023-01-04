<template>
  <div style="overflow-y: auto">
    <div>
      <!-- 调整list大小的radio -->
      <el-radio-group v-model="size" @change="handleSizeChange">
        <el-radio-button label="large">大型</el-radio-button>
        <el-radio-button label="medium">中等</el-radio-button>
        <el-radio-button label="small">小型</el-radio-button>
      </el-radio-group>
    </div>
    <div class="searchArea">
      <div style="width: max-content; margin-left: 20px">
        <strong> 作业日期： </strong>
        <el-date-picker v-model="selectDate" type="daterange" unlink-panels range-separator="到" start-placeholder="开始日期"
          end-placeholder="结束日期" :shortcuts="shortcuts" />
      </div>
    </div>
    <div class="listContent">
      <div class="list" v-for="(i, index) in list" :key="i.workId" @click="exportToTable(i.jobUuid)" :style="listStyle"
        style="background-color: #3c5678">
        <div class="jobContent">有限空间作业审批{{ index + 1 }}</div>
        <div class="jobDate">
          {{ i.jobDate }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import axios from "axios";
import { computed, onBeforeMount, onMounted, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { shortcuts } from "./share";
let selectDate = ref([]);
let baseList = ref([]);
let page = ref(1);
let size = ref("medium");
let list = ref([
  {
    workId: "1",
    jobContent: "1",
    jobUuid: "1",
    jobDate: "1",
    status: 1,
  },
]);
const router = useRouter();
// let baseList = ref([]);
onBeforeMount(() => {
  size.value = localStorage.getItem("size") || "medium";
});
watchEffect(() => {
  if (!selectDate.value[0]) {
    list.value = baseList.value;
  }
})

async function getInfoByPage() {
  const res = await axios.get(
    "http://localhost:8092/recordJob/adminGetSendRecordJobByPage",
    {
      params: {
        page: page.value,
      },
    }
  );
  console.log(res);
  list.value = res.data;
  baseList.value = res.data;
}
onMounted(() => {
  getInfoByPage();
});
let handleSizeChange = (e: string) => {
  size.value = e;
  localStorage.setItem("size", e);
};
let listStyle = computed(() => {
  switch (size.value) {
    case "small":
      return "width: 13%;margin: 8px;";
    case "medium":
      return "width: 31%;margin: 6px 12px;";
    case "large":
      return "width: 46%;";
    default:
      return "width: 31%;margin: 6px 12px;";
  }
});

async function exportToTable(UUID: string) {
  router.push({ path: "/home/recordInfo", query: { UUID: UUID } });
}

</script>

<style lang="scss" scoped>
.searchArea {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
  width: 100%;
  height: 50px;
  // background-color: #fff;
  border: 1px solid #3c56785c;
  border-radius: 8px;
  box-shadow: 0 0 5px 0 #d5dce577;
}

.listContent {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  text-align: left;

  .list {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    width: 46%;
    height: 73px;
    padding: 5px 8px 15px 8px;
    margin: 5px 15px;
    border-radius: 8px;
    box-shadow: 0 0 10px 0 #485d7a85;
    // border: 1px solid #3c56788a;
    // background-color: #3c5678;
    color: rgb(255, 255, 255);
    cursor: pointer;
    user-select: none;

    &:hover {
      // background-color: rgba(42, 94, 197, 0.8);
      transform: scale(0.97);
    }

    &:active {
      // background-color: rgba(42, 94, 197, 0.8);
      transform: scale(0.95);
    }

    .jobContent {
      font-size: 15px;
      font-weight: bold;
    }

    .jobDate {
      color: rgb(226, 226, 226);
    }
  }
}
</style>
