"use client";

import { useMemo } from "react";
import { buildGraph } from "@/data/questions";
import { simulate } from "@/lib/graph/force-layout";
import { worldToScreen } from "@/lib/graph/viewport";

const epochColors: Record<string, string> = {
  cosmos: "#6ee7f0",
  life: "#a78bfa",
  mind: "#818cf8",
  meaning: "#fb7185",
};

/**
 * MiniGraph — 移动端迷你图谱预览
 * 轻量 Canvas 渲染节点与连线，无交互标签，高 200px
 */
export function MiniGraph() {
  const { nodes, edges } = useMemo(() => {
    const g = buildGraph();
    return { nodes: simulate(g.nodes, g.edges, 200), edges: g.edges };
  }, []);

  const view = useMemo(() => {
    const xs = nodes.map((n) => n.x);
    const ys = nodes.map((n) => n.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    return { cx: (minX + maxX) / 2, cy: (minY + maxY) / 2 };
  }, [nodes]);

  return (
    <canvas
      className="h-[200px] w-full"
      ref={(canvas) => {
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const rect = canvas.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        // 基准比例取 600 的 0.75 倍（= 原 450），让移动端预览比桌面图谱略紧凑
        const toScreen = (x: number, y: number) =>
          worldToScreen(x, y, { width: rect.width, height: rect.height }, {
            zoom: 1,
            scale: 0.75,
            cx: view.cx,
            cy: view.cy,
          });

        // 边
        const nodeMap = new Map(nodes.map((n) => [n.id, n]));
        for (const e of edges) {
          const a = nodeMap.get(e.source);
          const b = nodeMap.get(e.target);
          if (!a || !b) continue;
          const sa = toScreen(a.x, a.y);
          const sb = toScreen(b.x, b.y);
          ctx.beginPath();
          ctx.moveTo(sa.x, sa.y);
          ctx.lineTo(sb.x, sb.y);
          ctx.strokeStyle = "rgba(138,138,184,0.2)";
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }

        // 节点
        for (const n of nodes) {
          const s = toScreen(n.x, n.y);
          ctx.beginPath();
          ctx.arc(s.x, s.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = epochColors[n.epoch] ?? "#8a8ab8";
          ctx.fill();
        }
      }}
    />
  );
}
