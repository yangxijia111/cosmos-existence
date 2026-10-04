/**
 * 宇宙学纯函数模块：对数时间映射 + 尺度因子引擎
 * 无任何 React / Three.js 依赖，可独立测试
 */
import { cosmicEras } from "@/data/cosmic-eras";

/** 时间轴起点与终点（秒），取对数映射 */
const LOG_START = Math.log10(cosmicEras[0].cosmologicalTime.seconds);
const LOG_END = Math.log10(cosmicEras[cosmicEras.length - 1].cosmologicalTime.seconds);

/** t ∈ [0,1] → 宇宙学时间（秒），对数插值 */
export function timeAt(t: number): number {
  const logSec = LOG_START + (LOG_END - LOG_START) * t;
  return Math.pow(10, logSec);
}

/** 第 i 个纪元起点的归一化 t 值（对数刻度） */
function eraStartT(i: number): number {
  return (
    (Math.log10(cosmicEras[i].cosmologicalTime.seconds) - LOG_START) /
    (LOG_END - LOG_START)
  );
}

/** 浮点容差：避免 10^log10(x) 往返误差导致终点落回上一纪元 */
const T_EPSILON = 1e-12;

/**
 * 纪元 i 的区间起点 t
 * 首纪元为 0；末纪元特殊处理——轴终点 LOG_END 取自其自身 seconds，
 * 直接当起点会得到零宽区间（u 恒 0），故回退到前一纪元刻度，
 * 让末纪元拥有 (前一刻度, 1] 的播放区间
 */
function eraBeginT(i: number): number {
  if (i === 0) return 0;
  if (i === cosmicEras.length - 1) return eraStartT(i - 1);
  return eraStartT(i);
}

/** 纪元 i 的区间终点 t（末纪元为轴终点 1） */
function eraEndT(i: number): number {
  return i === cosmicEras.length - 1 ? 1 : eraStartT(i + 1);
}

/** t ∈ [0,1] → 当前纪元索引（按纪元区间切分） */
export function eraIndexAt(t: number): number {
  const tc = Math.min(1, Math.max(0, t));
  for (let i = cosmicEras.length - 1; i >= 0; i--) {
    if (tc >= eraBeginT(i) - T_EPSILON) return i;
  }
  return 0;
}

/** t ∈ [0,1] → 纪元内局部进度 u ∈ [0,1] */
export function eraProgressAt(t: number): { index: number; u: number } {
  const tc = Math.min(1, Math.max(0, t));
  const index = eraIndexAt(tc);
  const begin = eraBeginT(index);
  const end = eraEndT(index);
  const u = end > begin ? (tc - begin) / (end - begin) : 0;
  return { index, u: Math.min(1, Math.max(0, u)) };
}

/**
 * 尺度因子 a(t)：空间膨胀引擎
 * 在当前纪元的 scaleRange 内按纪元内进度平滑插值（smoothstep）
 */
export function scaleFactorAt(t: number): number {
  const { index, u } = eraProgressAt(t);
  const [a0, a1] = cosmicEras[index].visual.scaleRange;
  const s = u * u * (3 - 2 * u);
  return a0 + (a1 - a0) * s;
}

/** 相机参数插值 */
export function cameraAt(t: number): { radius: number; fov: number } {
  const { index, u } = eraProgressAt(t);
  const cam = cosmicEras[index].visual.camera;
  const s = u * u * (3 - 2 * u);
  const radius = cam.radius[0] + (cam.radius[1] - cam.radius[0]) * s;
  const fov = cam.fov ? cam.fov[0] + (cam.fov[1] - cam.fov[0]) * s : 60;
  return { radius, fov };
}

/** 纪元刻度点（时间轴 UI 用）：返回每个纪元起点的 t 值 */
export function eraTicks(): { id: string; t: number; title: string; display: string }[] {
  return cosmicEras.map((era, i) => ({
    id: era.id,
    t: eraStartT(i),
    title: era.title,
    display: era.cosmologicalTime.display,
  }));
}
