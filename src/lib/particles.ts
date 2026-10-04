/**
 * 共动坐标粒子系统
 * 粒子以固定共动坐标生成，永不改变；
 * 渲染时世界坐标 = 共动坐标 × a(t)（尺度因子）
 */

/** 确定性伪随机数生成器（mulberry32），保证粒子分布可复现 */
export function createRng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface ComovingCloud {
  /** 共动坐标 [x0,y0,z0, x1,y1,z1, ...]，值域约 [-1,1] */
  positions: Float32Array;
  /** 每粒子大小与亮度种子 */
  sizes: Float32Array;
  seeds: Float32Array;
  count: number;
}

/**
 * 生成均匀球状分布的共动粒子云
 * @param count 粒子数
 * @param seed  随机种子（纪元 id 哈希，保证每纪元分布固定）
 */
export function generateCloud(count: number, seed: number): ComovingCloud {
  const rng = createRng(seed);
  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const seeds = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    // 均匀球内分布：r = u^(1/3)
    const r = Math.cbrt(rng());
    const theta = rng() * Math.PI * 2;
    const phi = Math.acos(2 * rng() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
    sizes[i] = 0.5 + rng();
    seeds[i] = rng();
  }

  return { positions, sizes, seeds, count };
}

/** 字符串 → 稳定哈希种子 */
export function hashSeed(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
