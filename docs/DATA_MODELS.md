# COSMOS / 存在 — 数据模型与编写规范

> 版本：v0.1 · 2026-10-02 · 完整类型定义见 [src/data/types.ts](../src/data/types.ts)

---

## 1. 核心实体

### CosmicEra（宇宙纪元）

6 个固定 id：`singularity / inflation / quarks / stars / galaxies / earth`。

关键字段：
- `cosmologicalTime.seconds`：真实秒数，用于对数时间轴映射（44 个数量级跨度）
- `visual.scaleRange: [a0, a1]`：尺度因子区间，空间膨胀引擎的输入
- `visual.particleCount.{high,medium,low}`：三档粒子数配置
- `visual.camera.radius`：共动框架内相机起止半径
- `philosophyHook`：纪元结束引出的哲学问题（earth → why-existence）

### PhilosophyQuestion（哲学问题）

10 个固定 id 与叙事弧线见主纲领 7.2 节。

关键字段：
- `epoch`：`cosmos | life | mind | meaning`，图谱聚类与叙事弧线的双重依据
- `positions[]`：立场，每个立场含 `arguments[]`（论证）与 `objections[]`（反驳）
- `relatedQuestionIds`：图谱的边
- `entryFromEra`：与宇宙体验的衔接点

### Argument（论证/反驳）

`premises[] → conclusion` 的三段式结构，`source` 记录文献出处。

## 2. 数据编写规范

1. **一个文件一个实体**：每个问题独立文件 `src/data/questions/<id>.ts`，`index.ts` 只做汇总导出。
2. **中文内容、英文键名**：所有文案中文化，字段名保持英文 kebab/camel。
3. **UI 零文案**：任何哲学/宇宙文案不得出现在组件代码中。
4. **引用完整性**：新增问题必须同时维护 `relatedQuestionIds` 的双向关系；`pnpm verify`（Phase 7 起）会运行 `validators.ts` 阻断悬空引用。

## 3. 校验规则（validators.ts）

- `relatedQuestionIds` 引用的 id 必须存在（无悬空边）
- `philosophyHook` / `entryFromEra` 交叉引用完整
- `order` 连续不重复
- 每个问题 ≥2 个立场，每个立场 ≥1 论证 + 1 反驳（Phase 7 强制）

## 4. 10 个问题清单与图谱边

| order | id | epoch | related |
|---|---|---|---|
| 1 | why-existence | cosmos | fine-tuning, nature-of-time |
| 2 | nature-of-time | cosmos | why-existence, fine-tuning |
| 3 | fine-tuning | cosmos | why-existence, origin-of-life |
| 4 | origin-of-life | life | fine-tuning, hard-problem |
| 5 | hard-problem | mind | origin-of-life, free-will, can-we-know, universe-knowing-self |
| 6 | free-will | mind | hard-problem, meaning-of-life |
| 7 | can-we-know | mind | hard-problem, meaning-of-life |
| 8 | universe-knowing-self | meaning | hard-problem, meaning-of-life |
| 9 | meaning-of-life | meaning | free-will, facing-death, universe-knowing-self |
| 10 | facing-death | meaning | meaning-of-life |

## 5. 扩展位

`FutureBlocks`（thoughtExperiments / journeyMilestones）已占位，第一版不渲染。
