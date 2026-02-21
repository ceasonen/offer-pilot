# 🎯 OfferPilot

AI 大厂面试官：模拟阿里 / 字节 / 腾讯 / 美团真实技术面试。  
输入岗位配置 -> AI 面试官追问 -> 实时评分 -> 生成面试报告。

## 功能

- 公司维度面试风格差异化（字节/阿里/腾讯/美团/小红书/拼多多）
- 多轮追问式技术面试
- 单题评分 + 结构化面试报告
- 本地保存历史记录（MVP）
- 多模型支持（DeepSeek / OpenAI / 通义千问 / Ollama）

## 技术栈

- Next.js (App Router, TypeScript)
- Tailwind CSS
- Zustand
- Vercel AI SDK
- Recharts
- Monaco Editor

## 本地启动

```bash
npm install
npm run dev
```

打开 http://localhost:3000

## 使用流程

1. 进入首页配置公司/岗位/级别
2. 在 `Settings` 页面配置模型和 API Key
3. 进入面试房间开始模拟
4. 结束后查看报告并导出 PDF

## 路线图

- [x] Phase 0: 基建 + 核心目录
- [x] Phase 1: 面试流程 MVP + 报告页
- [ ] Phase 2: Prompt 深化 + 题库扩展
- [ ] Phase 3: Supabase 云端历史 + 分享能力

## License

MIT
