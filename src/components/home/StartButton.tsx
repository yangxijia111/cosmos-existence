"use client";

import { useExperienceStore } from "@/stores/useExperienceStore";

/**
 * StartButton — "开始" 按钮
 * 极简：文字 + 微光描边，hover 提亮
 */
export function StartButton() {
  const setPhase = useExperienceStore((s) => s.setPhase);

  return (
    <button
      onClick={() => setPhase("awakening")}
      className="group relative px-10 py-4 text-sm tracking-[0.5em] text-[var(--color-void-200)] transition-colors duration-500 hover:text-[var(--color-void-50)] focus-visible:outline-none"
      aria-label="开始宇宙之旅"
    >
      <span className="font-serif-cn">开 始</span>
      {/* 底部微光线 */}
      <span className="absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-[var(--color-cosmic-indigo)] to-transparent transition-all duration-700 group-hover:w-full" />
    </button>
  );
}
