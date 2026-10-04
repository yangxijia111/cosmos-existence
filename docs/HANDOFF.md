# COSMOS / 存在 — 智能体交接文档

> 用途：本项目已按 `PROJECT_PLAN.md` 完成 Phase 0 ~ 9 并部署上线。本文供接手的智能体/开发者快速理解现状、继续做细节优化。
> 交接时间：2026-10-02 · 第二轮优化：2026-10-02（见 §11）· 第三轮内容增强：2026-10-03（见 §11.6）· 第四轮开源发布准备：2026-10-04（见 §12）

---

## 1. 项目速览

- **产品**：沉浸式哲学探索网站。从宇宙诞生（大爆炸）一路走到人类意识与人生意义，让用户在体验中遭遇终极问题。
- **口号**：不是哲学百科，而是"体验式哲学引路人"。
- **线上地址**：https://cosmos-existence.vercel.app （生产环境，已验证 200）
- **Vercel 项目**：`cosmos-existence`（部署账号与团队信息仅存于本地 `.vercel/`、`.vercel-cli/`，均已 gitignore，不入库）
- **技术栈**：Next.js 16.3.8（App Router + Turbopack）+ React 19 + TypeScript strict + Tailwind CSS v4 + Three.js 0.186 + React Three Fiber v9 + Zustand v5 + Framer Motion + pnpm 12
- **质量门禁**：`pnpm verify` = `tsc --noEmit` + `eslint` + `next build` + `tsx src/data/validators.ts`（数据校验）

---

## 2. 当前状态（已完成并验证）

Phase 0 ~ 9 全部完成。验证证据：

- 本地 `pnpm verify` 全绿（typecheck / lint / build / 数据校验）
- 云端（Vercel）构建日志同样全绿，16 个静态页面生成
- Lighthouse 桌面端：**Performance 100 / Accessibility 95**（超过 ≥90 的验收线）
- 浏览器冒烟测试：首页全流程（void → awakening → cosmos → question）、`/explore` 图谱（hover 高亮、滚轮缩放、点击跳转）、详情页（展开立场、论证/反驳切换）均通过，无控制台错误

**注意**：Lighthouse 移动 preset 下 performance 约 0.83（LCP 模拟值 2.3s，而浏览器观测值仅 221ms，主要是 Lantern 模拟慢网络的系统误差 + 首屏文本节点较小）。若要继续优化移动端分数，优先做：放大首屏可 LCP 元素（如品牌标题字号）、减少首屏 hydration 前 JS。

---

## 3. 环境与命令（含踩坑记录）

```bash
pnpm install          # 安装依赖
pnpm dev              # 开发服务器（:3000）
pnpm verify           # 质量门禁（必须全绿才算完成一个改动）
pnpm exec tsx src/data/validators.ts   # 单独跑数据校验
npx vercel deploy --prod --yes -Q ".vercel-cli"   # 部署生产环境
```

### 踩坑记录（重要，避免重复踩）

1. **目录名含特殊字符**：工作区路径含空格、`·`、中文等字符，`create-next-app` 无法直接初始化。脚手架是在一个纯 ASCII 临时目录初始化后整体移入的。现在不要再动项目所在的目录名。
2. **pnpm 12 的构建脚本批准**：`onlyBuiltDependencies` 必须写在 `pnpm-workspace.yaml`（不是 package.json 的 `pnpm` 字段，pnpm 12 已不再读取后者）。当前已配置 `esbuild: true`（tsx 的依赖），缺失会导致 Vercel 上 `pnpm install` 失败。
3. **next/font/google 不可用**：本 Next 16.3.8 在干净 `.next` 下编译 `next/font/google`（Geist）会报 `Can't resolve '@vercel/turbopack-next/internal/font/google/font'`。已改用系统字体栈（globals.css 的 `--font-sans` / `--font-mono`），**不要改回 next/font/google**。
4. **tsc 依赖生成类型**：曾使用 Next 自动生成的 `LayoutProps` 全局类型，在干净 checkout（无 `.next`）下 `tsc` 会报 TS2304。已改为显式 `{ children: React.ReactNode }`。新增 layout/page 时同样不要依赖生成的全局路由类型。
5. **Vercel CLI 凭证目录**：部分环境无法写用户目录下的 `com.vercel.cli` 凭证（`%APPDATA%\com.vercel.cli`），必须加 `-Q ".vercel-cli"`（凭证存在项目内 `.vercel-cli/`，已被 .gitignore）。**该目录含登录凭证：严禁提交、严禁删除**。
6. **Windows 文件锁**：`pnpm start`/`pnpm dev` 运行时不要跑 `pnpm install`（node_modules 占用导致 EPERM）。先停服务再装。
7. **ESLint 严格规则**（next/core-web-vitals 自带）：
   - `react-hooks/set-state-in-effect`：effect 内同步 setState 会报错。派生状态要在渲染期计算；外部系统订阅（matchMedia、ResizeObserver）用 setState 合法。
   - `react-hooks/refs`：渲染期不允许读 ref.current。容器尺寸等用 state + ResizeObserver。
8. **本地重装依赖需注意**：`pnpm install --frozen-lockfile` 在 lockfile 与 package.json 不同步时会失败；改了 package.json 用不带参数的 `pnpm install`。

---

## 4. 架构地图

### 4.1 目录结构与关键文件职责

```
2026_10-2_COSMOS · 存在/
├── docs/                      # 6 份规划/设计文档 + 本交接文档
│   ├── PROJECT_PLAN.md        # 主纲领（需求、架构、数据模型、Phase 计划）
│   ├── PRD.md ARCHITECTURE.md DATA_MODELS.md DESIGN_SYSTEM.md ROADMAP.md
│   └── HANDOFF.md             # 本文档
├── src/
│   ├── app/
│   │   ├── layout.tsx         # 全局布局：metadata、深色底、zh-CN
│   │   ├── page.tsx           # 首页：体验状态机宿主（void/awakening/cosmos/question）
│   │   ├── explore/page.tsx   # 哲学图谱页（桌面图谱 / 移动端列表+MiniGraph）
│   │   ├── question/[id]/page.tsx   # 问题详情页（SSG + entryFromEra 入口）
│   │   └── api/llm/route.ts   # LLM 接口骨架（校验 LLM_API_KEY，未接真实模型）
│   ├── components/
│   │   ├── canvas/            # ===== R3F 三维层（不得 import 哲学数据）=====
│   │   │   ├── UniverseCanvas.tsx   # Canvas 宿主，dynamic+ssr:false，DPR 上限来自 PerfStore
│   │   │   ├── Universe.tsx         # 场景组装：按 eraIndex 挂载/卸载场景 + 时间线 tick
│   │   │   ├── scenes/              # 6 纪元场景：Singularity/Inflation/ParticleEpoch/Stars/Galaxies/Earth
│   │   │   ├── effects/ComovingCloud.tsx   # 共动粒子云（核心视觉件）
│   │   │   └── controls/CameraRig.tsx      # 相机运镜（dolly + 缓慢 drift，时间线驱动）
│   │   ├── timeline/          # CosmicTimeline.tsx（对数刻度拖动+播放）+ EraMarker.tsx
│   │   ├── philosophy/        # KnowledgeGraph/MiniGraph/QuestionHero/PositionCard/ArgumentPanel/RelatedQuestions
│   │   ├── home/              # VoidScreen/StartButton/NarrativeOverlay/QuestionReveal
│   │   └── ui/                # Button/IconButton/Divider/Typography
│   ├── data/                  # ===== 内容唯一事实来源 =====
│   │   ├── types.ts           # 全部类型（CosmicEra / PhilosophyQuestion / FutureBlocks...）
│   │   ├── cosmic-eras.ts     # 6 纪元数据（含三档粒子数、色板、相机、旁白）
│   │   ├── questions/         # 10 个问题，一题一文件 + index.ts（汇总与建图）
│   │   └── validators.ts      # 数据校验（接入 verify）
│   ├── stores/                # useExperienceStore（阶段机）/ useTimelineStore（t/播放）/ usePerfStore（三档）
│   ├── hooks/                 # usePerfLevel / useReducedMotion / useTimelineDrag
│   ├── lib/                   # cosmology.ts（a(t)/时间映射，纯函数）particles.ts（共动粒子）graph/force-layout.ts（2D 力导向）
│   └── app/globals.css        # 设计系统全部 token（@theme 块）
├── public/                    # 默认 Next SVG 尚未替换（可优化）
├── vercel.json                # 构建命令 = pnpm verify，region hkg1
├── pnpm-workspace.yaml        # onlyBuiltDependencies: esbuild
├── .prettierrc                # semi:true, printWidth:100
└── package.json               # scripts.dev/build/start/lint/typecheck/verify/validate:data
```

### 4.2 核心数据流（首页体验）

```
user click 开始
  → useExperienceStore: void → awakening
  → 2s 后 → cosmos，useTimelineStore.play()
  → useFrame: timelineStore.tick(dt) 推进 t（0~1）
      → lib/cosmology.ts: eraIndexAt(t) / eraProgressAt(t) / scaleFactorAt(t)=a(t) / cameraAt(t)
      → Universe.tsx: 挂载当前纪元场景 + 上一纪元（交叉淡入）
      → ComovingCloud: 世界坐标 = 共动坐标 × a(t)（group scale={a}）
      → CameraRig: 相机半径/FOV 插值 + 缓慢 drift
      → NarrativeOverlay: 按纪元 u 逐句淡入旁白（数据来自 cosmic-eras.ts）
  → CosmicTimeline: 拖动/纪元刻度/播放暂停 → 写回 store.t（双向联动）
  → t=1 → 1.5s 后 → question：QuestionReveal 淡入 why-existence + CTA
```

### 4.3 图谱数据流（/explore）

```
buildGraph()（data/questions/index.ts）
  → simulate() 300 步力导向迭代（lib/graph/force-layout.ts）
  → KnowledgeGraph: Canvas 画边+节点光晕，DOM 层放可访问标签（hover/拖拽/点击/键盘可达）
  → 滚轮缩放 zoom state（0.5~3）；移动端（≤768px）切换为分类列表 + MiniGraph 静态预览
```

---

## 5. 数据驱动工作方式（接手后最常动的部分）

### 新增/修改一个哲学问题

1. 复制 `src/data/questions/` 下任一文件改内容；**不碰任何组件**。
2. 在 `src/data/questions/index.ts` 的 `questions` 数组加入导出。
3. 运行 `pnpm verify`（validators 会强制检查）。
4. 部署 `npx vercel deploy --prod --yes -Q ".vercel-cli"`。

### validators 强制规则（违反则 verify 失败）

- 每个问题 ≥ 2 个立场；每个立场 ≥ 1 论证 + 1 反驳
- `positions[].id` 问题内唯一
- `order` 连续不重复（1..10）
- `relatedQuestionIds` 引用的 id 必须存在（无悬空边）
- `entryFromEra` / `philosophyHook` 交叉引用必须有效

### 新增/修改宇宙纪元

改 `src/data/cosmic-eras.ts`。字段含义见 `DATA_MODELS.md`；`scaleRange` 是空间膨胀引擎输入；`particleCount` 三档对应性能分级；`narrative` 是逐句淡入的旁白。

---

## 6. 设计系统速查

全部 token 在 `src/app/globals.css` 的 `@theme` 块：

- **色板**：`--color-void-950..50`（深空阶）、`--color-cosmic-cyan/indigo/violet/rose/amber/stellar`
- **字体**：`--font-serif-cn`（宋体标题）、`--font-sans`（system-ui）、`--font-mono`（等宽数字）
- **排版**：黄金比例 `--text-xs..4xl`（1.618 递进）
- **动效**：`--duration-breath/slow/normal/fast`；工具类 `.animate-breathe`、`.text-glow`、`.vignette`、`.animate-awakening-fade`

视觉基调：深空黑 `#030308` 底、极简 UI、大量留白、字幕式旁白、暗角。改视觉先改 token，不要在组件里写死颜色。

---

## 7. 工程约束（必须遵守）

1. **模块边界**（违反架构约定，review 会被打回）：
   - `components/canvas/**` 不得 import `@/data/**` 的哲学内容；只读 stores。
   - `data/**` 纯数据+类型，不 import 组件/store。
   - `lib/**` 纯函数，无 React 依赖。
   - 流程控制只存在于 `useExperienceStore` / `useTimelineStore`；UI 与 3D 场景都是状态消费者。
2. **数据驱动**：UI 组件零硬编码哲学/宇宙文案（图例的 epoch 名称等静态 UI 标签除外）。
3. **中文注释**：所有代码注释用中文。
4. **无预渲染视频**：一切动态视觉程序化生成。
5. **Lint 规则**：effect 内禁同步 setState、渲染期禁读 ref（见 §3 踩坑 7）。
6. **每改必过 verify**：`pnpm verify` 四绿才算完成。

---

## 8. 已知问题与优化候选清单（按优先级）

### P1（建议优先处理）
- ~~**图谱不支持平移**~~ ✅ 第二轮已做：空白处（canvas）按下拖动平移视点，光标 grab/grabbing 反馈；滚轮缩放保留。视图数学抽至 `src/lib/graph/viewport.ts` 纯函数（含单测）。
- **图谱节点是静态布局**：simulate() 只跑 300 步后冻结；可做拖拽后局部松弛（re-simulate）或按 epoch 分簇引力，增强"从宇宙到意义"的隐喻。
- ~~**时间轴拖动体验**~~ ✅ 第二轮已做：pointerdown 时若在播放则自动 pause，pointerup/cancel 恢复（曾出现播放与拖动争抢 t 的回跳）。
- ~~**`THREE.Clock` 弃用警告**~~ ✅ 第二轮已修复：`state.clock.elapsedTime` 全部改为 `useFrameElapsed`（每帧 delta 累加），控制台已无弃用警告来源。

### P2（体验打磨）
- ~~`public/` 还是 create-next-app 默认 SVG~~ ✅ 第二轮已做：删除默认 SVG/favicon，新增 `src/app/icon.svg`（奇点光核 + 共动轨道）、`apple-icon.tsx`、`opengraph-image.tsx`（1200×630，ImageResponse 程序化生成，mulberry32 确定性星点，构建产物可复现）。
- ~~NarrativeOverlay 旁白句切换用 `floor(u * total)`，末句停留时间短~~ ✅ 第二轮已做：改为按权重分配（末句权重 ×2）。
- 场景转场是"上一纪元 opacity 0.35 淡出 + 新纪元淡入"，6 个场景共用同一粒子云种子策略，转场电影感可再打磨（见 PROJECT_PLAN 难点1的原始设想：色彩连续插值）。
- ~~问题详情页目前直接 `router.push('/')` 回首页~~ ✅ 第二轮已做：nav 的"源于 X · 时间"链接改为 `/?from=<eraId>`，首页读取后跳过 void/awakening 直达该纪元（末纪元留 0.5% 余量避免立即跳转 question）。
- 移动端图谱无交互预览，只有静态 MiniGraph；时间线在移动端可加左右滑动手势。

### P3（基础设施）
- ~~无单元测试~~ ✅ 第二轮已做：`src/lib/**` 补 node:test 单测（cosmology / particles / force-layout / viewport，23 用例），`pnpm test` 运行，零新依赖（复用 tsx）。
- `usePerfLevel` 探测后无运行中降级（FPS 掉档不自动降粒子数）；可加 FPS 采样动态切档。
- `/api/llm` 仅骨架；接真实 LLM 时 RAG 索引进 `src/data/`（同数据源）。
- Git 尚无任何业务提交（只有一个 Initial commit），见 §9。

---

## 9. 部署与 Git 现状

### Vercel
- 生产：`https://cosmos-existence.vercel.app`；预览：`https://cosmos-existence-<hash>-<team>.vercel.app`（team 名见本地 Vercel 配置，不入库）
- 部署命令（必须带 `-Q ".vercel-cli"`，原因见 §3 踩坑 5）：
  ```bash
  npx vercel deploy --prod --yes -Q ".vercel-cli"
  ```
- `vercel.json`：`buildCommand: pnpm verify`（云端跑完整门禁）、region `hkg1`。
- 项目开启了 Deployment Protection，但生产域已验证公网 200（生产部署默认公开）。
- LLM 功能上线前需在 Vercel 项目设置里加环境变量 `LLM_API_KEY`。

### Git（重要：尚未提交任何业务代码）
- 当前只有一个 `Initial commit from Create Next App`；**本项目的全部源码、docs/、vercel.json、.prettierrc 等均为未提交状态**（见 `git status`）。
- 建议提交策略（与 PROJECT_PLAN 的节奏建议一致）：
  ```bash
  git add docs src public vercel.json .prettierrc README.md package.json pnpm-lock.yaml pnpm-workspace.yaml .gitignore
  git commit -m "phase-0~9: COSMOS 存在完整实现 + 部署配置"
  ```
  **切勿 `git add .`**：`.vercel-cli/`（Vercel 凭证）、`.next/`、`node_modules/`、`lighthouse-*.json` 必须保持被 .gitignore 忽略（已配置，但 `git add .` 前请务必先 `git status` 确认）。
- 本地 `.vercel-cli/` 目录：含 Vercel 登录凭证，**严禁删除/移动/提交**。

---

## 10. 给接手智能体的第一步建议

1. 读 `docs/PROJECT_PLAN.md`（主纲领）+ `docs/DESIGN_SYSTEM.md`，建立产品与设计的完整心智模型。
2. 跑 `pnpm install && pnpm verify` 确认本地环境绿。
3. 改动遵循"小步 + verify 门禁"；每完成一组细节优化跑一次 verify，再按需部署。
4. 优先从 §8 的 P1 清单挑 1~2 项做（预期收益最高的是图谱平移 + 时间轴拖动暂停联动）。
5. 涉及 `src/data/` 的改动无需碰组件；涉及 `components/canvas/**` 的改动注意模块边界（不 import 哲学数据）。

---

## 11. 第二轮优化记录（2026-10-02）

**验证门禁**：每项改动后 `pnpm verify` 四绿；`pnpm test` 23 用例全过；浏览器冒烟（IAB）覆盖 void→awakening→cosmos 全流程、时间轴拖动、`?from` 直达。

### 11.1 修复的真实 bug：地球纪元零宽区间

`src/lib/cosmology.ts` 的历史缺陷（由新增单测暴露）：

1. **浮点往返误差**：`eraIndexAt(1)` 在对数域往返后落回上一纪元（galaxies），而非 earth；
2. **earth 区间宽度为零**：`LOG_END` 直接取 earth 自身的 `seconds`，导致 earth 起点 = 轴终点，`eraProgressAt` 的 u 恒为 0——**地球纪元相机推近（radius 100→5）与蓝点淡入在产品中从未生效**，播放终点实际停在星系。

修复：改为显式的"区间端点"语义——`eraBeginT(i)`（i=0 为 0；末纪元回退到前一纪元刻度）+ `eraEndT(i)`（末纪元为 1），全部在同一 t 域比较，消除跨域往返。`eraTicks` 语义不变（仍是各纪元刻度）。效果验证：`/?from=earth` 直达后 COSMIC TIME 正确显示"2.2e+17 s · 地球"，旁白与蓝点正常。

### 11.2 交互与体验

- **时间轴拖动联动暂停**：拖动时自动 pause、松手恢复，消除了播放与拖动争抢 t 的回跳。
- **开场动画点击倍速**：awakening / cosmos 两阶段有全屏点击热区（canvas 之上、时间轴之下）——awakening 点击立即进 cosmos 并播放；cosmos 点击轮换播放倍速 **1 → 1.25 → 1.5 → 2 → 1**（store 的 `cycleRate`，`tick` 按 `speed × rate` 推进）。右下角倍速提示随切换重挂载重播淡出（`animate-hint-fade`，`key={rate}`）；时间轴信息行在非 1× 时常驻显示 `· 1.5×`。键盘/触达用户可拖动时间轴推进（a11y 底线）。倍速循环与倍率推进有 store 单测覆盖。
- **图谱画布平移**：`KnowledgeGraph` 空白处（canvas）按下拖动平移，光标 grab/grabbing；滚轮缩放（0.5~3）与节点拖拽保留。视图数学抽至 `src/lib/graph/viewport.ts`（worldToScreen / screenToWorld / pannedView / viewScale），KnowledgeGraph 与 MiniGraph 共用。
- **entryFromEra 直达**：详情页 nav 链接 → `/?from=<eraId>` → 首页跳过 void 直达该纪元（末纪元留 0.5% 余量）。
- **旁白末句加权**：末句时间权重 ×2，结尾停留更久。

### 11.3 资产与警告

- **图标/og 图**：`src/app/icon.svg`、`apple-icon.tsx`（180×180）、`opengraph-image.tsx`（1200×630，ImageResponse + 确定性星点）。删除 create-next-app 默认 SVG 与 favicon.ico（均无代码引用）。
- **THREE.Clock 弃用**：新增 `src/hooks/useFrameElapsed.ts`（每帧 delta 累加），CameraRig / Singularity / Earth 三处替换。

### 11.4 测试

`pnpm test` = `tsx --test`（node:test，零新依赖）：cosmology（8）、particles（6）、force-layout（4）、viewport（5）、useTimelineStore（5）。测试语义注意：对数往返有浮点误差，端点断言用相对误差；纪元刻度是区间边界点，归属断言用区间中点。

### 11.6 内容增强（第三轮，2026-10-03）

以**斯坦福哲学百科全书（SEP）权威条目**为口径，全部 10 个问题数据文件重写增强：

- **规模**：30 → 48 立场（每题 4~5 个），55 个论证 + 51 个反驳，**82 处文献出处**（`Argument.source` 首次全面启用），81 位代表人物（带生卒年）。
- **来源**：SEP 的 Nothingness（Sorensen）、Fine-Tuning、Time、Consciousness、Free Will、Skepticism、The Meaning of Life（Metz）、Death 条目 + 生命起源（Oparin-Haldane / Miller-Urey 1953 / RNA World，Schopf 2024 综述）+ Sagan《Cosmos》1980 第一集原文出处。
- **代表性增强**：why-existence 增补 van Inwagen 无限彩票、Lowe 真值制造者、Krauss 量子真空（及 David Albert 的"偷换无概念"批评）；fine-tuning 补贝叶斯论证、行刑队论证（Leslie）、逆赌徒谬误（Hacking）；time 补 McTaggart 非实在论证、现在主义真值制造者难题；hard-problem 按当代版图（二元论/同一论/幻觉论/泛心论/神秘论）；free-will 补法兰克福案例、相辩论证、操纵论证、演化自由论；meaning-of-life 按 Metz 分类（超自然/主观/混合/荒诞/虚无）；facing-death 补伊壁鸠鲁双论证、剥夺论、威廉姆斯永生厌倦、memento mori。
- **保持中立**：每立场论证与反驳对仗呈现，无评判性结论（遵守 PROJECT_PLAN §10 内容纪律）。
- **图谱边**：relatedQuestionIds 适度加密（why-existence↔universe-knowing-self、free-will↔facing-death 等新增边），全部通过 validators 校验。

### 11.5 本轮未验证项（环境限制，如实记录）

- **图谱平移的浏览器交互**：IAB 的 `cua.drag` 只派发 pointermove，不派发 pointerdown/up，按下事件无法送达 canvas；且 hidden 页 ResizeObserver 不触发（图谱 size 卡 0）、rAF 暂停。平移数学有单测、接线有 typecheck/lint，但真实指针行为未做浏览器验证——建议在可见浏览器中手动过一遍。
- **拖动中暂停的中间态**：同理未直接观测到（松手恢复已通过 aria-label 验证）。

---

## 12. 第四轮：GitHub 开源发布准备（2026-10-04）

**目标**：把项目整理为可公开发布的 GitHub 开源仓库。本轮已完成全部本地准备，**尚未执行任何公开发布操作**（未建远程仓库、未 push），等待用户确认 License 与仓库名后执行。

### 12.1 本轮改动清单

| 改动 | 说明 |
|---|---|
| `README.md` 全量重写 | 中英双语（顶部 `[中文](#中文) \| [English](#english)` 锚点跳转），基于项目真实功能/命令/数据编写；截图位于 `docs/assets/` |
| `.gitignore` 加固 | 新增 `!.env.example` 例外（原 `.env*` 规则会误伤示例文件）、`.zcodeignore`、`Thumbs.db`/`Desktop.ini`，删除重复的 `.vercel` 行 |
| `.env.example` 新建 | 唯一环境变量 `LLM_API_KEY`（可选，仅 `/api/llm` 预留接口用） |
| `docs/HANDOFF.md` 脱敏 | 移除 Windows 用户名路径、Vercel team 名（含 QQ 号特征）、本地绝对路径共 5 处（见 12.2） |
| `docs/assets/` 新建 | README 展示截图（生产模式 `pnpm start` 实截，非测试残留） |

### 12.2 安全审计结论（可公开发布口径）

- **Git 历史**：仅 1 个提交（`3ef812d` Create Next App 脚手架模板），无任何密钥/敏感文件曾入库。业务代码全部未提交，等于"零历史包袱"，首次提交即是干净快照。
- **凭证**：`.vercel-cli/auth.json`（Vercel 登录 token）、`.vercel/project.json`（projectId/orgId）均已被 .gitignore 覆盖且未被 git 跟踪，验证方式 `git check-ignore -v`。`git ls-files` 确认 20 个已跟踪文件均为脚手架模板文件。
- **源码扫描**：`src/`、`docs/`、根配置文件中无 API key / token / 密码 / `sk-`、`ghp_`、`AKIA` 等凭证模式命中；`/api/llm` 只读 `process.env.LLM_API_KEY`，无硬编码。
- **个人信息**：本轮已将 HANDOFF 中的本地路径（`d:\Desktop\...`、`C:\Users\<用户名>\...`）、Vercel team 名（`3171452587-...`，含个人账号特征）脱敏为通用描述。其余文档（PROJECT_PLAN/PRD/ARCHITECTURE/DATA_MODELS/DESIGN_SYSTEM/ROADMAP）扫描无个人信息、无内网地址、无 IDE 配置泄漏。
- **不入库目录**（.gitignore 覆盖）：`node_modules/`、`.next/`、`.vercel/`、`.vercel-cli/`（凭证）、`gui-test-screenshots/`（测试截图）、`lighthouse-*.json`（含 base64 截图的本地报告）、`*.tsbuildinfo`、`.zcodeignore`（本地工具配置）。
- **结论**：当前工作区内容可安全公开，无需要清洗 Git 历史的项目。

### 12.3 用户确认结果（2026-10-04）

1. **License**：✅ 已确认 MIT，`LICENSE` 文件已创建（版权人 yangxijia111）。
2. **仓库名**：✅ 已确认 `cosmos-existence`，仓库 **Public**。
3. **仓库简介**：`沉浸式哲学探索网站 — 从宇宙诞生到人类意识与人生意义 / An immersive philosophy journey from the birth of the universe to consciousness and the meaning of life`。

### 12.4 发布步骤（已获用户确认执行）

```bash
# 1. 本地提交（切勿 git add . ，已核对 status）
git add .gitignore .env.example README.md AGENTS.md CLAUDE.md vercel.json .prettierrc \
        package.json pnpm-lock.yaml pnpm-workspace.yaml eslint.config.mjs next.config.ts \
        postcss.config.mjs tsconfig.json docs/ public/ src/
git commit -m "feat: COSMOS/存在 Phase 0-9 完整实现（体验流+图谱+数据驱动+部署）"

# 2. LICENSE 文件（按用户所选协议创建后一并提交）

# 3. 创建 Public 仓库并推送（gh 已安装则）
gh repo create cosmos-existence --public --source . --push
# 或手动：先在 GitHub 网页建空仓库，再
# git remote add origin git@github.com:<user>/cosmos-existence.git && git push -u origin main
```

### 12.5 发布后注意

- README 徽章中 "Deployed on Vercel" 指向生产域名，若域名变更需同步修改。
- 若未来某天 `git add .` 误提交 `.vercel-cli/`：立即在 GitHub 删除该 commit 并**吊销 Vercel token**（仅删文件不够，历史里仍可见）。
- `AGENTS.md` 由 `next dev` 自动维护（BEGIN/END 标记块），提交它可保持工作树干净。

---

## 附：关键文件直达

| 关注点 | 文件 |
|---|---|
| 体验状态机 | `src/app/page.tsx` |
| 时间线引擎（纯函数） | `src/lib/cosmology.ts` |
| 共动粒子 | `src/lib/particles.ts` + `src/components/canvas/effects/ComovingCloud.tsx` |
| 6 纪元场景 | `src/components/canvas/scenes/*.tsx` |
| 时间轴 UI | `src/components/timeline/CosmicTimeline.tsx` + `src/hooks/useTimelineDrag.ts` |
| 图谱 | `src/components/philosophy/KnowledgeGraph.tsx` + `src/lib/graph/force-layout.ts` |
| 数据校验规则 | `src/data/validators.ts` |
| 设计 token | `src/app/globals.css` |
| 性能分级 | `src/hooks/usePerfLevel.ts` + `src/stores/usePerfStore.ts` |
| 帧累加计时（替代 THREE.Clock） | `src/hooks/useFrameElapsed.ts` |
| 图谱视图变换（纯函数 + 单测） | `src/lib/graph/viewport.ts` |
| 单元测试 | `src/lib/*.test.ts`、`src/lib/graph/*.test.ts`（`pnpm test`） |
