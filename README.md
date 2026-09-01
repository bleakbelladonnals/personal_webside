# DonnaOS

面向 AI 产品经理求职的 Aqua 风格个人作品集。网站以桌面、窗口和 Dock 作为探索框架，同时把 Recruiter Brief、案例证据和量化结果直接放在首屏。

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
