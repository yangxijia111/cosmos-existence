"use client";

import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cosmicEras } from "@/data/cosmic-eras";
import { useTimelineStore } from "@/stores/useTimelineStore";
import { eraProgressAt } from "@/lib/cosmology";

/**
 * NarrativeOverlay — 旁白字幕覆盖层
 * 随纪元进度逐句淡入淡出；DOM 覆盖层保证可访问性
 */
export function NarrativeOverlay() {
  const t = useTimelineStore((s) => s.t);
  const { index, u } = eraProgressAt(t);
  const era = cosmicEras[index];

  // 每纪元分成其 narrative 段数，随 u 切换（渲染期直接计算，无需 effect）
  const total = era.narrative.length;

  // 时间权重：除末句外均等，末句权重加倍（结尾停留更久，避免匆匆切走）
  let sentenceIdx = 0;
  if (total > 0) {
    const totalWeight = (total - 1) + 2;
    let acc = 0;
    sentenceIdx = total - 1;
    for (let i = 0; i < total; i++) {
      acc += (i === total - 1 ? 2 : 1) / totalWeight;
      if (u < acc) {
        sentenceIdx = i;
        break;
      }
    }
  }
  const sentence = total > 0 ? era.narrative[sentenceIdx] : "";

  const eraKey = useMemo(() => `${era.id}-${sentenceIdx}`, [era.id, sentenceIdx]);

  return (
    <div className="pointer-events-none absolute bottom-[18vh] left-0 right-0 z-20 flex flex-col items-center px-6">
      {/* 科学标签 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`label-${era.id}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-4 flex items-baseline gap-4"
        >
          <span className="font-serif-cn text-xl tracking-[0.4em] text-[var(--color-void-100)]">
            {era.title}
          </span>
          <span className="font-mono-num text-xs tracking-widest text-[var(--color-void-400)]">
            {era.scientificLabel} · {era.cosmologicalTime.display}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* 旁白句 */}
      <AnimatePresence mode="wait">
        <motion.p
          key={eraKey}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="text-glow max-w-2xl text-center font-serif-cn text-lg leading-loose tracking-widest text-[var(--color-void-50)] md:text-xl"
        >
          {sentence}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
