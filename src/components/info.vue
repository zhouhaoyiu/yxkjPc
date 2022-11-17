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
            <td data-v="作业内容" id="sjs-A1">作业内容</td>
            <td colspan="1" id="sjs-B1">{{ job.jobContent }}</td>
            <td colspan="1" data-v="作业段组" id="sjs-C1">作业段组</td>
            <td colspan="1" id="sjs-D1">{{ job.jobGroup }}</td>
            <td colspan="1" data-v="作业日期" id="sjs-F1">作业日期</td>
            <td colspan="4" id="sjs-G1">{{ job.jobDate }}</td>
          </tr>
          <tr>
            <td colspan="1" data-v="作业地点" id="sjs-A2">作业地点</td>
            <td colspan="2" id="sjs-B2">{{ job.jobPosition }}</td>
            <td colspan="2" data-v="作业人员" id="sjs-E2">作业人员</td>
            <td colspan="5" id="sjs-G2">{{ job.jobPersonValue }}人</td>
          </tr>
          <tr>
            <td rowspan="4" colspan="1" data-v="作业前" id="sjs-A3">作业前</td>
            <td colspan="1" data-v="安全交底" id="sjs-B3">安全交底</td>
            <td colspan="2" id="sjs-C3">
              {{ job.safetyDisclosureValue ? "完成" : "未完成" }}
            </td>
            <td colspan="2" data-v="检测设备情况" id="sjs-E3">检测设备情况</td>
            <td colspan="3" id="sjs-G3">
              {{ job.inspectionEquipmentValue ? "合格" : "不合格" }}
            </td>
          </tr>
          <tr>
            <td colspan="1" data-v="通风排气情况" id="sjs-B4">通风排气情况</td>
            <td colspan="2" id="sjs-C4">
              {{ job.ventedExhaustValue ? "完成" : "未完成" }}
            </td>
            <td colspan="2" data-v="气体检测情况" id="sjs-E4">气体检测情况</td>
            <td colspan="3" id="sjs-G4">
              {{ job.gasDetectionValue ? "合格" : "不合格" }}
            </td>
          </tr>
          <tr>
            <td data-v="安全防护设备" id="sjs-B5">安全防护设备</td>
            <td colspan="2" id="sjs-C5">
              {{ job.safetyProtectionValue ? "完成" : "未完成" }}
            </td>
            <td colspan="2" data-v="个人防护用品" id="sjs-E5">个人防护用品</td>
            <td colspan="3" id="sjs-G5">
              {{ job.personalProtectionValue ? "合格" : "不合格" }}
            </td>
          </tr>
          <tr>
            <td data-v="其他补充措施" id="sjs-B6">其他补充措施</td>
            <td colspan="7" id="sjs-C6">
              {{ job.otherInfo || "无" }}
            </td>
          </tr>
          <tr>
            <td rowspan="10" data-v="作业中" id="sjs-A7">作业中</td>
            <td data-v="开始时间" id="sjs-B7">开始时间</td>
            <td colspan="2" id="sjs-C7">
              {{ job.startTimeHour }}时{{ job.startTimeMinute }}分
            </td>
            <td colspan="2" data-v="是否中断" id="sjs-E7">是否中断</td>
            <td id="sjs-G7">
              {{ job.isInterruptValue ? "是" : "否" }}
            </td>
          </tr>
          <tr>
            <td data-v="中断时长" id="sjs-B8">中断时长</td>
            <td colspan="2" id="sjs-C8">
              <span v-if="job.isInterruptValue"> {{ job.pauseTime }}分钟 </span>
            </td>
            <td colspan="2" data-v="再次检测情况" id="sjs-E8">再次检测情况</td>
            <td id="sjs-G8">
              <span v-if="job.isInterruptValue">
                {{ job.reDetectionValue ? "合格" : "不合格" }}
              </span>
            </td>
          </tr>
          <tr>
            <td colspan="6" data-v="现场气体检测情况" id="sjs-B9">
              现场气体检测情况
            </td>
          </tr>
          <tr>
            <td data-v="检测位置气体情况" id="sjs-B10" style="text-align: center" colspan="1">
              检测位置<br />气体情况
            </td>
            <td colspan="1" id="sjs-C10">{{ job.positionList[0].key }}</td>
            <td id="sjs-D10">{{ job.positionList[1].key }}</td>
            <td id="sjs-E10">
              <span v-if="job.positionList[2]">
                {{ job.positionList[2].key }}
              </span>
            </td>
            <td colspan="1" id="sjs-F10"></td>
            <td colspan="1" id="sjs-G10"></td>
          </tr>
          <tr>
            <td data-v="CO（ppm）" id="sjs-B11">CO（ppm）</td>
            <td id="sjs-C11">{{ job.positionList[0].CO }}</td>
            <td id="sjs-D11">{{ job.positionList[1].CO }}</td>
            <td id="sjs-E11">
              <span v-if="job.positionList[2]">
                {{ job.positionList[2].CO }}
              </span>
            </td>
            <td id="sjs-F11"></td>
            <td id="sjs-G11"></td>
          </tr>
          <tr>
            <td data-v="H2S(ppm)" id="sjs-B12">H2S(ppm)</td>
            <td id="sjs-C12">{{ job.positionList[0].H2S }}</td>
            <td id="sjs-D12">{{ job.positionList[1].H2S }}</td>
            <td id="sjs-E12">
              <span v-if="job.positionList[2]">
                {{ job.positionList[2].H2S }}
              </span>
            </td>
            <td id="sjs-F12"></td>
            <td id="sjs-G12"></td>
          </tr>
          <tr>
            <td data-v="O2（%）" id="sjs-B13">O2（%）</td>
            <td id="sjs-C13">{{ job.positionList[0].O2 }}</td>
            <td id="sjs-D13">{{ job.positionList[1].O2 }}</td>
            <td id="sjs-E13">
              <span v-if="job.positionList[2]">
                {{ job.positionList[2].O2 }}
              </span>
            </td>
            <td id="sjs-F13"></td>
            <td id="sjs-G13"></td>
          </tr>
          <tr>
            <td data-v="可燃气体（%）" id="sjs-B14">可燃气体（%）</td>
            <td id="sjs-C14">{{ job.positionList[0].combustibleGas }}</td>
            <td id="sjs-D14">{{ job.positionList[1].combustibleGas }}</td>
            <td id="sjs-E14">
              <span v-if="job.positionList[2]">
                {{ job.positionList[2].combustibleGas }}
              </span>
            </td>
            <td id="sjs-F14"></td>
            <td id="sjs-G14"></td>
          </tr>
          <tr>
            <td data-v="检测结果" id="sjs-B15">检测结果</td>
            <td id="sjs-C15"></td>
            <td id="sjs-D15"></td>
            <td id="sjs-E15"></td>
            <td id="sjs-F15"></td>
            <td id="sjs-G15"></td>
          </tr>
          <tr>
            <td data-v="检测员" id="sjs-B16">检测员</td>
            <td colspan="2" id="sjs-C16">
              <img :src="'data:image/jpg;base64,' + job.jcyBase64" alt="" />
            </td>
            <td data-v="记录员" id="sjs-E16">记录员</td>
            <td colspan="2" id="sjs-F16">
              <img :src="'data:image/jpg;base64,' + job.jlyBase64" alt="" />
            </td>
          </tr>
          <tr>
            <td data-v="作业结束" id="sjs-A17">作业结束</td>
            <td data-v="结束时间" id="sjs-B17">结束时间</td>
            <td colspan="2" id="sjs-C17">
              {{ job.endTimeHour }}时{{ job.endTimeMinute }}分
            </td>
            <td colspan="2" data-v="清理检查情况" id="sjs-E17">清理检查情况</td>
            <td id="sjs-G17">
              {{ job.cleaningInspection ? "合格" : "不合格" }}
            </td>
          </tr>
          <tr>
            <td data-v="安全员" id="sjs-A18">安全员</td>
            <td colspan="2" id="sjs-B18">
              <img :src="'data:image/jpg;base64,' + job.aqyBase64" alt="" />
            </td>
            <td colspan="2" data-v="现场负责人" id="sjs-D18">现场负责人</td>
            <td colspan="2" id="sjs-F18">
              <img :src="'data:image/jpg;base64,' + job.xcfzrBase64" alt="" />
            </td>
          </tr>
          <tr>
            <td rowspan="2" colspan="7" data-v="备注：1、气体安全范围（氧气（O2）：19.5%~23% 可燃气体物质0% 一氧化碳（CO)＜24ppm 硫化氢(H2S)小于10ppm 
          2、该审批表作为进入有限空间作业的依据，不得涂改 要求各部门存档时间至少一年" id="sjs-A19">
              备注：1、气体安全范围（氧气（O2）：19.5%~23% 可燃气体物质0%
              一氧化碳（CO)＜24ppm 硫化氢(H2S)小于10ppm <br />
              2、该审批表作为进入有限空间作业的依据，不得涂改
              要求各部门存档时间至少一年
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div style="
        page-break-after: always;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 200px;
      ">
      <img v-if="job.gasDetectionBase64Arr" style="width: 600px; height: 500px; margin-bottom: 20px"
        :src="'data:image/jpg;base64,' + job.gasDetectionBase64Arr" />

      <img v-if="job.signBoardBase64Arr" style="width: 600px; height: 500px; margin-bottom: 20px"
        :src="'data:image/jpg;base64,' + job.signBoardBase64Arr" />
      <!-- <img
    style="width: 300px; height: 150px; margin-right: 20px"
    v-if="job.exhaustAirBase64Arr"
    :src="'data:image/jpg;base64,' + job.exhaustAirBase64Arr"
    /> -->
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
const job = ref({
  positionList: [
    {
      O2: "",
      combustibleGas: "",
    },
    {
      O2: "",
      combustibleGas: "",
    },
    {
      O2: "",
      combustibleGas: "",
    },
  ],
  gasDetectionBase64Arr: "",
  signBoardBase64Arr: "",
});
onBeforeMount(async () => {
  await getJobInfo();
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
  router.replace("/home/list");
};
async function getJobInfo() {
  const jobInfoRes = await axios.get(
    "http://localhost:8092/Job/getInfoByJobUuid",
    {
      params: {
        jobUuid: String(UUID),
      },
    }
  );
  let data = jobInfoRes.data[0];
  console.log("data", data);
  data.positionList = JSON.parse(data.positionList);
  job.value = data;
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

  td {
    height: 40px;
    border: 1px solid #000;
  }

  tr {
    border: 1px solid #000;
  }

  img {
    // 图片长宽为100px 50px
    width: 100px;
    height: 50px;
  }

  #sjs-B3 {
    width: 150px;
  }

  #sjs-A1 {
    width: 100px;
  }

  #sjs-C10,
  #sjs-D10,
  #sjs-E10,
  #sjs-F10,
  #sjs-G10,
  #sjs-H10 {
    width: 50px;
  }

  // #sjs-B18,
  #sjs-F18 {
    width: 20%;
  }
}
</style>
