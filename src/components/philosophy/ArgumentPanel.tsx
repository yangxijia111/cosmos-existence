"use client";

import { useState } from "react";
import { Argument } from "@/data/types";

type Tab = "arguments" | "objections";

export function ArgumentPanel({
  arguments: args,
  objections,
}: {
  arguments: Argument[];
  objections: Argument[];
}) {
  const [tab, setTab] = useState<Tab>("arguments");
  const data = tab === "arguments" ? args : objections;

  return (
    <div>
      {/* 切换标签 */}
      <div className="flex gap-6 border-b border-[var(--color-void-700)]">
        {(["arguments", "objections"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`pb-2 text-xs tracking-widest transition-colors focus-visible:outline-none ${
              tab === t
                ? "border-b border-[var(--color-cosmic-indigo)] text-[var(--color-void-50)]"
                : "text-[var(--color-void-400)] hover:text-[var(--color-void-200)]"
            }`}
          >
            {t === "arguments" ? "论证" : "反驳"}
          </button>
        ))}
      </div>

      {/* 列表 */}
      <div className="mt-4 space-y-4">
        {data.length === 0 ? (
          <p className="text-sm text-[var(--color-void-500)]">（暂无数据）</p>
        ) : (
          data.map((a) => (
            <div key={a.id} className="rounded-sm bg-[var(--color-void-950)] p-4">
              <h4 className="text-sm tracking-wider text-[var(--color-void-100)]">{a.label}</h4>
              <ol className="mt-3 list-decimal space-y-1 pl-4 text-sm leading-relaxed text-[var(--color-void-300)]">
                {a.premises.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ol>
              <p className="mt-3 text-sm font-medium tracking-wider text-[var(--color-void-100)]">
                ∴ {a.conclusion}
              </p>
              {a.source && (
                <p className="mt-2 text-xs text-[var(--color-void-500)]">{a.source}</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
