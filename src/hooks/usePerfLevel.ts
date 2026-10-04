/**
 * 设备性能探测 hook
 * 综合评估后输出 high / medium / low 三档，写入全局 PerfStore
 */
import { useEffect } from "react";
import { usePerfStore, PerfLevel } from "@/stores/usePerfStore";

function detectPerfLevel(): PerfLevel {
  if (typeof window === "undefined") return "high";

  const dpr = window.devicePixelRatio || 1;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  const cores = navigator.hardwareConcurrency || 2;

  // 低端特征：低内存、低核数、高 DPR 移动设备
  if (
    (typeof memory === "number" && memory <= 2) ||
    cores <= 2 ||
    (dpr >= 2 && window.innerWidth <= 768)
  ) {
    return "low";
  }

  // 中端：中内存或中核数或中小屏
  if (
    (typeof memory === "number" && memory <= 4) ||
    cores <= 4 ||
    window.innerWidth <= 1024
  ) {
    return "medium";
  }

  return "high";
}

export function usePerfLevel() {
  const setLevel = usePerfStore((s) => s.setLevel);
  const level = usePerfStore((s) => s.level);

  useEffect(() => {
    // 外部系统（设备能力）探测 → 写入 store，属于合法的 effect 同步
    setLevel(detectPerfLevel());
  }, [setLevel]);

  return { level };
}
