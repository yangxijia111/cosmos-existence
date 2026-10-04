"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Position } from "@/data/types";
import { ArgumentPanel } from "./ArgumentPanel";

export function PositionCard({ position }: { position: Position }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      layout
      className="overflow-hidden border border-[var(--color-void-800)] bg-[var(--color-void-900)]"
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-[var(--color-void-800)] focus-visible:outline-none"
        aria-expanded={open}
      >
        <div>
          <h3 className="font-serif-cn text-lg tracking-wider text-[var(--color-void-50)]">
            {position.name}
          </h3>
          <p className="mt-1 text-xs tracking-wider text-[var(--color-void-400)]">
            {position.tradition}
          </p>
        </div>
        <span className="text-xs text-[var(--color-void-400)] transition-transform duration-300">
          {open ? "−" : "+"}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-[var(--color-void-800)] px-6 py-6">
              <p className="leading-relaxed tracking-wider text-[var(--color-void-200)]">
                {position.summary}
              </p>

              {/* 关键人物 */}
              <div className="mt-5 flex flex-wrap gap-3">
                {position.keyFigures.map((f) => (
                  <span
                    key={f.name}
                    className="inline-flex items-center gap-2 rounded-sm bg-[var(--color-void-800)] px-3 py-1 text-xs text-[var(--color-void-200)]"
                  >
                    {f.name}
                    <span className="text-[var(--color-void-400)]">{f.period}</span>
                  </span>
                ))}
              </div>

              {/* 论证 ⇄ 反驳 */}
              <div className="mt-8">
                <ArgumentPanel arguments={position.arguments} objections={position.objections} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
