# DonnaOS

面向 AI 产品经理求职的 webOS 个人作品集。网站以像素欢迎页、启动序列、紫色方格桌面、小型暗色窗口和任务栏作为探索框架，同时通过 Recruiter Brief、案例证据和量化结果服务招聘者快速判断。

默认流程为“欢迎页 → 启动 → Recruiter Brief”。桌面端双击应用图标，触屏设备单击打开；已打开窗口可拖动、聚焦、最小化、恢复和关闭。完整案例保留独立深链，便于招聘者阅读和分享。

## 本地运行

```bash
npm install
npm run dev
```

打开 `http://localhost:3000`。

## 验证

```bash
npm run lint
npm run typecheck
npm run test:unit
npm run test:e2e
npm run build
```

内容集中维护在 `lib/portfolio.ts`。第一版不包含数据库、登录、分析、表单提交、手机号、微信二维码或公开简历 PDF。
