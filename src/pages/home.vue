<script setup lang="ts">
import { useRouter } from "vue-router";
import { LogOut, ClipboardCheck, NotebookPen } from "@lucide/vue";
import api from "../api";
const router = useRouter();
const name = sessionStorage.getItem("displayName") || "工作人员";
async function logout() {
  try { await api.post("/auth/logout"); } finally {
    sessionStorage.removeItem("sessionToken"); sessionStorage.removeItem("displayName"); router.replace("/login");
  }
}
</script>
<template>
  <div class="workspace">
    <header class="masthead"><div class="brand"><img src="/water-logo.png" alt="" />太原供水 <span>有限空间作业</span></div><div class="account">{{ name }} <button @click="logout"><LogOut :size="17" />退出</button></div></header>
    <div class="workspace-body">
      <nav class="sidebar" aria-label="工作台导航">
        <span class="nav-label">作业管理</span>
        <RouterLink to="/home/workListPage"><ClipboardCheck :size="18" />作业申请</RouterLink>
        <RouterLink to="/home/recordPage"><NotebookPen :size="18" />现场记录</RouterLink>
      </nav>
      <main class="workspace-content"><RouterView /></main>
    </div>
  </div>
</template>
