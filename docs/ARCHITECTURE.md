# COSMOS / 存在 — 技术架构

> 版本：v0.1 · 2026-10-02 · 配套主纲领见 [PROJECT_PLAN.md](./PROJECT_PLAN.md)

---

## 1. 总体分层

```
┌─────────────────────────────────────────────┐
│ app/ 路由层（RSC 默认，交互处 "use client"）    │
├─────────────────────────────────────────────┤
│ components/                                  │
│  ├─ canvas/   R3F 三维层（ssr:false 挂载）    │
│  ├─ timeline/ 时间轴 DOM 覆盖层               │
│  ├─ philosophy/ 哲学内容 UI                   │
│  ├─ home/     首页叙事覆盖层                  │
│  └─ ui/       基础组件                        │
├─────────────────────────────────────────────┤
│ stores/ Zustand（跨 Canvas 内外的状态总线）     │
├─────────────────────────────────────────────┤
│ lib/ 纯函数（cosmology / particles / graph）   │
├─────────────────────────────────────────────┤
│ data/ 内容唯一事实来源（类型 + 数据 + 校验）    │
└─────────────────────────────────────────────┘
```

## 2. 渲染策略

- **RSC 优先**：`layout`、`/question/[id]`、数据装配全部服务端完成；`/question/[id]` 用 `generateStaticParams` SSG。
- **Canvas 隔离**：`UniverseCanvas` 通过 `next/dynamic` + `ssr:false` 加载，`void` 阶段不挂载，点击"开始"后才加载 Three.js 代码块（route-level code splitting）。
- **DOM 覆盖层**：字幕、按钮、时间轴均为 DOM，保证可访问性与 SEO。

## 3. 状态管理划分

| Store | 职责 | 持久化 |
|---|---|---|
| useExperienceStore | 体验状态机 void/awakening/cosmos/question | 否 |
| useTimelineStore | t 值、播放/暂停、tick 推进 | 否 |
| usePerfStore | 性能档位 high/medium/low + maxDpr | 否 |

体验流程控制只存在于 store；UI 与 3D 场景都是状态消费者，互不直接通信。

## 4. 共动坐标渲染管线

```
useTimelineStore.t
  → lib/cosmology.ts: eraIndexAt / scaleFactorAt / cameraAt
  → useFrame 每帧：
      worldPosition = comovingPosition × a(t)
      camera.radius / fov 插值
  → 场景组件按当前纪元渲染对应着色器参数
```

粒子共动坐标生成后不变（`lib/particles.ts` 种子随机、可复现），只有尺度因子随时间变化——空间膨胀而非物质飞散。

## 5. 模块边界规则（强制）

1. `components/canvas/**` 不得 import `@/data/**` 的哲学内容；只读 stores。
2. `data/**` 纯数据 + 类型，不 import 组件与 store。
3. `lib/**` 纯函数，无 React 依赖。
4. 页面只负责装配，不含业务逻辑。

## 6. 扩展接口预留

- `FutureBlocks` 类型（thoughtExperiments / journeyMilestones）已在 `types.ts` 占位。
- `/api/llm` route 骨架：环境变量校验 + 请求体验证；RAG 索引源即 `src/data/`。
- Journey 持久化将使用 zustand `persist` 中间件（Phase 9 之后启用）。
