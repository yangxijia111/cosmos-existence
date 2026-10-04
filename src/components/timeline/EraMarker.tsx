"use client";

import { eraTicks, eraIndexAt } from "@/lib/cosmology";
import { useTimelineStore } from "@/stores/useTimelineStore";

/** 纪元刻度点 — 点击跳转 */
export function EraMarker() {
  const setT = useTimelineStore((s) => s.setT);
  const t = useTimelineStore((s) => s.t);
  const ticks = eraTicks();
  const currentEraIdx = eraIndexAt(t);

  return (
    <div className="relative h-full w-full">
      {ticks.map((tick, idx) => {
        const active = idx === currentEraIdx;
        return (
          <button
            key={tick.id}
            onClick={() => setT(tick.t)}
            aria-label={`跳转到${tick.title}纪元`}
            className="group absolute top-1/2 -translate-y-1/2 -translate-x-1/2 focus-visible:outline-none"
            style={{ left: `${tick.t * 100}%` }}
          >
            <div
              className={`h-1.5 w-1.5 rotate-45 border transition-all duration-300 ${
                active
                  ? "border-[var(--color-cosmic-indigo)] bg-[var(--color-cosmic-indigo)]"
                  : "border-[var(--color-void-400)] bg-transparent group-hover:border-[var(--color-void-200)]"
              }`}
            />
            {/* hover 提示 */}
            <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="text-center">
                <div className="text-xs tracking-widest text-[var(--color-void-100)]">
                  {tick.title}
                </div>
                <div className="font-mono-num text-[10px] tracking-wider text-[var(--color-void-400)]">
                  {tick.display}
                </div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
