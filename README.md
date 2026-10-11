# 有限空间管理工作台

`pnpm install --frozen-lockfile` 后运行 `pnpm dev`。`pnpm build` 生成静态文件。

按 `.env.example` 配置 `VITE_API_BASE`；默认通过同源 `/api` 反向代理访问 yxkj-Java。登录需要服务端的 reviewer 或 admin 账号，浏览器仅保存当前窗口会话。生产部署使用 HTTPS，服务端 `APP_ORIGINS` 与页面来源保持一致。

作业申请和现场记录支持本页检索、日期筛选及分页。详情保留原表单与打印入口。首页统计仅代表当前页。
