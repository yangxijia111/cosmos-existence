"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useExperienceStore } from "@/stores/useExperienceStore";
import { useTimelineStore } from "@/stores/useTimelineStore";
import { usePerfLevel } from "@/hooks/usePerfLevel";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { VoidScreen } from "@/components/home/VoidScreen";
import { StartButton } from "@/components/home/StartButton";
import { CosmicTimeline } from "@/components/timeline/CosmicTimeline";
import { cosmicEras } from "@/data/cosmic-eras";
import { eraTicks } from "@/lib/cosmology";

/** 以下为非首屏组件：按阶段动态加载，保持首屏 bundle 最小 */
const UniverseCanvas = dynamic(
  () => import("@/components/canvas/UniverseCanvas").then((m) => m.UniverseCanvas),
  { ssr: false, loading: () => null }
);
const NarrativeOverlay = dynamic(
  () => import("@/components/home/NarrativeOverlay").then((m) => m.NarrativeOverlay),
  { ssr: false, loading: () => null }
);
const QuestionReveal = dynamic(
  () => import("@/components/home/QuestionReveal").then((m) => m.QuestionReveal),
  { ssr: false, loading: () => null }
);

/**
 * 首页 — 体验状态机宿主
 * void → awakening → cosmos → question
 *
 * 首屏（void）不使用 framer-motion：退出动画用 CSS transition 实现，
 * 保证首屏 LCP 不被动画库阻塞。
 */
export default function HomePage() {
  const phase = useExperienceStore((s) => s.phase);
  const setPhase = useExperienceStore((s) => s.setPhase);
  const play = useTimelineStore((s) => s.play);
  const cycleRate = useTimelineStore((s) => s.cycleRate);
  const rate = useTimelineStore((s) => s.rate);
  const setT = useTimelineStore((s) => s.setT);
  const t = useTimelineStore((s) => s.t);
  const reducedMotion = useReducedMotion();

  // 性能档位探测
  usePerfLevel();

  /** 从问题详情页「源于 X 纪元」进入：跳过 void/awakening，直达该纪元 */
  useEffect(() => {
    const from = new URLSearchParams(window.location.search).get("from");
    if (!from) return;
    if (!cosmicEras.some((e) => e.id === from)) return;
    const tick = eraTicks().find((t) => t.id === from);
    // 末纪元刻度恰为轴终点 t=1，会立即触发下一阶段；留 0.5% 余量让用户看到动画
    const startT = tick && tick.t < 1 ? tick.t : 0.995;
    setT(startT);
    setPhase("cosmos");
  }, [setT, setPhase]);

  /** void 屏退场：CSS 淡出后卸载 */
  const [voidExited, setVoidExited] = useState(false);
  useEffect(() => {
    if (phase !== "void" && !voidExited) {
      const timer = setTimeout(() => setVoidExited(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [phase, voidExited]);

  // awakening 过渡：2 秒后进入 cosmos 并开始播放时间线
  // prefers-reduced-motion：跳过长动画，直接呈现最终关键帧 + 哲学之问
  useEffect(() => {
    if (phase !== "awakening") return;
    if (reducedMotion) {
      setT(1);
      setPhase("question");
      return;
    }
    const timer = setTimeout(() => {
      setPhase("cosmos");
      play();
    }, 2000);
    return () => clearTimeout(timer);
  }, [phase, setPhase, play, reducedMotion, setT]);

  // cosmos 播放完毕（t=1 且停止）→ 进入 question
  useEffect(() => {
    if (phase === "cosmos" && t >= 1) {
      const timer = setTimeout(() => setPhase("question"), 1500);
      return () => clearTimeout(timer);
    }
  }, [phase, t, setPhase]);

  /**
   * 画面点击（热区覆盖 awakening / cosmos 两阶段）：
   * - awakening：立即结束 2s 过渡，直接进入 cosmos 并播放
   * - cosmos：轮换播放倍速 1 → 1.25 → 1.5 → 2 → 1（cycleRate）
   * 时间轴在 z-20 高于本热区（z-15），拖动/播放不受影响；
   * 键盘用户可用时间轴 slider 的方向键推进（a11y 底线）。
   */
  const handleTap = () => {
    if (phase === "awakening") {
      setPhase("cosmos");
      play();
    } else if (phase === "cosmos") {
      cycleRate();
    }
  };

  return (
    <main className="vignette relative min-h-screen overflow-hidden bg-[var(--color-void-950)]">
      {/* void：纯黑暗开场（CSS transition 淡出，不依赖 framer-motion） */}
      {(phase === "void" || !voidExited) && (
        <div
          className={`absolute inset-0 z-10 transition-opacity duration-[1500ms] ease-out ${
            phase === "void" ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <VoidScreen>
            <div className="flex flex-col items-center gap-12">
              <p className="font-mono-num text-xs tracking-[0.4em] text-[var(--color-void-400)]">
                COSMOS / 存在
              </p>
              <StartButton />
            </div>
          </VoidScreen>
        </div>
      )}

      {/* awakening → cosmos → question：Canvas 常驻 */}
      {phase !== "void" && (
        <>
          <UniverseCanvas />

          {/* 画面点击热区：canvas 之上、时间轴之下（awakening 跳过渡 / cosmos 切倍速） */}
          {(phase === "awakening" || phase === "cosmos") && (
            <div
              role="presentation"
              aria-hidden="true"
              onClick={handleTap}
              className="absolute inset-0 z-[15]"
            />
          )}

          {/* awakening：光晕涌现过渡（CSS keyframe 淡出，2s 窗口内完成） */}
          {phase === "awakening" && (
            <div className="animate-awakening-fade absolute inset-0 z-10 bg-[var(--color-void-950)]" />
          )}

          {/* cosmos：字幕 + 时间轴 */}
          {phase === "cosmos" && (
            <>
              <NarrativeOverlay />
              <CosmicTimeline />

              {/* 倍速提示：key 随倍速变化重挂载 → 每次切换重播淡出动画 */}
              <div
                key={rate}
                className="animate-hint-fade pointer-events-none absolute right-6 bottom-36 z-20 font-mono-num text-[10px] tracking-[0.3em] text-[var(--color-void-400)] md:right-12"
              >
                {rate}× · 点击切换倍速
              </div>
            </>
          )}

          {/* question：第一个哲学问题 */}
          {phase === "question" && <QuestionReveal />}
        </>
      )}
    </main>
  );
}
