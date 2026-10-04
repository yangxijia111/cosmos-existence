"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { questionById } from "@/data/questions";
import { cosmicEras } from "@/data/cosmic-eras";

/**
 * QuestionReveal — 宇宙演化结束后淡入第一个哲学问题
 * 引导进入 Philosophy Explorer
 */
export function QuestionReveal() {
  // earth 纪元的 philosophyHook
  const earth = cosmicEras.find((e) => e.id === "earth");
  const hookId = earth?.philosophyHook ?? "why-existence";
  const question = questionById[hookId];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2.5, ease: "easeOut" }}
      className="relative z-20 flex min-h-screen flex-col items-center justify-center px-6 text-center"
    >
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1.5 }}
        className="mb-8 font-mono-num text-xs tracking-[0.3em] text-[var(--color-void-400)]"
      >
        演化的终点 · 思考的起点
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 2 }}
        className="font-serif-cn text-2xl leading-relaxed tracking-wider text-[var(--color-void-50)] md:text-4xl md:leading-relaxed"
      >
        {question.title}
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1.5 }}
        className="mt-16"
      >
        <Link
          href="/explore"
          className="group inline-flex items-center gap-3 border border-[var(--color-void-700)] px-8 py-3 text-sm tracking-[0.3em] text-[var(--color-void-200)] transition-all duration-500 hover:border-[var(--color-cosmic-indigo)] hover:text-[var(--color-void-50)]"
        >
          进入探索
          <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
        </Link>
      </motion.div>
    </motion.div>
  );
}
