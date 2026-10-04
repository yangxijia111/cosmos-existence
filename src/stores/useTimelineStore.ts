import { create } from "zustand";
import { cosmicEras } from "@/data/cosmic-eras";
import { eraIndexAt } from "@/lib/cosmology";

/**
 * 宇宙时间线状态
 * t ∈ [0,1] 为归一化的对数时间轴
 */
interface TimelineState {
  t: number;
  playing: boolean;
  /** 1× 时的基准播放速度：每秒推进的 t 量 */
  speed: number;
  /** 播放倍率（点击画面轮换 PLAYBACK_RATES 循环） */
  rate: number;
  setT: (t: number) => void;
  setRate: (rate: number) => void;
  /** 轮换到下一档倍率：1 → 1.25 → 1.5 → 2 → 1 */
  cycleRate: () => void;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  /** 每帧由渲染循环调用，dt 单位秒 */
  tick: (dt: number) => void;
}

/** 默认播放总时长（秒，1× 时）：走完整个宇宙演化 */
export const DEFAULT_DURATION = 90;

/** 可选倍速档位（点击画面轮换） */
export const PLAYBACK_RATES = [1, 1.25, 1.5, 2] as const;

export const useTimelineStore = create<TimelineState>((set, get) => ({
  t: 0,
  playing: false,
  speed: 1 / DEFAULT_DURATION,
  rate: 1,
  setT: (t) => set({ t: Math.min(1, Math.max(0, t)) }),
  setRate: (rate) => set({ rate }),
  cycleRate: () => {
    const idx = PLAYBACK_RATES.indexOf(get().rate as (typeof PLAYBACK_RATES)[number]);
    const next = PLAYBACK_RATES[(idx + 1) % PLAYBACK_RATES.length];
    set({ rate: next });
  },
  play: () => set({ playing: true }),
  pause: () => set({ playing: false }),
  toggle: () => set((s) => ({ playing: !s.playing })),
  tick: (dt) => {
    const { playing, t, speed, rate } = get();
    if (!playing) return;
    const next = t + dt * speed * rate;
    if (next >= 1) {
      set({ t: 1, playing: false });
    } else {
      set({ t: next });
    }
  },
}));

/** 当前纪元派生选择器 */
export function useCurrentEra() {
  const t = useTimelineStore((s) => s.t);
  const idx = eraIndexAt(t);
  return cosmicEras[idx];
}
