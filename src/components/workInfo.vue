<template>
  <div id="content" style="
      background: #fff;
      display: flex;
      flex-direction: column;
      color: black;
    ">
    <button id="back" @click="backList">返回</button>
    <button id="print" @click="print">打印</button>
    <div style="
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        /* margin-top: 100px; */
      " class="box">
      <h4>城北营销分公司有限空间作业</h4>
      <table class="infoTable">
        <tbody>
          <tr>
            <td colspan="2" style="width: 187.5px;">作业时间 </td>
            <td colspan="6" style="width: 562.5px;">{{ work.workDate }}</td>
            <!-- <td colspan="2"></td> -->
            <!-- <td colspan="2"></td> -->
          </tr>
          <tr>
            <td colspan="1" style="width: 93.75px;">序号</td>
            <td colspan="2" style="width: 187.5px;">作业内容</td>
            <td colspan="5" style="width: 468.75px;">作业地点</td>
          </tr>
          <tr v-for="i, index in work.workList">
            <td colspan="1" style="width: 93.75px;">{{ index + 1 }}</td>
            <td colspan="2" style="width: 187.5px;">{{ i.workContent }}</td>
            <td colspan="5" style="width: 468.75px;">{{ i.workPosition }}</td>
          </tr>
          <tr>
            <td colspan="2" style="width: 187.5px;">作业负责人</td>
            <td colspan="2" style="width: 187.5px;">{{ work.zyfzr }}</td>
            <td colspan="2" style="width: 187.5px;">监护人员</td>
            <td colspan="2" style="width: 187.5px;">{{ work.jhry }}</td>
          </tr>
          <tr>
            <td colspan="2" style="width: 187.5px;">作业人员</td>
            <td colspan="6" style="width: 562.5px;">{{ work.zyry }}</td>
          </tr>
          
          <tr style="border:1px solid #fff">
            <td style="border-color: #fff;"></td>
            <td style="border-color: #fff;"></td>
            <td style="border-color: #fff;"></td>
            <td style="border-color: #fff;"></td>
            <td style="border-color: #fff;"></td>
            <td style="border-color: #fff;"></td>
            <td style="border-color: #fff;"></td>
            <td style="border-color: #fff;"></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { nextTick, onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const { UUID } = route.query;
console.log("UUID", UUID);
const work = ref({

});
onBeforeMount(async () => {
  await getWorkInfo();
  await nextTick();
  // window.print();
});

const print = () => {
  document.getElementById("print").style.display = "none";
  document.getElementById("back").style.display = "none";
  // leftBar
  document.querySelector(".leftBar").style.display = "none";
  // 文档背景设为白色
  // document.body.style.backgroundColor = "#fff";
  // .box的margin-top设为100px
  document.querySelector(".box").style.marginTop = "100px";
  window.print();
  document.getElementById("print").style.display = "block";
  document.getElementById("back").style.display = "block";
  document.querySelector(".box").style.marginTop = "0px";
};
const backList = () => {
  router.replace("/home/workListPage");
};
async function getWorkInfo() {
  const workInfoRes = await axios.get(
    "http://localhost:8092/workJob/getInfoByWorkJobUuid",
    {
      params: {
        workUuid: String(UUID),
      },
    }
  );
  let data = workInfoRes.data[0];
  console.log("data", data);
  data.workList = JSON.parse(data.workList);
  work.value = data;
  console.log("work", work.value.workList);
}
// const jobInfoRes = await axios.get(
//     "http://localhost:8092/Job/getInfoByJobUuid",
//     {
//       params: {
//         jobUuid: String(UUID.value),
//       },
//     }
//   );
//   const data = jobInfoRes.data[0];
//   jobData.value = data;

// const job = prop.job;
// job.positionList = JSON.parse(job.positionList);
</script>

<style scoped lang="scss">
#back {
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 30px;
  background-color: rgb(255, 255, 204);
  border: 1px solid #000;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  margin-left: 20px;

  &:hover {
    background-color: #000;
    color: #fff;
  }
}

#print {
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 30px;
  background-color: rgb(203, 255, 255);
  border: 1px solid #000;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  margin-left: 140px;

  &:hover {
    background-color: #000;
    color: #fff;
  }
}

table {
  width: 750px;
  font-size: 14px;
  border-collapse: collapse;
  border: 1px solid #000;

  tbody {
    width: 100%;
    border: 1px solid #000;
  }

  td {
    height: 40px;
    border: 1px solid #000;
  }

  tr {
    width: 100%;
    border: 1px solid #000;
  }
}
</style>
