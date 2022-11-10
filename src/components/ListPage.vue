<script lang="ts" setup>
import axios from "axios";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const shortcuts = [
  {
    text: "Last week",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      return [start, end];
    },
  },
  {
    text: "Last month",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      return [start, end];
    },
  },
  {
    text: "Last 3 months",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      return [start, end];
    },
  },
];
let page = ref(1);
let jobGroup = ref("");
let selectDate = ref([]);
const jobGroups = [
  { label: "机运队", value: "机运队" },
  { label: "管道队", value: "管道队" },
  { label: "消防组", value: "消防组" },
  { label: "巡视工段", value: "巡视工段" },
  { label: "管理工段", value: "管理工段" },
  { label: "营销一段", value: "营销一段" },
  { label: "户表一段", value: "户表一段" },
  { label: "户表二段", value: "户表二段" },
  { label: "户表三段", value: "户表三段" },
  { label: "户表四段", value: "户表四段" },
];
let list = ref([
  {
    jobId: "1",
    jobContent: "1",
    jobGroup: "1",
    jobUuid: "1",
    jly: "1",
    jobDate: "1",
  },
]);

let sendSearch = () => {
  console.log("sendSearch");
  console.log(jobGroup.value);
  console.log(selectDate.value);
  console.log(page.value);
};
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
async function exportToTable(UUID: string) {
  router.push({ path: "/home/info", query: { UUID: UUID } });
}

let size = ref("medium");
let handleSizeChange = (e) => {
  size.value = e;
  localStorage.setItem("size", e);
};

let listStyle = computed(() => {
  switch (size.value) {
    case "small":
      return "width: 13%;margin:8px";
    case "medium":
      return "width: 31%;margin:12px";
    case "large":
      return "width: 46%;";
  }
});

onMounted(() => {
  getInfoByPage();
  size.value = localStorage.getItem("size") || "medium";
});
</script>

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
      作业段组：
      <el-select v-model="jobGroup" multiple placeholder="请选择作业段组" collapse-tags collapse-tags-tooltip
        style="width: 180px">
        <el-option v-for="item in jobGroups" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <div style="width: max-content; margin-left: 20px">
        作业日期：
        <el-date-picker v-model="selectDate" type="daterange" unlink-panels range-separator="到" start-placeholder="开始日期"
          end-placeholder="结束日期" :shortcuts="shortcuts" />
      </div>
      <el-button type="primary" style="margin-left: 10px; height: 30px" @click="sendSearch">查询</el-button>
    </div>
    <div class="listContent">
      <div class="list" v-for="i in list" :key="i.jobId" @click="exportToTable(i.jobUuid)" :style="listStyle">
        <div class="jobContent">{{ i.jly }} 记录的{{ i.jobContent }}</div>
        <div class="jobGroup"> {{ i.jobGroup }} </div>
        <div class="jobDate"> {{ i.jobDate }} </div>
      </div>
    </div>
  </div>
</template>

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
    height: 66px;
    padding: 5px 10px;
    margin: 7px 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px 0 #485d7a85;
    border: 1px solid #3c56788a;
    background-color: #3c5678;
    color: rgb(255, 255, 255);
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

    .jobGroup {
      margin-bottom: 5px;
      color: rgb(203, 203, 203);
      font-size: 12px;
    }

    .jobDate {
      color: rgb(198, 198, 198);
    }
  }
}
</style>
