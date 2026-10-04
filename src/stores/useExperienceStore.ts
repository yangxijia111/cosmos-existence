import { create } from "zustand";

/**
 * 首页体验状态机
 * void → awakening → cosmos → question
 */
export type ExperiencePhase = "void" | "awakening" | "cosmos" | "question";

interface ExperienceState {
  phase: ExperiencePhase;
  /** 进入下一阶段的唯一入口 */
  setPhase: (phase: ExperiencePhase) => void;
  /** 重置回 void（重新开始体验） */
  reset: () => void;
}

export const useExperienceStore = create<ExperienceState>((set) => ({
  phase: "void",
  setPhase: (phase) => set({ phase }),
  reset: () => set({ phase: "void" }),
}));
