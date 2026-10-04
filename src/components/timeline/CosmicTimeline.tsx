"use client";

import { useEffect, useRef } from "react";
import { useTimelineStore } from "@/stores/useTimelineStore";
import { useTimelineDrag } from "@/hooks/useTimelineDrag";
import { EraMarker } from "./EraMarker";
import { cosmicEras } from "@/data/cosmic-eras";
import { eraIndexAt, timeAt } from "@/lib/cosmology";

/**
 * CosmicTimeline — 对数刻度可拖动时间轴
 * 双向联动：store.t 驱动 UI；拖动/播放写回 store.t
 */
export function CosmicTimeline() {
  const t = useTimelineStore((s) => s.t);
  const playing = useTimelineStore((s) => s.playing);
  const rate = useTimelineStore((s) => s.rate);
  const toggle = useTimelineStore((s) => s.toggle);
  const play = useTimelineStore((s) => s.play);
  const pause = useTimelineStore((s) => s.pause);
  const setT = useTimelineStore((s) => s.setT);

  const { ref, progress, setProgress, dragging } = useTimelineDrag(t);

  // 拖动期间自动暂停，松手后若拖动前在播放则恢复
  // （否则播放会与拖动争抢 t 值，导致回跳）
  const resumeAfterDragRef = useRef(false);
  const handleTrackPointerDown = () => {
    resumeAfterDragRef.current = playing;
    if (playing) pause();
  };
  const handleTrackPointerUp = () => {
    if (!resumeAfterDragRef.current) return;
    resumeAfterDragRef.current = false;
    play();
  };

  // 拖动进度写回 store
  useEffect(() => {
    if (dragging) {
      setT(progress);
    }
  }, [progress, dragging, setT]);

  // 非拖动状态下，store.t 变化同步到 UI（例如播放推进）
  const lastSyncedT = useRef(t);
  useEffect(() => {
    if (!dragging && Math.abs(t - lastSyncedT.current) > 0.0005) {
      setProgress(t);
    }
    lastSyncedT.current = t;
  }, [t, dragging, setProgress]);

  const eraIdx = eraIndexAt(t);
  const era = cosmicEras[eraIdx];
  const seconds = timeAt(t);

  return (
    <div className="pointer-events-auto absolute bottom-0 left-0 right-0 z-20 px-6 pb-8 md:px-12">
      {/* 当前纪元信息 */}
      <div className="mb-4 flex items-end justify-between">
        <div>
          <div className="font-mono-num text-[10px] tracking-[0.3em] text-[var(--color-void-400)]">
            COSMIC TIME
          </div>
          <div className="mt-1 font-mono-num text-sm tracking-widest text-[var(--color-void-100)]">
            {seconds.toExponential(1)} s · {era.title}
            {/* 非 1× 时常驻显示倍速（倍速状态对屏幕阅读器也可见） */}
            {rate !== 1 ? ` · ${rate}×` : ""}
          </div>
        </div>

        {/* 播放控制 */}
        <button
          onClick={toggle}
          aria-label={playing ? "暂停" : "播放"}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-void-700)] text-[var(--color-void-200)] transition-colors hover:border-[var(--color-cosmic-indigo)] hover:text-[var(--color-void-50)] focus-visible:outline-none"
        >
          {playing ? (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <rect x="2" y="1" width="3" height="10" />
              <rect x="7" y="1" width="3" height="10" />
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <path d="M3 1l8 5-8 5V1z" />
            </svg>
          )}
        </button>
      </div>

      {/* 可拖动轨道 */}
      <div
        ref={ref}
        role="slider"
        aria-label="宇宙时间轴"
        aria-valuemin={0}
        aria-valuemax={1}
        aria-valuenow={t}
        aria-valuetext={`${era.title} · ${era.cosmologicalTime.display}`}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setT(t - 0.02);
          if (e.key === "ArrowRight") setT(t + 0.02);
        }}
        onPointerDown={handleTrackPointerDown}
        onPointerUp={handleTrackPointerUp}
        onPointerCancel={handleTrackPointerUp}
        className="relative h-8 w-full cursor-pointer touch-none select-none focus-visible:outline-none"
      >
        {/* 轨道线 */}
        <div className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-[var(--color-void-700)]" />
        {/* 已播放进度 */}
        <div
          className="absolute top-1/2 left-0 h-px -translate-y-1/2 bg-gradient-to-r from-[var(--color-cosmic-indigo)] to-[var(--color-cosmic-cyan)]"
          style={{ width: `${progress * 100}%` }}
        />
        {/* 纪元刻度 */}
        <EraMarker />
        {/* 拖动手柄 */}
        <div
          className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--color-void-50)] bg-[var(--color-void-950)] transition-transform duration-150"
          style={{ left: `${progress * 100}%` }}
        >
          <div className="absolute inset-0 rounded-full bg-[var(--color-cosmic-indigo)] opacity-0 transition-opacity duration-300 hover:opacity-30" />
        </div>
      </div>
    </div>
  );
}
