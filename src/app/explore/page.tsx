"use client";

import { Suspense, lazy, useSyncExternalStore } from "react";
import Link from "next/link";
import { questions } from "@/data/questions";
import { MiniGraph } from "@/components/philosophy/MiniGraph";

const KnowledgeGraph = lazy(() =>
  import("@/components/philosophy/KnowledgeGraph").then((m) => ({
    default: m.KnowledgeGraph,
  }))
);

/** 视口宽度检测（移动端 ≤768px 退化为列表） */
function useIsMobile() {
  return useSyncExternalStore(
    (cb) => {
      const mql = window.matchMedia("(max-width: 768px)");
      mql.addEventListener("change", cb);
      return () => mql.removeEventListener("change", cb);
    },
    () => window.matchMedia("(max-width: 768px)").matches,
    () => false
  );
}

const epochLabels: Record<string, string> = {
  cosmos: "宇宙",
  life: "生命",
  mind: "心灵",
  meaning: "意义",
};

const epochColors: Record<string, string> = {
  cosmos: "#6ee7f0",
  life: "#a78bfa",
  mind: "#818cf8",
  meaning: "#fb7185",
};

/**
 * Philosophy Explorer — 交互式哲学知识图谱
 * 桌面端：全屏力导向图谱（Canvas + DOM 标签）
 * 移动端：纵向分类列表
 */
export default function ExplorePage() {
  const isMobile = useIsMobile();

  return (
    <main className="relative flex h-screen flex-col overflow-hidden bg-[var(--color-void-950)]">
      {/* 页头 */}
      <header className="z-20 flex items-center justify-between px-6 py-6 md:px-12">
        <h1 className="font-serif-cn text-lg tracking-[0.4em] text-[var(--color-void-100)]">
          哲学图谱
        </h1>
        <p className="font-mono-num text-[10px] tracking-widest text-[var(--color-void-400)]">
          从宇宙到意义 · {questions.length} 个问题
        </p>
      </header>

      {isMobile ? (
        /* 移动端：迷你图谱预览 + 纵向分类列表 */
        <div className="flex-1 overflow-y-auto px-6 pb-12">
          <MiniGraph />
          {(["cosmos", "life", "mind", "meaning"] as const).map((epoch) => (
            <section key={epoch} className="mt-8">
              <h2
                className="text-xs tracking-[0.3em]"
                style={{ color: epochColors[epoch] }}
              >
                {epochLabels[epoch]}
              </h2>
              <div className="mt-4 space-y-3">
                {questions
                  .filter((q) => q.epoch === epoch)
                  .map((q) => (
                    <Link
                      key={q.id}
                      href={`/question/${q.id}`}
                      className="block rounded-sm border border-[var(--color-void-800)] px-5 py-4 transition-colors hover:border-[var(--color-void-600)]"
                    >
                      <p className="font-serif-cn text-sm leading-relaxed text-[var(--color-void-100)]">
                        {q.title}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-[var(--color-void-400)]">
                        {q.subtitle}
                      </p>
                    </Link>
                  ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        /* 桌面端：力导向图谱 */
        <>
          <div className="flex-1">
            <Suspense fallback={null}>
              <KnowledgeGraph />
            </Suspense>
          </div>

          {/* 图例 */}
          <div className="z-20 flex items-center gap-6 px-6 py-4 text-[10px] tracking-widest text-[var(--color-void-400)] md:px-12">
            <span className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#6ee7f0]" />
              宇宙
            </span>
            <span className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#a78bfa]" />
              生命
            </span>
            <span className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#818cf8]" />
              心灵
            </span>
            <span className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#fb7185]" />
              意义
            </span>
          </div>
        </>
      )}
    </main>
  );
}
