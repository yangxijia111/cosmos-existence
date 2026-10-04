"use client";

import { useMemo } from "react";
import { createRng } from "@/lib/particles";

/** 单颗呼吸星 */
function BreathingStar({
  x,
  y,
  size,
  delay,
}: {
  x: number;
  y: number;
  size: number;
  delay: number;
}) {
  return (
    <div
      className="absolute rounded-full animate-breathe"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        background: "radial-gradient(circle, #ededf5 0%, transparent 70%)",
        animationDelay: `${delay}s`,
        opacity: 0.15,
      }}
    />
  );
}

/**
 * VoidScreen — 初始纯黑暗 + 微弱呼吸星光
 * 不挂载 WebGL，DOM 动画即可，保证首屏秒开
 */
export function VoidScreen({ children }: { children: React.ReactNode }) {
  // 确定性星场：固定种子保证每次渲染一致
  const stars = useMemo(() => {
    const rng = createRng(42);
    return Array.from({ length: 24 }, (_, i) => ({
      x: rng() * 100,
      y: rng() * 100,
      size: 1 + rng() * 2,
      delay: rng() * 4,
      key: i,
    }));
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[var(--color-void-950)]">
      {stars.map((s) => (
        <BreathingStar key={s.key} x={s.x} y={s.y} size={s.size} delay={s.delay} />
      ))}
      {children}
    </div>
  );
}
