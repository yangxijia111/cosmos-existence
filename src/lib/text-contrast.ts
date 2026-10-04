/**
 * 覆盖层文字对比度引擎(纯函数)
 *
 * 奇点等「bright」纪元的白炽画面会让浅色字幕失去对比度,
 * 这里依据时间轴位置计算连续亮度因子 b ∈ [0,1],
 * 并给出暗/亮两套主题之间的插值样式,供字幕与时间轴覆盖层消费:
 *
 * - 当前纪元 bright:纪元前段画面尚暗(b=0 浅字),
 *   随光核增大平滑过渡到深字(b=1,约 u=0.55 起)
 * - 前一纪元 bright(交叉淡出残留白光):前 30% 从深字渐回浅字
 * - 其余情况 b=0,保持暗屏浅色主题
 */
import { cosmicEras } from "@/data/cosmic-eras";
import { eraProgressAt } from "@/lib/cosmology";

type Rgb = [number, number, number];

function hexToRgb(hex: string): Rgb {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function lerp(a: number, b: number, u: number): number {
  return a + (b - a) * u;
}

function mixRgb(c0: Rgb, c1: Rgb, u: number): string {
  const [r, g, b] = [
    Math.round(lerp(c0[0], c1[0], u)),
    Math.round(lerp(c0[1], c1[1], u)),
    Math.round(lerp(c0[2], c1[2], u)),
  ];
  return `rgb(${r}, ${g}, ${b})`;
}

/** smoothstep:边缘 e0~e1 之间平滑 0→1 */
function smoothstep(e0: number, e1: number, x: number): number {
  const u = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
  return u * u * (3 - 2 * u);
}

/**
 * 亮度因子 b(t):0 = 暗屏主题(浅色字),1 = 亮屏主题(深色字 + 白晕)
 */
export function contrastAt(t: number): number {
  const { index, u } = eraProgressAt(t);
  const era = cosmicEras[index];
  if (era.visual.screenBrightness === "bright") {
    // bright 纪元:前 15% 画面尚暗保持浅字,15%~55% 过渡到深字
    return smoothstep(0.15, 0.55, u);
  }
  if (index > 0 && cosmicEras[index - 1].visual.screenBrightness === "bright") {
    // 上一纪元白光的交叉淡出残留:前 30% 深字渐回浅字
    return 1 - smoothstep(0, 0.3, u);
  }
  return 0;
}

interface ShadowLayerSpec {
  y: number;
  blur: number;
  dark: { color: Rgb; alpha: number };
  bright: { color: Rgb; alpha: number };
}

// 暗屏第 1 层与 globals.css 的 .text-glow 保持一致;亮屏为白色柔光衬底
const SHADOW_SPEC: ShadowLayerSpec[] = [
  {
    y: 0,
    blur: 8,
    dark: { color: hexToRgb("#ffffff"), alpha: 0.15 },
    bright: { color: hexToRgb("#ffffff"), alpha: 0.95 },
  },
  {
    y: 0,
    blur: 24,
    dark: { color: hexToRgb("#818cf8"), alpha: 0.1 },
    bright: { color: hexToRgb("#ffffff"), alpha: 0.5 },
  },
  {
    y: 1,
    blur: 3,
    dark: { color: hexToRgb("#ffffff"), alpha: 0 },
    bright: { color: hexToRgb("#ffffff"), alpha: 0.9 },
  },
];

function mixShadow(b: number): string {
  return SHADOW_SPEC.map((s) => {
    const alpha = lerp(s.dark.alpha, s.bright.alpha, b);
    const [r, g, bl] = [
      Math.round(lerp(s.dark.color[0], s.bright.color[0], b)),
      Math.round(lerp(s.dark.color[1], s.bright.color[1], b)),
      Math.round(lerp(s.dark.color[2], s.bright.color[2], b)),
    ];
    return `${s.y}px 0 ${s.blur}px rgba(${r}, ${g}, ${bl}, ${alpha.toFixed(3)})`;
  }).join(", ");
}

/** 覆盖层文字主题:b=0 与原暗屏样式一致,b=1 为亮屏深色主题 */
export interface OverlayTextTheme {
  /** 主文字:旁白句 / 纪元标题 / 时间数字 */
  primary: string;
  /** 次要标签:COSMIC TIME / 科学标签 / 刻度时间 */
  secondary: string;
  /** 图标与悬停提示:播放按钮符号 / 刻度 hover 标题 */
  icon: string;
  /** 拖动手柄描边 */
  handle: string;
  /** 文字光晕(暗屏微光 ↔ 亮屏白晕) */
  shadow: string;
}

const THEME_DARK = {
  primary: hexToRgb("#ededf5"), // void-50
  secondary: hexToRgb("#3d3d6e"), // void-400
  icon: hexToRgb("#c4c4dc"), // void-200
  handle: hexToRgb("#ededf5"), // void-50
};

const THEME_BRIGHT = {
  primary: hexToRgb("#0b0b1a"), // void-800
  secondary: hexToRgb("#1c1c38"), // void-600
  icon: hexToRgb("#1c1c38"), // void-600
  handle: hexToRgb("#131328"), // void-700
};

/** t → 覆盖层文字主题(随亮度因子连续插值) */
export function textThemeAt(t: number): OverlayTextTheme {
  const b = contrastAt(t);
  return {
    primary: mixRgb(THEME_DARK.primary, THEME_BRIGHT.primary, b),
    secondary: mixRgb(THEME_DARK.secondary, THEME_BRIGHT.secondary, b),
    icon: mixRgb(THEME_DARK.icon, THEME_BRIGHT.icon, b),
    handle: mixRgb(THEME_DARK.handle, THEME_BRIGHT.handle, b),
    shadow: mixShadow(b),
  };
}
