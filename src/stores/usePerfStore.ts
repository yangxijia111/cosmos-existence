import { create } from "zustand";

export type PerfLevel = "high" | "medium" | "low";

interface PerfState {
  level: PerfLevel;
  /** DPR 上限 */
  maxDpr: number;
  setLevel: (level: PerfLevel) => void;
}

export const PERF_PRESETS: Record<PerfLevel, { maxDpr: number }> = {
  high: { maxDpr: 2 },
  medium: { maxDpr: 1.5 },
  low: { maxDpr: 1 },
};

export const usePerfStore = create<PerfState>((set) => ({
  level: "high",
  maxDpr: PERF_PRESETS.high.maxDpr,
  setLevel: (level) => set({ level, maxDpr: PERF_PRESETS[level].maxDpr }),
}));
