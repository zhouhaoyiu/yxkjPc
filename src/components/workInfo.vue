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
          <tr>
            <td colspan="2" style="width: 187.5px;">防护措施</td>
            <td colspan="6" style="width: 562.5px;padding: 8px 4px;" align="left">
              <div>
                1、安全防护设备、个人防护用品、作业设备和工器具齐全有效，满足要求；
                <span v-if="!work.s1 || false">□</span><span v-else>√</span>
              </div>
              <div>
                2、应急救援装备满足要求。
                <span v-if="!work.s2 || false">□</span><span v-else>√</span>
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="2" style="width: 187.5px;">审批负责人意见</td>
            <td colspan="6" style="width: 562.5px; padding: 16px;">
              <div v-if="work.spfzr">
                <div style="display: flex;justify-content: start;font-size: 24px;">
                  {{ work.spfzrInfo }}
                </div>
                <div style="display: flex;justify-content: end;align-items: center;margin-bottom: 20px;">
                  <div style="line-height: 40px;">
                    签字：
                  </div>
                  <img v-if="work.spfzrBase64"
                    style="width: 100px; height: 40px;border: 1px solid rgb(240, 240, 240);border-radius: 4px;"
                    :src="'data:image/jpg;base64,' + work.spfzrBase64" />
                </div>
                <div style="display: flex;justify-content: end;">
                  日期：{{ work.verifyDate }}
                </div>
              </div>
              <div v-else>
                未审批
              </div>
            </td>
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

<script lang="ts" setup>
import axios from "axios";
import { nextTick, onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const { UUID } = route.query;
console.log("UUID", UUID);
const work = ref({
  s1: false,
  s2: false,
  spfzrInfo: "",
  spfzrBase64: "",
  verifyDate: "",
  zyfzr: "",
  jhry: "",
  zyry: "",
  workList: [] as any[],
  spfzr: "",
  workDate: "",
  workContent: "",
  workPosition: "",
});
onBeforeMount(async () => {
  await getWorkInfo();
  await nextTick();

  document.addEventListener("keydown", function (e) {
    if (e.ctrlKey && e.keyCode == 80) {
      e.preventDefault();
      print();
    }
  });

});

const print = () => {
  document.getElementById("print")!.style.display = "none";
  document.getElementById("back")!.style.display = "none";
  // leftBar
  (document.querySelector(".leftBar")! as HTMLElement).style.display = "none";
  // 文档背景设为白色
  // document.body.style.backgroundColor = "#fff";
  // .box的margin-top设为100px
  (document.querySelector(".box") as HTMLElement)!.style.marginTop = "100px";
  window.print();
  document.getElementById("print")!.style.display = "block";
  document.getElementById("back")!.style.display = "block";
  (document.querySelector(".box")! as HTMLElement)!.style.marginTop = "0px";
};
const backList = () => {
  router.replace("/home/workListPage");
};
async function getWorkInfo(): Promise<void> {
  const workInfoRes = await axios.get(
    "http://localhost:8092/workJob/getInfoByWorkJobUuid",
    {
      params: {
        workUuid: String(UUID),
      },
    }
  );
  let data = workInfoRes.data[0];
  data.workList = JSON.parse(data.workList);
  data.protectiveMeasureGroups = JSON.parse(data.protectiveMeasureGroups);
  let s1 = data.protectiveMeasureGroups.includes("step1");
  let s2 = data.protectiveMeasureGroups.includes("step2");
  work.value = data;
  work.value.s1 = s1;
  work.value.s2 = s2;
  console.log("work", work.value);
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
