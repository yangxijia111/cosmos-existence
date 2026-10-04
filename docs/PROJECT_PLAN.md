# COSMOS / 存在 — 项目规划方案

> **项目名称**：COSMOS / 存在（暂定名）
> **产品形态**：沉浸式哲学探索网站
> **文档地位**：主纲领文档，后续所有文档与代码实现均以本文为准
> **版本**：v0.1 · 2026-10-02
> **状态**：Phase 0 ~ 9 全部完成，已部署上线 https://cosmos-existence.vercel.app

---

## 目录

1. [项目概述](#1-项目概述)
2. [需求分析](#2-需求分析)
3. [技术选型](#3-技术选型)
4. [项目文档体系](#4-项目文档体系)
5. [目录结构设计](#5-目录结构设计)
6. [页面架构设计](#6-页面架构设计)
7. [数据结构设计](#7-数据结构设计)
8. [开发计划（Phase 0 ~ Phase 9）](#8-开发计划phase-0--phase-9)
9. [设计原则与约束](#9-设计原则与约束)
10. [风险与应对](#10-风险与应对)

---

## 1. 项目概述

### 1.1 产品定位

**COSMOS / 存在 不是哲学百科，而是"体验式哲学引路人"。**

核心命题：从宇宙诞生讲起，一路走到人类意识与人生意义，让用户在沉浸式体验中自然遭遇那些人类思考了几千年的终极问题。

产品不做知识的罗列，而是设计一条**情感与认知曲线**：

```
敬畏（宇宙之浩瀚）→ 好奇（科学之事实）→ 困惑（哲学之问）→ 思考（自我之存在）
```

### 1.2 目标用户

- 对宇宙、哲学、存在意义有好奇心的普通用户（无哲学背景）
- 喜欢沉浸式网站体验的设计/创意从业者
- 寻找灵感与审美体验的夜间浏览者

### 1.3 核心体验流（第一版）

```
首页（纯黑暗，微弱呼吸星光）
  ↓ 点击"开始"
宇宙演化体验（6 个纪元，程序化实时动画）
  奇点 → 空间暴胀 → 粒子形成 → 恒星 → 星系 → 地球
  ↓ 动画结束
第一个哲学问题淡入
  "为什么会有存在，而不是一无所有？"
  ↓ 引导进入
Philosophy Explorer（交互式哲学知识图谱）
  10 个预置问题 · 立场 · 论证 · 反驳 · 关联
```

---

## 2. 需求分析

### 2.1 功能需求清单

| 优先级 | 需求 | 说明 |
|---|---|---|
| P0 | 沉浸式首页 | 初始完全黑暗，点击"开始"后进入宇宙演化 |
| P0 | 宇宙演化动画 | 6 纪元连续实时动画，Three.js/R3F 程序化生成，**禁止预渲染视频** |
| P0 | 空间膨胀表现 | 大爆炸表现为**空间尺度扩张**而非物质向已有空间飞散 |
| P0 | Cosmic Timeline | 可拖动时间轴，控制/跳转宇宙阶段 |
| P0 | 哲学之问过渡 | 动画结束进入第一个哲学问题 |
| P0 | Philosophy Explorer | 交互式知识图谱：立场、论证、反驳、关联问题 |
| P0 | 10 个预置哲学问题 | 数据驱动，不硬编码进 UI |
| P0 | 响应式 | 桌面 + 移动端可用 |
| P0 | 性能降级 | 低性能设备自动降低粒子数量 |
| P1 | 深色宇宙美学 | 极简 UI、大量留白、电影感、科技感、哲学感 |
| P1 | 每阶段质量门禁 | build / typecheck / lint 全绿才能进入下一阶段 |
| P2 | LLM API + RAG | 为 AI 对话式哲学引导预留接口 |
| P2 | 思想实验模块 | 预留数据结构与入口 |
| P2 | 用户 Journey 系统 | 预留浏览轨迹与个人思考记录接口 |

### 2.2 关键技术难点（提前设计，Phase 3 核心）

#### 难点 1：大爆炸 = 空间膨胀，而非物质飞散

这是本项目技术设计与视觉设计的核心。错误做法（常见）是让粒子从一个中心点向四周飞出——那表现的是"爆炸物飞入已有空间"。宇宙学的正确图景是：**空间本身在膨胀，物质近似静止在空间中**。

**采用共动坐标系（comoving coordinates）方案**：

```
1. 所有粒子生成时赋予固定的共动坐标 p_i，永不改变；
2. 渲染时世界坐标 = p_i × a(t)，a(t) 为宇宙尺度因子；
3. 相机在共动框架中缓慢运镜（dolly / drift）；
4. 尺度因子引擎（lib/cosmology.ts）独立为纯函数模块。
```

**观众看到的效果**：

- 粒子之间的**角距离**基本不变（不会看到物质"飞散开"）；
- 但共动网格被拉伸、物质密度下降、单位体积内粒子变稀；
- 结构（恒星、星系）在共动网格的**固定位置**凝结成型——星系不是飞到某处，而是"在原地"被空间拉伸的同时凝聚。

这是宇宙学正确的膨胀表现，也天然区别于市面上所有"粒子爆炸"式大爆炸动画。

#### 难点 2：性能分级

- `usePerfLevel()` hook 综合评估：设备内存（`navigator.deviceMemory`）、CPU 核数（`navigator.hardwareConcurrency`）、DPR、是否移动端、WebGL 能力探测；
- 输出三档：`high / medium / low`；
- 数据层每个纪元的粒子数量按三档配置（见 `EraVisualConfig.particleCount`）；
- DPR 上限限制（如 high: 2 / medium: 1.5 / low: 1）；
- 支持 `prefers-reduced-motion`：跳过长动画，直接呈现关键帧 + 文字叙事。

#### 难点 3：数据驱动

- 全部哲学内容与宇宙纪元内容存放于 `src/data/`；
- UI 组件只做泛型渲染，**组件代码中不出现任何哲学文案**；
- 新增/修改哲学问题 = 新增/修改一个数据文件，零 UI 改动；
- 数据引用完整性由校验脚本保证（Phase 7 交付）。

---

## 3. 技术选型

| 层 | 选择 | 理由 |
|---|---|---|
| 框架 | **Next.js 15（App Router）+ React 19** | Vercel 原生部署、RSC、路由级代码分割 |
| 语言 | **TypeScript（strict 模式）** | 数据结构复杂，类型系统是第一道防线 |
| 3D | **Three.js + React Three Fiber v9 + Drei** | R3F v9 完整支持 React 19；Drei 提供 OrbitControls/Points 等常用件 |
| UI 动画 | **Framer Motion** | React 声明式动画，与 Zustand/RSC 集成顺滑，负责 UI 过渡、字幕淡入、页面转场 |
| 3D 动画 | R3F `useFrame` 驱动 | 时间线状态由 Zustand 提供，useFrame 内插值 |
| 样式 | **Tailwind CSS v4** | 原子化、深色主题 token 化 |
| 状态 | **Zustand v5** | 跨 Canvas 内外读写、无 Provider、支持持久化（Journey 预留） |
| 内容 | **TS 数据文件**（JSON 兼容结构） | 类型安全；后续可平移 MDX；LLM/RAG 时代同一数据源可索引进向量库 |
| 包管理 | **pnpm** | Vercel/Next 生态主流，安装效率高 |
| 质量 | ESLint（next/core-web-vitals）+ Prettier + tsc | 每阶段 verify 门禁 |
| 部署 | **Vercel** | 零配置，Edge/ISR 可用 |

> 说明：UI 动画库未选择 GSAP——GSAP 时间轴能力强，但与 React 状态同步需额外封装；宇宙演化的长序列动画由 R3F useFrame + 时间线状态驱动，不依赖 UI 动画库。

---

## 4. 项目文档体系

所有文档位于 `docs/`，与代码同步演进：

| 文档 | 职责 |
|---|---|
| `PROJECT_PLAN.md` | **本文档**。主纲领：定位、架构、数据模型、阶段计划 |
| `PRD.md` | 产品需求细化：用户故事、体验流分镜、文案基调、P0/P1/P2 功能规格 |
| `ARCHITECTURE.md` | 技术架构：渲染策略、状态管理划分、模块边界、扩展接口预留方式 |
| `DATA_MODELS.md` | 数据结构完整定义与字段说明、数据编写规范、10 个问题清单 |
| `DESIGN_SYSTEM.md` | 设计系统：色板、字体、排版比例、留白、动效原则、组件视觉规范 |
| `ROADMAP.md` | 开发计划执行表：每阶段任务分解、验收标准、verify 流程 |

---

## 5. 目录结构设计

```
cosmos/（在当前工作区根目录初始化）
├── docs/                              # 项目文档（本文件所在）
│   ├── PROJECT_PLAN.md
│   ├── PRD.md
│   ├── ARCHITECTURE.md
│   ├── DATA_MODELS.md
│   ├── DESIGN_SYSTEM.md
│   └── ROADMAP.md
├── src/
│   ├── app/                           # Next.js App Router
│   │   ├── layout.tsx                 # 全局布局：字体、深色底、元信息
│   │   ├── page.tsx                   # 沉浸式首页（体验状态机宿主）
│   │   ├── explore/
│   │   │   └── page.tsx               # Philosophy Explorer 图谱页
│   │   ├── question/
│   │   │   └── [id]/
│   │   │       └── page.tsx           # 哲学问题详情页（SSG，generateStaticParams）
│   │   └── api/                       # 未来 AI/RAG 接口（Phase 9 骨架）
│   │       └── llm/route.ts
│   ├── components/
│   │   ├── canvas/                    # ===== R3F 三维层 =====
│   │   │   ├── UniverseCanvas.tsx     # Canvas 宿主（next/dynamic + ssr:false）
│   │   │   ├── Universe.tsx           # 场景组装：按当前纪元挂载子场景
│   │   │   ├── scenes/                # 6 个纪元场景组件
│   │   │   │   ├── Singularity.tsx    # 奇点：高密度光核 + 量子涨落
│   │   │   │   ├── Inflation.tsx      # 暴胀：尺度因子指数增长
│   │   │   │   ├── ParticleEpoch.tsx  # 粒子形成：夸克→原子核→原子（CMB）
│   │   │   │   ├── Stars.tsx          # 恒星：第一代恒星点燃
│   │   │   │   ├── Galaxies.tsx       # 星系：结构凝结
│   │   │   │   └── Earth.tsx          # 地球：黯淡蓝点
│   │   │   ├── effects/               # 自定义 shader / 后处理 / 星空背景
│   │   │   └── controls/              # 相机运镜（共动框架内的 dolly/drift）
│   │   ├── timeline/                  # ===== Cosmic Timeline =====
│   │   │   ├── CosmicTimeline.tsx     # 可拖动时间轴主体
│   │   │   └── EraMarker.tsx          # 纪元刻度点
│   │   ├── philosophy/                # ===== 哲学内容 UI =====
│   │   │   ├── QuestionHero.tsx       # 问题首屏
│   │   │   ├── PositionCard.tsx       # 立场卡片
│   │   │   ├── ArgumentPanel.tsx      # 论证 ⇄ 反驳切换面板
│   │   │   ├── KnowledgeGraph.tsx     # 2D 力导向图谱（Canvas + DOM 标签）
│   │   │   └── RelatedQuestions.tsx   # 关联问题导航
│   │   ├── home/                      # ===== 首页叙事 =====
│   │   │   ├── VoidScreen.tsx         # 纯黑暗开场 + 呼吸微光
│   │   │   ├── StartButton.tsx        # "开始"按钮
│   │   │   ├── NarrativeOverlay.tsx   # 旁白字幕覆盖层
│   │   │   └── QuestionReveal.tsx     # 第一个哲学问题呈现
│   │   └── ui/                        # 基础 UI：Button / Typography / Divider / IconButton
│   ├── data/                          # ===== 数据层（内容唯一事实来源）=====
│   │   ├── types.ts                   # 全部数据结构类型定义
│   │   ├── cosmic-eras.ts             # 宇宙 6 纪元数据（含三档粒子配置）
│   │   ├── questions/
│   │   │   ├── index.ts               # 问题汇总导出 + 图谱边构建
│   │   │   ├── why-existence.ts       # 每个问题一个文件（10 个）
│   │   │   └── ...                    # 其余 9 个问题文件
│   │   └── validators.ts              # 数据引用完整性校验（Phase 7）
│   ├── stores/                        # ===== Zustand =====
│   │   ├── useExperienceStore.ts      # 体验状态机（void/awakening/cosmos/question）
│   │   ├── useTimelineStore.ts        # 宇宙时间线（t 值、播放/暂停、纪元推导）
│   │   └── usePerfStore.ts            # 性能档位（high/medium/low）
│   ├── hooks/
│   │   ├── usePerfLevel.ts            # 设备性能探测
│   │   ├── useReducedMotion.ts        # 动效减弱偏好
│   │   └── useTimelineDrag.ts         # 时间轴拖动逻辑（指针 + 触控）
│   ├── lib/
│   │   ├── cosmology.ts               # 尺度因子 a(t)、对数时间映射（纯函数）
│   │   ├── particles.ts               # 共动坐标粒子生成（种子随机、可复现）
│   │   └── graph/
│   │       └── force-layout.ts        # 2D 力导向布局（自研，无重依赖）
│   └── styles/
│       └── globals.css                # Tailwind 入口 + CSS 变量 token
├── public/                            # favicon、og 图等静态资源
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── eslint.config.mjs
├── .prettierrc
└── package.json                       # 含 verify 脚本 = typecheck + lint + build
```

**模块边界规则**：

- `components/canvas/**` 不得 import 哲学数据；只从 stores 读状态；
- `data/**` 不得 import 任何组件/-store（纯数据 + 类型）；
- `lib/**` 为纯函数，无 React 依赖；
- 体验流程控制（何时进入下一纪元）只存在于 `useExperienceStore` / `useTimelineStore`，UI 与场景都是状态的消费者。

---

## 6. 页面架构设计

### 6.1 `/`（首页 — 单页体验状态机）

整个首页是一个由 Zustand 驱动的状态机：

```typescript
type ExperiencePhase =
  | 'void'        // 初始：纯黑，微弱呼吸星光，中央"开始"
  | 'awakening'   // 点击开始后的唤醒过渡（光晕涌现）
  | 'cosmos'      // 宇宙演化：6 纪元连续播放，底部 CosmicTimeline 可控
  | 'question';   // 演化结束：第一个哲学问题淡入 + 进入 Explorer 的 CTA
```

**渲染策略**：

- R3F Canvas 通过 `next/dynamic` + `ssr: false` 挂载（WebGL 无法 SSR）；
- 叙事 UI（字幕、按钮、时间轴）为 DOM 覆盖层，保证可访问性与可抓取；
- `void` 阶段不挂载 Canvas（或仅极轻量静态层），点击"开始"后才加载 3D 资源（`React.lazy` 分割，首屏秒开）。

**cosmos 阶段与时间线联动**：

```
useTimelineStore: { t: number（0~1 归一化时间轴）, playing: boolean }
  ├─ lib/cosmology.ts: eraIndex(t) → 当前纪元
  ├─ lib/cosmology.ts: scaleFactor(t) → a(t)（暴胀段指数增长）
  ├─ Universe.tsx: 按 eraIndex 挂载对应场景，a(t) 作用于共动坐标
  └─ CosmicTimeline.tsx: 拖动/跳转写入 t；播放推进 t
```

### 6.2 `/explore`（Philosophy Explorer）

- **2D 力导向知识图谱**：Canvas 渲染连线与粒子动效 + DOM 绝对定位标签（文字可选中、可访问、移动端可点）；
- 节点 = 哲学问题，边 = `relatedQuestionIds` 关联；
- 按 `epoch`（cosmos / life / mind / meaning）分色分簇，视觉隐喻"从宇宙到意义"；
- 交互：拖拽节点、缩放画布、hover 高亮相邻、点击进入详情或侧栏预览；
- 移动端退化为纵向分类列表 + 迷你图谱预览。

### 6.3 `/question/[id]`（问题详情页）

```
问题 Hero（大字排印 + 所属纪元氛围背景）
  ↓
问题渊源（originStory：这个问题从哪来、谁最先提出）
  ↓
立场卡片流（PositionCard，可展开）
  每个立场：核心主张 → 论证列表 ⇄ 反驳列表（ArgumentPanel 切换）
  关键人物署名（姓名 + 年代）
  ↓
关联问题导航（RelatedQuestions：图谱局部子图 + 上下题）
```

- 采用 SSG（`generateStaticParams`），10 个问题构建期静态生成；
- 页面顶部保留进入该问题的宇宙纪元入口（`entryFromEra`）。

### 6.4 `/api/llm`（Phase 9 预留）

- route handler 骨架 + 环境变量校验；
- 数据层已预留 `futureBlocks` 扩展位（见 7.4）；
- RAG 索引源 = `src/data/`（同一数据源可向量化）。

---

## 7. 数据结构设计

> 完整定义落地于 `src/data/types.ts`，此处为设计定稿。所有字段中文内容、英文键名。

### 7.1 宇宙时间线：CosmicEra

```typescript
type CosmicEraId =
  | 'singularity'  // 奇点（普朗克时期）
  | 'inflation'    // 暴胀
  | 'quarks'       // 粒子形成（夸克 → 原子核 → 原子/CMB）
  | 'stars'        // 恒星（第一代恒星点燃）
  | 'galaxies'     // 星系（结构凝结）
  | 'earth';       // 地球（太阳系、生命、今天）

interface CosmicEra {
  id: CosmicEraId;
  order: number;                        // 叙事顺序 0~5

  /** 展示信息 */
  title: string;                        // '奇点'
  scientificLabel: string;              // '普朗克时期'
  cosmologicalTime: {
    seconds: number;                    // 5.39e-44（对数时间轴用数值）
    display: string;                    // '10⁻⁴⁴ 秒'
  };
  summary: string;                      // 一句话科学描述
  narrative: string[];                  // 电影旁白文案（逐句淡入）

  /** 视觉配置（数据驱动的场景参数） */
  visual: EraVisualConfig;

  /** 该纪元结束时引出的哲学问题（体验钩子） */
  philosophyHook?: QuestionId;
}

interface EraVisualConfig {
  /** 尺度因子 a(t) 区间——空间膨胀的引擎 */
  scaleRange: [number, number];

  /** 粒子数量三档配置（性能分级） */
  particleCount: {
    high: number;                       // 桌面高性能，如 60000
    medium: number;                     // 普通设备，如 25000
    low: number;                        // 低端/移动端，如 8000
  };

  palette: {
    primary: string;                    // 主色调 hex
    accent: string;                     // 点缀色
    background: string;                 // 场景背景（深空色阶）
  };

  /** 相机运镜（共动框架内）：起止半径与可选 FOV 变化 */
  camera: {
    radius: [number, number];
    fov?: [number, number];
  };

  intensity: number;                    // 发光/能量强度 0~1
  // 各纪元可扩展自有参数（如暴胀速率、星系旋臂数），保持向后兼容
}
```

**初始纪元设计（科学顾问口径）**：

| order | id | 标题 | 科学名称 | 宇宙学时间 | 关键视觉 |
|---|---|---|---|---|---|
| 0 | singularity | 奇点 | 普朗克时期 | 10⁻⁴⁴ 秒 | 极高密度光核、量子涨落闪烁 |
| 1 | inflation | 暴胀 | 暴胀时期 | 10⁻³⁶ ~ 10⁻³² 秒 | a(t) 指数增长，共动网格拉伸 |
| 2 | quarks | 粒子 | 夸克时期 → 复合 | 10⁻¹² 秒 ~ 38 万年 | 等离子体雾 → 原子凝结 → CMB 余晖 |
| 3 | stars | 恒星 | 宇宙黎明 | ~2 亿年 | 黑暗中第一缕恒星之光 |
| 4 | galaxies | 星系 | 结构形成 | ~10 亿年 | 共动网格固定位置凝结成旋涡 |
| 5 | earth | 地球 | 太阳系与今天 | 92 亿年 ~ 138 亿年 | 视角拉远，黯淡蓝点 |

> 时间轴跨度 44 个数量级，Cosmic Timeline 采用**对数刻度**；`seconds` 字段存真实数值供映射函数使用。

### 7.2 哲学问题：PhilosophyQuestion

```typescript
type QuestionId =
  | 'why-existence'          // 为什么存在而不是一无所有
  | 'fine-tuning'            // 宇宙是被设计还是偶然
  | 'nature-of-time'         // 时间是什么
  | 'origin-of-life'         // 生命为何出现
  | 'hard-problem'           // 意识难题
  | 'free-will'              // 自由意志
  | 'can-we-know'            // 能否认识真实
  | 'universe-knowing-self'  // 人是宇宙认识自己的方式吗
  | 'meaning-of-life'        // 人生有意义吗
  | 'facing-death';          // 面对死亡如何生活

/** 问题所属层面——同时是图谱聚类与叙事弧线 */
type QuestionEpoch = 'cosmos' | 'life' | 'mind' | 'meaning';

interface PhilosophyQuestion {
  id: QuestionId;
  order: number;                        // 叙事顺序（与体验流一致）
  epoch: QuestionEpoch;

  title: string;                        // '为什么会有存在，而不是一无所有？'
  subtitle: string;                     // 副标题/一句引子
  originStory: string;                  // 问题渊源：谁提出、为何重要

  positions: Position[];                // 哲学立场（3~5 个）

  relatedQuestionIds: QuestionId[];     // 关联问题 = 图谱的边

  entryFromEra?: CosmicEraId;           // 从哪个宇宙纪元进入（'why-existence' → 'earth'）
}

interface Position {
  id: string;                           // 'leibnizian-answer'（kebab-case，问题内唯一）
  name: string;                         // '充足理由的追问'
  tradition: string;                    // '形而上学 · 理性主义'
  summary: string;                      // 核心主张一段话
  keyFigures: { name: string; period: string }[];  // 莱布尼茨（1646–1716）
  arguments: Argument[];                // 支持论证
  objections: Argument[];               // 反驳
}

interface Argument {
  id: string;
  label: string;                        // '充足理由律论证'
  premises: string[];                   // 前提列表
  conclusion: string;                   // 结论
  source?: string;                      // 文献出处（可选）
}
```

**10 个预置问题的叙事弧线**（与宇宙体验首尾呼应）：

| order | 问题 | epoch | 图谱关联（示例） |
|---|---|---|---|
| 1 | 为什么会有存在，而不是一无所有？ | cosmos | ← 时间、设计 |
| 2 | 时间有开端吗？时间是什么？ | cosmos | ← 存在、设计 |
| 3 | 宇宙的规律是被设计的，还是偶然的？ | cosmos | ← 存在、生命 |
| 4 | 生命是什么？无生命的物质为何组织成生命？ | life | ← 设计、意识 |
| 5 | 意识是什么？物质如何产生体验？ | mind | ← 生命、自由意志、认识 |
| 6 | 我们拥有自由意志吗？ | mind | ← 意识、意义 |
| 7 | 我们能认识真实吗？ | mind | ← 意识、意义 |
| 8 | 人是宇宙认识自己的方式吗？ | meaning | ← 意识、意义 |
| 9 | 人生有意义吗？意义从何而来？ | meaning | ← 自由意志、死亡、宇宙自识 |
| 10 | 面对必然的死亡，应当如何生活？ | meaning | ← 意义 |

### 7.3 数据校验（Phase 7 交付）

`src/data/validators.ts` 提供并在 CI 中运行：

- `relatedQuestionIds` 引用的 id 必须存在（图谱无悬空边）；
- `philosophyHook` / `entryFromEra` 交叉引用完整；
- `order` 连续不重复；
- 每个问题至少 2 个立场、每个立场至少 1 论证 + 1 反驳。

### 7.4 扩展预留（P2，只留类型位不实现）

```typescript
/** 未来模块占位——第一版仅保证类型兼容，不渲染 */
interface FutureBlocks {
  thoughtExperiments?: string[];        // 思想实验 id 列表（模块上线后引用）
  journeyMilestones?: string[];         // 用户 Journey 里程碑标记
}

// PhilosophyQuestion 增加可选字段：
// futureBlocks?: FutureBlocks
```

---

## 8. 开发计划（Phase 0 ~ Phase 9）

> **铁律：每阶段结束必须运行 `pnpm verify`（typecheck + lint + build），全部通过才能进入下一阶段。不为视觉效果牺牲架构与性能。**

| Phase | 内容 | 验收标准 |
|---|---|---|
| **0** | **文档与脚手架**：本规划文档 + PRD/ARCHITECTURE/DATA_MODELS/DESIGN_SYSTEM/ROADMAP 五份文档；Next.js 15 + TS strict + Tailwind v4 + ESLint + Prettier 初始化；`src/data/types.ts` 全量类型；10 个问题数据骨架（id/标题/占位）；`cosmic-eras.ts` 骨架；三页面空路由 | verify 通过；路由可达；类型即文档 |
| **1** | **设计系统与骨架**：色板/字体/排版 token（globals.css CSS 变量 + Tailwind theme）；基础 UI 组件（Button/Typography）；三页面布局骨架与导航 | verify 通过；深色主题生效 |
| **2** | **首页黑暗开场**：VoidScreen（纯黑 + 呼吸微光）、StartButton、awakening 过渡（Framer Motion）；Canvas 动态加载管道 | verify 通过；首屏 LCP 达标；点击开始有过渡 |
| **3** | **宇宙演化核心**：UniverseCanvas/Universe；共动坐标粒子系统（`lib/particles.ts` 种子随机）；尺度因子引擎（`lib/cosmology.ts`）；6 纪元场景初版；NarrativeOverlay 字幕系统 | verify 通过；6 纪元连贯可看；膨胀表现为空间拉伸 |
| **4** | **Cosmic Timeline**：对数刻度可拖动时间轴（指针 + 触控）；纪元跳转刻度；播放/暂停；与 useTimelineStore 双向联动 | verify 通过；拖动实时控制阶段与 a(t) |
| **5** | **哲学之问过渡**：earth 纪元结束 → QuestionReveal 淡入第一个问题；进入 Explorer 的引导 CTA；`question-reveal` 状态 | verify 通过；过渡节奏电影感 |
| **6** | **Philosophy Explorer**：自研 2D 力导向布局（`lib/graph/force-layout.ts`）；KnowledgeGraph（Canvas + DOM 标签）；/question/[id] 详情页（PositionCard/ArgumentPanel/RelatedQuestions）；SSG | verify 通过；图谱可拖拽缩放；详情页静态生成 |
| **7** | **内容填充**：10 个问题完整数据（立场/论证/反驳/人物/关联/渊源）；validators.ts 校验脚本并接入 verify | verify 通过；校验零错误 |
| **8** | **性能与适配**：usePerfLevel 三档生效（粒子数/DPR 上限差异化）；移动端触控全链路；prefers-reduced-motion；Lighthouse（Perf/A11y ≥ 90，桌面） | verify 通过；低档位粒子数下降可量化验证 |
| **9** | **扩展预留与部署**：`/api/llm` route 骨架；FutureBlocks 类型占位；Vercel 部署配置（预览环境）；README | 部署成功；verify 通过 |

**节奏建议**：Phase 0 独立提交一次；此后每 Phase 一次提交，commit message 标注阶段（如 `phase-3: 宇宙演化核心`）。建议尽早 `git init`（用户确认后执行）。

---

## 9. 设计原则与约束

### 9.1 视觉基调

- **深色宇宙背景**：深空黑（`#030308` 阶）为底，所有亮度来自"内容本身"（星光、文字、微光描边）；
- **极简 UI**：控件数量最少化，能无边框不边框，能透明不实心；
- **大量留白**：排版呼吸感优先于信息密度；
- **电影感**：字幕式旁白（细字重、字距拉开、逐句淡入）、缓慢运镜、暗角；
- **科技感**：等宽数字时间戳（`10⁻⁴⁴ s`）、细线刻度、微弱网格；
- **哲学感**：衬线中文大字标题（宋体系）、引文排印、静默留白时刻。

### 9.2 工程约束

1. **数据驱动**：哲学与纪元内容只存在于 `src/data/`，UI 零硬编码文案；
2. **组件化**：场景、时间轴、哲学 UI、基础件四层分明，模块边界见第 5 节规则；
3. **无预渲染视频**：一切动态视觉程序化生成（shader/粒子/程序动画）；
4. **性能优先**：禁止为效果引入未评估的重依赖；图谱用自研力导向而非重型图库；
5. **每阶段 verify 门禁**：typecheck + lint + build 三绿；
6. **中文注释**：所有代码注释使用中文（团队规范）；
7. **响应式**：移动端不是降级适配而是同等公民（触控拖动时间轴、图谱列表退化）；
8. **可访问性底线**：动效减弱偏好、键盘可达核心操作、文字对比度达标。

---

## 10. 风险与应对

| 风险 | 概率 | 应对 |
|---|---|---|
| R3F v9 + React 19 + Next 15 组合边车问题（SSR/HMR） | 中 | Canvas 一律 dynamic + ssr:false；Phase 0 起建立最小渲染冒烟页 |
| 低端设备粒子性能 | 高 | 三档粒子配置 + DPR 上限 + usePerfLevel 探测；Phase 8 量化验收 |
| 6 纪元视觉连贯性（转场突兀） | 中 | 统一尺度因子引擎驱动转场；色彩连续插值而非硬切 |
| 哲学内容严谨性 | 中 | 内容以通识哲学史为口径，标注人物与文献；避免评判性结论，呈现立场光谱 |
| 图谱在移动端不可用 | 中 | 移动端退化方案（第 6.2 节）在 Phase 6 同步交付 |
| Windows 路径含 `·` 等特殊字符 | 低 | 工具链均用相对路径调用；如遇问题与用户协商迁移目录 |

---

## 附：当前状态与下一步

- [x] 需求分析
- [x] 项目文档体系设计（本文档为第 1/6 份）
- [x] 目录结构设计
- [x] 页面架构设计
- [x] PhilosophyQuestion 数据结构设计
- [x] Cosmic Timeline 数据结构设计
- [x] Phase 0~9 开发计划
- [x] **Phase 0 执行**：撰写其余五份文档 → 初始化工程脚手架 → 首次 verify
- [x] Phase 1 ~ 9 全部完成并逐阶段通过 verify 门禁
- [x] 线上部署：https://cosmos-existence.vercel.app
