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
     page-break-after: always;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        /* margin-top: 100px; */
      " class="box">
      <h2>城北营销分公司有限空间作业</h2>
      <table class="infoTable">
        <tbody>
          <tr>
            <td colspan="2" style="width: 187.5px">作业时间</td>
            <td colspan="2" style="width: 187.5px">{{ job.jobDate }}</td>
            <td colspan="2" style="width: 187.5px">作业内容</td>
            <td colspan="2" style="width: 187.5px">{{ job.jobContent }}</td>
          </tr>
          <tr>
            <td colspan="2" style="width: 187.5px">作业地点</td>
            <td colspan="6" style="width: 562.5px">{{ job.jobPosition }}</td>
          </tr>
          <tr>
            <td colspan="6" style="width: 562.5px">
              危害因素辨识（中毒危害、缺氧危害、燃爆危害、其他危害
            </td>
            <td colspan="2" style="width: 187.5px">
              <div v-if="job.riskFactorsValue">
                存在 <span>√</span> 不存在 <span>□</span>
              </div>
              <div v-else>存在 <span>□</span> 不存在 <span>√</span></div>
            </td>
          </tr>
          <tr>
            <td colspan="2" style="width: 187.5px">安全交底</td>
            <td colspan="2" style="width: 187.5px">
              <div v-if="job.safetyDisclosureValue">
                完成 <span>√</span> 未完成 <span>□</span>
              </div>
              <div v-else>完成 <span>□</span> 未完成 <span>√</span></div>
            </td>
            <td colspan="2" style="width: 187.5px">设备情况</td>
            <td colspan="2" style="width: 187.5px">
              <div v-if="job.inspectionEquipmentValue">
                合格 <span>√</span> 不合格 <span>□</span>
              </div>
              <div v-else>合格 <span>□</span> 不合格 <span>√</span></div>
            </td>
          </tr>
          <tr>
            <td colspan="2" style="width: 187.5px">安全交底</td>
            <td colspan="2" style="width: 187.5px">
              <div v-if="job.safetyDisclosureValue">
                完成 <span>√</span> 未完成 <span>□</span>
              </div>
              <div v-else>完成 <span>□</span> 未完成 <span>√</span></div>
            </td>
            <td colspan="2" style="width: 187.5px">设备情况</td>
            <td colspan="2" style="width: 187.5px">
              <div v-if="job.inspectionEquipmentValue">
                合格 <span>√</span> 不合格 <span>□</span>
              </div>
              <div v-else>合格 <span>□</span> 不合格 <span>√</span></div>
            </td>
          </tr>
          <tr>
            <td colspan="2" style="width: 187.5px">安全防护设备</td>
            <td colspan="2" style="width: 187.5px">
              <div v-if="job.safetyProtectionValue">
                合格 <span>√</span> 不合格 <span>□</span>
              </div>
              <div v-else>合格 <span>□</span> 不合格 <span>√</span></div>
            </td>
            <td colspan="2" style="width: 187.5px">应急救援装备</td>
            <td colspan="2" style="width: 187.5px">
              <div v-if="job.emerRescueValue">
                合格 <span>√</span> 不合格 <span>□</span>
              </div>
              <div v-else>合格 <span>□</span> 不合格 <span>√</span></div>
            </td>
          </tr>
          <tr>
            <td colspan="2" style="width: 187.5px">通风时间</td>
            <td colspan="6" style="width: 562.5px">
              {{ job.ventilationStartsTime.split(":").join("时") + "分" }}
              至
              {{ job.ventilationEndTime.split(":").join("时") + "分" }}
            </td>
          </tr>
          <tr>
            <td colspan="2" style="width: 187.5px">作业开始时间</td>
            <td colspan="2" style="width: 187.5px">
              {{ job.jobStartTime.split(":").join("时") + "分" }}
            </td>
            <td colspan="2" style="width: 187.5px">作业结束时间</td>
            <td colspan="2" style="width: 187.5px">
              {{ job.jobEndTime.split(":").join("时") + "分" }}
            </td>
          </tr>
          <tr>
            <td colspan="2" style="width: 187.5px">中断时间</td>
            <td colspan="2" style="width: 187.5px">
              <div v-if="job.interruptStartTime">
                {{ job.interruptStartTime.split(":").join("时") + "分" }}
              </div>
            </td>
            <td colspan="2" style="width: 187.5px">中断截止时间</td>
            <td colspan="2" style="width: 187.5px">
              <div v-if="job.interruptEndTime">
                {{ job.interruptEndTime.split(":").join("时") + "分" }}
              </div>
            </td>
          </tr>
          <tr style="height: 60px" align="center">
            <td colspan="1" style="width: 93.75px" align="center">检测阶段</td>
            <td colspan="1" style="width: 93.75px" align="center">检测位置</td>
            <td colspan="1" style="width: 93.75px" align="center">检测时间</td>
            <td colspan="1" style="width: 93.75px" align="center">CO（ppm）</td>
            <td colspan="1" style="width: 93.75px" align="center">H2S（ppm） </td>
            <td colspan="1" style="width: 93.75px" align="center">O2（%）</td>
            <td colspan="1" style="width: 93.75px" align="center">可燃气体（%） </td>
            <td colspan="1" style="width: 93.75px" align="center">是否合格</td>
          </tr>
          <tr align="center">
            <td colspan="1" :rowspan="job.positionList.length" style="width: 93.75px" align="center">
              作业前检测
            </td>
            <td colspan="1" style="width: 93.75px" align="center">{{ job.positionList[0].key }}</td>
            <td colspan="1" style="width: 93.75px" align="center">{{ job.positionList[0].detectionTime }}</td>
            <td colspan="1" style="width: 93.75px" align="center">{{ job.positionList[0].CO }}</td>
            <td colspan="1" style="width: 93.75px" align="center">{{ job.positionList[0].H2S }}</td>
            <td colspan="1" style="width: 93.75px" align="center">{{ job.positionList[0].O2 }}</td>
            <td colspan="1" style="width: 93.75px" align="center">{{ job.positionList[0].combustibleGas }}</td>
            <td colspan="1" style="width: 93.75px" align="center">{{
              job.positionList[0].detectionResult ? "合格" : "不合格"
            }} </td>
          </tr>
          <tr align="center" v-for="(position, pIndex) in job.positionList.slice(1)" :key="pIndex">
            <td colspan="1" style="width: 93.75px" align="center">{{ position.key }}</td>
            <td colspan="1" style="width: 93.75px" align="center">{{ position.detectionTime }}</td>
            <td colspan="1" style="width: 93.75px" align="center">{{ position.CO }}</td>
            <td colspan="1" style="width: 93.75px" align="center">{{ position.H2S }}</td>
            <td colspan="1" style="width: 93.75px" align="center">{{ position.O2 }}</td>
            <td colspan="1" style="width: 93.75px" align="center">{{ position.combustibleGas }}</td>
            <td colspan="1" style="width: 93.75px" align="center">{{ position.detectionResult ? "合格" : "不合格" }}</td>
          </tr>
          <tr align="center">
            <td colspan="1" :rowspan="job.interruptList.length" style="width: 93.75px" align="center">
              中断检测
            </td>
            <td colspan="1" style="width: 93.75px" align="center">
              <div v-if="job.isInterrupt">
                {{ job.interruptList[0].key }}
              </div>
            </td>
            <td colspan="1" style="width: 93.75px" align="center">{{ job.interruptList[0].detectionTime }}</td>
            <td colspan="1" style="width: 93.75px" align="center">{{ job.interruptList[0].CO }}</td>
            <td colspan="1" style="width: 93.75px" align="center">{{ job.interruptList[0].H2S }}</td>
            <td colspan="1" style="width: 93.75px" align="center">{{ job.interruptList[0].O2 }}</td>
            <td colspan="1" style="width: 93.75px" align="center">{{ job.interruptList[0].combustibleGas }}</td>
            <td colspan="1" style="width: 93.75px" align="center">
              <div v-if="job.isInterrupt">
                {{ job.interruptList[0].detectionResult ? "合格" : "不合格" }}
              </div>
            </td>
          </tr>
          <tr align="center" v-for="(interrupt, pIndex) in job.interruptList.slice(1)" :key="pIndex">
            <td colspan="1" style="width: 93.75px" align="center">
              <div v-if="job.isInterrupt">
                {{ interrupt.key }}
              </div>
            </td>
            <td colspan="1" style="width: 93.75px" align="center">{{ interrupt.detectionTime }}</td>
            <td colspan="1" style="width: 93.75px" align="center">{{ interrupt.CO }}</td>
            <td colspan="1" style="width: 93.75px" align="center">{{ interrupt.H2S }}</td>
            <td colspan="1" style="width: 93.75px" align="center">{{ interrupt.O2 }}</td>
            <td colspan="1" style="width: 93.75px" align="center">{{ interrupt.combustibleGas }}</td>
            <td colspan="1" style="width: 93.75px" align="center">
              <div v-if="job.isInterrupt">
                {{ interrupt.detectionResult ? "合格" : "不合格" }}
              </div>
            </td>
          </tr>
          <tr align="left">
            <td colspan="4" style="width: 375px;padding: 14px;">
              <div>
                检测记录人员：
                <strong>
                  {{ job.jcjly }}
                </strong>
              </div>
              <div style="display: flex;justify-content: end;align-items: center;margin-bottom: 10px;">
                <img :src="'data:image/jpg;base64,' + job.jcjlyBase64" alt="" />
              </div>
              <div style="display: flex;justify-content: end;align-items: center;">
                {{ job.formatJobDate }}
              </div>
            </td>
            <td colspan="4" style="width: 375px;padding: 14px;">
              <div>
                现场负责人：
                <strong>
                  {{ job.xcfzr }}
                </strong>
              </div>
              <div style="display: flex;justify-content: end;align-items: center;margin-bottom: 20px;">
                <img :src="'data:image/jpg;base64,' + job.xcfzrBase64" alt="" />
              </div>
              <div style="display: flex;justify-content: end;align-items: center;">
                {{ job.formatJobDate }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div style="
        /* page-break-after: always; */
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 200px;
      ">
      <img v-if="job.gasDetectionBase64Arr" loading="lazy" style="width: 600px; height: 400px; margin-bottom: 20px"
        :src="'data:image/jpg;base64,' + job.gasDetectionBase64Arr" />

      <img v-if="job.signBoardBase64Arr" loading="lazy" style="width: 600px; height: 400px; margin-bottom: 20px"
        :src="'data:image/jpg;base64,' + job.signBoardBase64Arr" />
      <!-- <img
    style="width: 300px; height: 150px; margin-right: 20px"
    v-if="job.exhaustAirBase64Arr"
    :src="'data:image/jpg;base64,' + job.exhaustAirBase64Arr"
    /> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import axios from "axios";
import { nextTick, onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const { UUID } = route.query;
const job = ref({
  jobUuid: "",
  jobDate: "",
  formatJobDate: "",
  jobContent: "",
  jobPosition: "",
  riskFactorsValue: false,
  safetyDisclosureValue: false,
  inspectionEquipmentValue: false,
  safetyProtectionValue: false,
  emerRescueValue: false,
  ventilationStartsTime: "",
  ventilationEndTime: "",
  jobStartTime: "",
  jobEndTime: "",
  interruptStartTime: "",
  interruptEndTime: "",
  jcjly: "",
  xcfzr: "",
  isInterrupt: false,
  positionList: [
    {
      key: "作业前",
      O2: "",
      combustibleGas: "",
      detectionTime: "",
      CO: "",
      H2S: "",
      detectionResult: false,
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
  interruptList: [
    {
      key: "",
      O2: "",
      combustibleGas: "",
      detectionTime: "",
      CO: "",
      H2S: "",
      detectionResult: false,
    },
  ],
  gasDetectionBase64Arr: "",
  signBoardBase64Arr: "",
  exhaustAirBase64Arr: "",
  jcjlyBase64: "",
  xcfzrBase64: "",
});

onBeforeMount(async () => {
  await getJobInfo();
  await nextTick();

  document.addEventListener("keydown", function (e) {
    if (e.ctrlKey && e.keyCode == 80) {
      e.preventDefault();
      print();
    }
  });
});

function print(): void {
  document.getElementById("print")!.style.display = "none";
  document.getElementById("back")!.style.display = "none";
  // leftBar
  (document.querySelector(".leftBar") as HTMLElement)!.style.display = "none";
  // 文档背景设为白色
  // document.body.style.backgroundColor = "#fff";
  // .box的margin-top设为100px
  (document.querySelector(".box") as HTMLElement)!.style.marginTop = "100px";
  window.print();
  document.getElementById("print")!.style.display = "block";
  document.getElementById("back")!.style.display = "block";
  (document.querySelector(".box") as HTMLElement)!.style.marginTop = "0px";
}
function backList(): void {
  router.replace("/home/recordPage");
}
async function getJobInfo(): Promise<void> {
  const jobInfoRes = await axios.get(
    "http://localhost:8092/recordJob/getInfoByRecordJobUuid",
    {
      params: {
        jobUuid: String(UUID),
      },
    }
  );
  let data = jobInfoRes.data[0];
  console.log("data", data);
  data.positionList = JSON.parse(data.positionList);
  data.interruptList = JSON.parse(data.interruptList);
  job.value = data;
  job.value.formatJobDate = `${job.value.jobDate.split("-")[0]}年${job.value.jobDate.split("-")[1]}月${job.value.jobDate.split("-")[2]}日`;
  console.log(job.value.interruptList);
}
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
