# COSMOS / 存在 — 设计系统

> 版本：v0.1 · 2026-10-02 · token 落地于 [globals.css](../src/app/globals.css)

---

## 1. 色板

### 深空底色（void 阶）

| token | hex | 用途 |
|---|---|---|
| void-950 | `#030308` | 页面底色（深空黑） |
| void-900 | `#060611` | 卡片/表面 |
| void-800 | `#0b0b1a` | 控件底 |
| void-700→400 | `#131328`→`#3d3d6e` | 描边、分隔线 |
| void-200 | `#8a8ab8` | 次要文字 |
| void-50 | `#ededf5` | 主文字 |

### 宇宙点缀色（cosmic）

cyan `#6ee7f0` · indigo `#818cf8` · violet `#a78bfa` · rose `#fb7185` · amber `#fbbf24` · stellar `#fffbeb`

原则：**所有亮度来自内容本身**（星光、文字、微光描边），背景永远最暗。

## 2. 字体与排版

- **衬线中文**（`font-serif-cn`）：哲学标题、引文，宋体系（Noto Serif SC → Songti SC → STSong）
- **等宽数字**（`font-mono-num`）：时间戳 `10⁻⁴⁴ s`、刻度、科技标注
- **无衬线**：正文与 UI
- 标题字距拉开（tracking-wide），旁白逐句淡入、细字重

## 3. 留白与节奏

- 间距阶梯：xs 4 / sm 8 / md 16 / lg 32 / xl 64 / 2xl 128（px）
- 排版呼吸感优先于信息密度；每屏只传达一个意念

## 4. 动效原则

| 名称 | 时长 | 用途 |
|---|---|---|
| breathe | 4s 无限 | 首页星光呼吸 |
| slow | 2s | 场景过渡、问题淡入 |
| normal | 0.8s | UI 元素入场 |
| fast | 0.3s | 按钮 hover |

- 电影感三要素：字幕式旁白、缓慢运镜、暗角（`.vignette`）
- `prefers-reduced-motion`：全部动画降级为关键帧 + 文字

## 5. 组件视觉规范

- **Button**：无边框或细边框，透明底，hover 仅变文字/描边亮度
- **卡片**：void-900 底 + void-700 细描边，无阴影（亮度来自内容）
- **焦点**：`:focus-visible` indigo 描边，键盘可达
- **滚动条**：void-600 on void-950，8px 细条
