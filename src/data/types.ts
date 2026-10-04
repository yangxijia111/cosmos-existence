/**
 * COSMOS / 存在 — 数据类型定义
 * 所有内容数据均以此文件为唯一事实来源（single source of truth）。
 */

/* ============================================================
   宇宙时间线：CosmicEra
   ============================================================ */

export type CosmicEraId =
  | "singularity"  // 奇点（普朗克时期）
  | "inflation"    // 暴胀
  | "quarks"       // 粒子形成（夸克 → 原子核 → 原子/CMB）
  | "stars"        // 恒星（第一代恒星点燃）
  | "galaxies"     // 星系（结构凝结）
  | "earth";       // 地球（太阳系、生命、今天）

export interface EraVisualConfig {
  /** 尺度因子 a(t) 区间 — 空间膨胀的引擎 */
  scaleRange: [number, number];

  /** 粒子数量三档配置（性能分级） */
  particleCount: {
    high: number;
    medium: number;
    low: number;
  };

  palette: {
    primary: string;
    accent: string;
    background: string;
  };

  /** 相机运镜（共动框架内）：起止半径与可选 FOV 变化 */
  camera: {
    radius: [number, number];
    fov?: [number, number];
  };

  /** 发光/能量强度 0~1 */
  intensity: number;

  /**
   * 屏幕亮度主题：bright = 该纪元画面大面积发白（如奇点白炽光核），
   * 覆盖层文字需切换为深色 + 白色光晕才可读；缺省 dim 保持浅色文字
   */
  screenBrightness?: "bright" | "dim";
}

export interface CosmicEra {
  id: CosmicEraId;
  order: number;                        // 叙事顺序 0~5

  /** 展示信息 */
  title: string;
  scientificLabel: string;
  cosmologicalTime: {
    seconds: number;
    display: string;
  };
  summary: string;
  narrative: string[];                  // 电影旁白文案（逐句淡入）

  /** 视觉配置（数据驱动的场景参数） */
  visual: EraVisualConfig;

  /** 该纪元结束时引出的哲学问题（体验钩子） */
  philosophyHook?: QuestionId;
}

/* ============================================================
   哲学问题：PhilosophyQuestion
   ============================================================ */

export type QuestionId =
  | "why-existence"
  | "fine-tuning"
  | "nature-of-time"
  | "origin-of-life"
  | "hard-problem"
  | "free-will"
  | "can-we-know"
  | "universe-knowing-self"
  | "meaning-of-life"
  | "facing-death";

export type QuestionEpoch = "cosmos" | "life" | "mind" | "meaning";

export interface PhilosophyQuestion {
  id: QuestionId;
  order: number;
  epoch: QuestionEpoch;

  title: string;
  subtitle: string;
  originStory: string;

  positions: Position[];

  /** 关联问题 = 图谱的边 */
  relatedQuestionIds: QuestionId[];

  /** 从哪个宇宙纪元进入 */
  entryFromEra?: CosmicEraId;

  /** 未来模块占位（Phase 9 预留） */
  futureBlocks?: FutureBlocks;
}

export interface Position {
  id: string;                           // kebab-case，问题内唯一
  name: string;
  tradition: string;
  summary: string;
  keyFigures: { name: string; period: string }[];
  arguments: Argument[];                // 支持论证
  objections: Argument[];               // 反驳
}

export interface Argument {
  id: string;
  label: string;
  premises: string[];
  conclusion: string;
  source?: string;
}

/** 未来模块占位 — 第一版仅保证类型兼容，不渲染 */
export interface FutureBlocks {
  thoughtExperiments?: string[];
  journeyMilestones?: string[];
}

/* ============================================================
   图谱（Explore 页用）
   ============================================================ */

export interface GraphNode {
  id: QuestionId;
  title: string;
  epoch: QuestionEpoch;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export interface GraphEdge {
  source: QuestionId;
  target: QuestionId;
}
