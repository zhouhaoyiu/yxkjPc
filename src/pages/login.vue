<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "../api";
const username = ref(""), password = ref(""), busy = ref(false), error = ref("");
const router = useRouter();
async function login() {
  if (busy.value) return;
  busy.value = true; error.value = "";
  try {
    const { data } = await api.post("/auth/login", { username: username.value.trim(), password: password.value });
    if (!data.token || !["admin", "reviewer"].includes(data.role)) throw new Error("role");
    sessionStorage.setItem("sessionToken", data.token);
    sessionStorage.setItem("displayName", username.value.trim());
    password.value = ""; await router.push("/home/workListPage");
  } catch { error.value = "登录失败，请核对账号、密码和管理权限"; }
  finally { busy.value = false; }
}
</script>
<template>
  <main class="login-page">
    <div class="login-brand"><img src="/water-logo.png" alt="" />太原供水</div><h1>有限空间作业</h1><p class="muted">管理工作台</p>
    <form class="login-form" @submit.prevent="login">
      <label>账号<input v-model="username" autocomplete="username" required /></label>
      <label>密码<input v-model="password" type="password" autocomplete="current-password" required /></label>
      <p v-if="error" class="error" role="alert">{{ error }}</p>
      <button class="primary" :disabled="busy">{{ busy ? "正在登录" : "登录" }}</button>
    </form>
  </main>
</template>
