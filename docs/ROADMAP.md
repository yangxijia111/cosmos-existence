# COSMOS / 存在 — 开发路线图（执行表）

> 版本：v0.2 · 2026-10-02 · 每阶段验收以 `pnpm verify`（typecheck + lint + build + 数据校验）为门禁

---

| Phase | 任务分解 | 验收标准 | 状态 |
|---|---|---|---|
| 0 | 六份文档；Next.js 15 + TS strict + Tailwind v4 脚手架；types.ts 全量类型；10 问题骨架；cosmic-eras 骨架；三页面空路由 | verify 通过；`/`、`/explore`、`/question/[id]` 可达 | ✅ |
| 1 | globals.css 设计 token；ui/ 基础组件（Button/Typography/Divider/IconButton）；页面布局骨架 | verify 通过；深色主题生效 | ✅ |
| 2 | VoidScreen 纯黑+呼吸微光；StartButton；awakening 过渡；Canvas 动态加载管道 | verify 通过；首屏 LCP 达标；点击开始有过渡 | ✅ |
| 3 | UniverseCanvas/Universe；共动粒子系统；尺度因子引擎；6 纪元场景初版；NarrativeOverlay 字幕 | verify 通过；6 纪元连贯可看；膨胀表现为空间拉伸 | ✅ |
| 4 | CosmicTimeline 对数刻度拖动（指针+触控）；纪元刻度；播放/暂停；与 store 双向联动 | verify 通过；拖动实时控制 | ✅ |
| 5 | earth 结束 → QuestionReveal 淡入；进入 Explorer 的 CTA | verify 通过；过渡有电影感 | ✅ |
| 6 | force-layout 自研引擎；KnowledgeGraph（Canvas+DOM 标签，含滚轮缩放、节点拖拽）；详情页（PositionCard/ArgumentPanel/RelatedQuestions）；SSG | verify 通过；图谱可拖拽缩放 | ✅ |
| 7 | 10 问题完整数据（立场/论证/反驳/人物/关联/渊源）；validators 接入 verify | verify 通过；校验零错误 | ✅ |
| 8 | usePerfLevel 三档生效（粒子数/DPR 差异）；移动端触控全链路；prefers-reduced-motion；Lighthouse 桌面端 Performance 100 / Accessibility 95 | verify 通过；低档位粒子数下降 | ✅ |
| 9 | /api/llm 骨架；FutureBlocks 占位；Vercel 部署（预览 + 生产均线上验证 200）；README | 部署成功；verify 通过 | ✅ |

## 生产部署

- **线上地址**：https://cosmos-existence.vercel.app
- 构建命令：`pnpm verify`（typecheck + lint + build + validate:data）
- 预览/生产均通过 Vercel 云端构建，16 个静态页面生成，数据校验通过

## verify 流程

```bash
pnpm verify   # = tsc --noEmit && eslint && next build && tsx validators.ts
```

任一环节失败不得进入下一 Phase。
