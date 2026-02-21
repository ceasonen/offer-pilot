# OfferPilot v0.1.1

Release date: 2026-02-21

## Highlights

- DeepSeek 请求链路修复：兼容 AI SDK v6 聊天接口。
- 面试房间新增错误提示：API Key 缺失、模型请求失败会直接显示原因。
- 请求状态逻辑修正：避免失败时 UI 一直停留在“思考中”。

## Upgrade

```bash
git pull
npm install
npm run dev
```

## Verification

- `npm run lint` passed
- `npm run build` passed
