<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { RefreshCw } from "@lucide/vue";
import api from "../api";
const props = defineProps<{ kind: "work" | "record" }>();
type Row = { workId?: number; jobId?: number; workUuid?: string; jobUuid?: string; workDate?: string; jobDate?: string; zyfzr?: string; jcjly?: string; jobContent?: string; status?: number };
const rows = ref<Row[]>([]), query = ref(""), status = ref("all"), start = ref(""), end = ref("");
const page = ref(1), busy = ref(false), error = ref("");
const router = useRouter();
const title = computed(() => props.kind === "work" ? "作业申请" : "现场记录");
const dateOf = (row: Row) => {
  const raw=(row.workDate || row.jobDate || "").replaceAll("/", "-");
  const parts=raw.match(/^(\\d{4})-(\\d{1,2})-(\\d{1,2})/);
  return parts ? [parts[1],parts[2].padStart(2,"0"),parts[3].padStart(2,"0")].join("-") : raw;
};
const visible = computed(() => rows.value.filter(row =>
  (!query.value || [row.zyfzr, row.jcjly, row.jobContent, row.workUuid, row.jobUuid].join(" ").includes(query.value)) &&
  (status.value === "all" || String(row.status) === status.value) &&
  (!start.value || dateOf(row) >= start.value) && (!end.value || dateOf(row).slice(0, 10) <= end.value)));
async function load(next = page.value) {
  busy.value = true; error.value = "";
  try {
    const url = props.kind === "work" ? "/workJob/adminGetSendWorkJobByPage" : "/recordJob/adminGetSendRecordJobByPage";
    const { data } = await api.get(url, { params: { page: next } });
    if (!Array.isArray(data)) throw new Error("Invalid response");
    rows.value = data; page.value = next;
  } catch { error.value = "记录加载失败"; rows.value = []; }
  finally { busy.value = false; }
}
function open(row: Row) { router.push({ path: props.kind === "work" ? "/home/workInfo" : "/home/recordInfo", query: { UUID: row.workUuid || row.jobUuid } }); }
onMounted(() => load());
</script>
<template>
  <section>
    <div class="page-top"><div><p class="eyebrow">有限空间作业</p><h1>{{ title }}</h1></div><button title="刷新" aria-label="刷新" :disabled="busy" @click="load()"><RefreshCw :size="18"/></button></div>
    <div class="summary-band">
      <div><span>本页记录</span><strong>{{ rows.length }}</strong></div>
      <div v-if="kind === 'work'"><span>待审批</span><strong class="amber">{{ rows.filter(r => r.status === 0).length }}</strong></div>
      <div v-if="kind === 'work'"><span>已通过</span><strong class="green">{{ rows.filter(r => r.status === 1).length }}</strong></div>
      <div><span>筛选结果</span><strong>{{ visible.length }}</strong></div>
    </div>
    <div class="filters">
      <label class="search-label">检索<input v-model.trim="query" placeholder="人员、内容或编号" type="search" /></label>
      <label v-if="kind === 'work'">状态<select v-model="status"><option value="all">全部状态</option><option value="0">待审批</option><option value="1">已通过</option><option value="2">已驳回</option></select></label>
      <label>开始日期<input v-model="start" type="date" /></label><label>结束日期<input v-model="end" type="date" :min="start" /></label>
    </div>
    <div v-if="error" role="alert" class="error">{{ error }} <button @click="load()">重试</button></div>
    <div class="table-scroll" :aria-busy="busy">
      <table><thead><tr><th>编号</th><th>作业日期</th><th>{{ kind === "work" ? "负责人" : "记录员" }}</th><th>{{ kind === "work" ? "审批状态" : "作业内容" }}</th><th>操作</th></tr></thead>
      <tbody><tr v-for="row in visible" :key="row.workUuid || row.jobUuid">
        <td class="number">{{ row.workId || row.jobId }}</td><td>{{ dateOf(row) }}</td><td>{{ row.zyfzr || row.jcjly }}</td>
        <td><span v-if="kind === 'work'" class="status" :class="'state-' + row.status">{{ ["待审批", "已通过", "已驳回"][row.status ?? 0] || "未知" }}</span><span v-else>{{ row.jobContent }}</span></td>
        <td><button class="text-button" @click="open(row)">查看记录</button></td>
      </tr><tr v-if="!visible.length"><td colspan="5" class="empty">{{ busy ? "正在加载" : "暂无记录" }}</td></tr></tbody></table>
    </div>
    <footer class="pagination"><span>第 {{ page }} 页 · 每页最多 100 条</span><div><button :disabled="busy || page === 1" @click="load(page - 1)">上一页</button><button :disabled="busy || rows.length < 100" @click="load(page + 1)">下一页</button></div></footer>
  </section>
</template>
