import { CosmicEra } from "./types";

/**
 * 宇宙六纪元数据骨架
 * 每个纪元包含完整的视觉配置与叙事文本，由 Universe 组件消费
 */
export const cosmicEras: CosmicEra[] = [
  {
    id: "singularity",
    order: 0,
    title: "奇点",
    scientificLabel: "普朗克时期",
    cosmologicalTime: { seconds: 5.39e-44, display: "10⁻⁴⁴ 秒" },
    summary: "时间与空间的起点，一切物理定律在此失效。",
    narrative: [
      "最初，没有时间，没有空间，没有物质。",
      "只有一团无限炽热的能量，在绝对虚空中脉动。",
      "这就是宇宙的开端 — 我们称之为奇点。",
    ],
    visual: {
      scaleRange: [0.01, 1],
      particleCount: { high: 60000, medium: 25000, low: 8000 },
      palette: {
        primary: "#fffbeb",
        accent: "#fbbf24",
        background: "#030308",
      },
      camera: { radius: [50, 10], fov: [75, 60] },
      intensity: 1.0,
      // 白炽光核 + 全屏加色粒子：纪元中后段屏幕大面积过曝发白
      screenBrightness: "bright",
    },
  },
  {
    id: "inflation",
    order: 1,
    title: "暴胀",
    scientificLabel: "暴胀时期",
    cosmologicalTime: { seconds: 1e-32, display: "10⁻³² 秒" },
    summary: "空间本身在指数级膨胀，比光速还快。",
    narrative: [
      "空间开始以惊人的速度膨胀。",
      "在十亿亿亿分之一秒内，宇宙扩大了无数倍。",
      "物质不是飞散开来 — 是空间本身在生长。",
    ],
    visual: {
      scaleRange: [1, 100],
      particleCount: { high: 60000, medium: 25000, low: 8000 },
      palette: {
        primary: "#6ee7f0",
        accent: "#818cf8",
        background: "#030308",
      },
      camera: { radius: [10, 80], fov: [60, 80] },
      intensity: 0.9,
    },
  },
  {
    id: "quarks",
    order: 2,
    title: "粒子",
    scientificLabel: "夸克时期 → 复合",
    cosmologicalTime: { seconds: 1e-12, display: "10⁻¹² 秒" },
    summary: "能量凝聚为物质，夸克结合成质子和中子。",
    narrative: [
      "炽热的能量开始凝聚为最基本的粒子。",
      "夸克、轻子、光子 — 宇宙的原始材料诞生了。",
      "它们将构成未来的一切：恒星、星系，以及你。",
    ],
    visual: {
      scaleRange: [100, 120],
      particleCount: { high: 60000, medium: 25000, low: 8000 },
      palette: {
        primary: "#a78bfa",
        accent: "#fb7185",
        background: "#030308",
      },
      camera: { radius: [80, 60] },
      intensity: 0.8,
    },
  },
  {
    id: "stars",
    order: 3,
    title: "恒星",
    scientificLabel: "宇宙黎明",
    cosmologicalTime: { seconds: 6.3e15, display: "2 亿年" },
    summary: "第一代恒星在黑暗中点燃，宇宙第一次有了光。",
    narrative: [
      "引力将氢和氦聚集在一起。",
      "在巨大的压力下，核聚变被点燃。",
      "第一代恒星的光芒刺破了宇宙的黑暗。",
    ],
    visual: {
      scaleRange: [120, 150],
      particleCount: { high: 60000, medium: 25000, low: 8000 },
      palette: {
        primary: "#fbbf24",
        accent: "#fb7185",
        background: "#030308",
      },
      camera: { radius: [60, 40] },
      intensity: 0.7,
    },
  },
  {
    id: "galaxies",
    order: 4,
    title: "星系",
    scientificLabel: "结构形成",
    cosmologicalTime: { seconds: 3.2e16, display: "10 亿年" },
    summary: "恒星聚集成星系，宇宙的大尺度结构浮现。",
    narrative: [
      "恒星不是孤独的，它们聚集成星系。",
      "数百万、数十亿的恒星在空间中形成旋涡。",
      "这就是我们今天所见的宇宙图景。",
    ],
    visual: {
      scaleRange: [150, 200],
      particleCount: { high: 60000, medium: 25000, low: 8000 },
      palette: {
        primary: "#818cf8",
        accent: "#6ee7f0",
        background: "#030308",
      },
      camera: { radius: [40, 100] },
      intensity: 0.6,
    },
  },
  {
    id: "earth",
    order: 5,
    title: "地球",
    scientificLabel: "太阳系与今天",
    cosmologicalTime: { seconds: 4.35e17, display: "138 亿年" },
    summary: "在一颗普通恒星旁，诞生了我们所知唯一有生命的世界。",
    narrative: [
      "在银河系的边缘，一颗普通的恒星周围。",
      "行星凝聚，其中一颗拥有了液态水和大气。",
      "在这里，宇宙开始认识自己 — 通过你。",
    ],
    visual: {
      scaleRange: [200, 220],
      particleCount: { high: 60000, medium: 25000, low: 8000 },
      palette: {
        primary: "#6ee7f0",
        accent: "#fbbf24",
        background: "#030308",
      },
      camera: { radius: [100, 5] },
      intensity: 0.5,
    },
    philosophyHook: "why-existence",
  },
];
