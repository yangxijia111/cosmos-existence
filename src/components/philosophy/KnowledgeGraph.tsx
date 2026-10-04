"use client";

import { useEffect, useCallback, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { buildGraph } from "@/data/questions";
import { simulate } from "@/lib/graph/force-layout";
import { pannedView, screenToWorld, worldToScreen } from "@/lib/graph/viewport";
import { QuestionEpoch } from "@/data/types";

const epochColors: Record<QuestionEpoch, string> = {
  cosmos: "#6ee7f0",
  life: "#a78bfa",
  mind: "#818cf8",
  meaning: "#fb7185",
};

const epochLabels: Record<QuestionEpoch, string> = {
  cosmos: "宇宙",
  life: "生命",
  mind: "心灵",
  meaning: "意义",
};

interface Size {
  width: number;
  height: number;
}

/**
 * KnowledgeGraph — 2D 力导向知识图谱
 * Canvas 渲染节点与连线 + DOM 绝对定位标签（可选中、可访问）
 */
export function KnowledgeGraph() {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { nodes, edges } = useMemo(() => {
    const g = buildGraph();
    return { nodes: simulate(g.nodes, g.edges, 300), edges: g.edges };
  }, []);

  // 视图变换：中心点（可拖动平移）+ 固定 scale
  const [view, setView] = useState(() => {
    const xs = nodes.map((n) => n.x);
    const ys = nodes.map((n) => n.y);
    return {
      scale: 1,
      cx: (Math.min(...xs) + Math.max(...xs)) / 2,
      cy: (Math.min(...ys) + Math.max(...ys)) / 2,
    };
  });

  const [hovered, setHovered] = useState<string | null>(null);
  const [dragging, setDragging] = useState<string | null>(null);
  const [positions, setPositions] = useState<Map<string, { x: number; y: number }>>(
    () => new Map(nodes.map((n) => [n.id, { x: n.x, y: n.y }]))
  );
  /** 画布缩放系数（滚轮缩放，0.5 ~ 3） */
  const [zoom, setZoom] = useState(1);

  // 滚轮缩放画布
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      setZoom((z) => Math.min(3, Math.max(0.5, z * (e.deltaY < 0 ? 1.1 : 0.9))));
    };
    container.addEventListener("wheel", onWheel, { passive: false });
    return () => container.removeEventListener("wheel", onWheel);
  }, []);

  // 容器尺寸：通过 ResizeObserver 订阅（外部系统），合法 setState
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const ro = new ResizeObserver((entries) => {
      const r = entries[0].contentRect;
      setSize({ width: r.width, height: r.height });
    });
    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  // 世界坐标 → 屏幕坐标（含缩放）
  const toScreen = useCallback(
    (x: number, y: number) =>
      worldToScreen(x, y, size, { scale: view.scale, zoom, cx: view.cx, cy: view.cy }),
    [view, size, zoom]
  );

  // Canvas 绘制循环
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || size.width === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size.width * dpr;
    canvas.height = size.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const draw = () => {
      ctx.clearRect(0, 0, size.width, size.height);

      // 边
      const nodeMap = new Map(nodes.map((n) => [n.id, n]));
      for (const e of edges) {
        const a = nodeMap.get(e.source);
        const b = nodeMap.get(e.target);
        if (!a || !b) continue;
        const pa = positions.get(a.id) ?? a;
        const pb = positions.get(b.id) ?? b;
        const sa = toScreen(pa.x, pa.y);
        const sb = toScreen(pb.x, pb.y);

        const isActive = hovered === a.id || hovered === b.id;
        ctx.beginPath();
        ctx.moveTo(sa.x, sa.y);
        ctx.lineTo(sb.x, sb.y);
        ctx.strokeStyle = isActive
          ? epochColors[a.epoch]
          : "rgba(138, 138, 184, 0.15)";
        ctx.lineWidth = isActive ? 1.5 : 1;
        ctx.stroke();
      }

      // 节点
      for (const n of nodes) {
        const p = positions.get(n.id) ?? n;
        const s = toScreen(p.x, p.y);
        const color = epochColors[n.epoch];
        const isHovered = hovered === n.id;
        const r = isHovered ? 6 : 4;

        // 光晕
        const gradient = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, r * 4);
        gradient.addColorStop(0, `${color}60`);
        gradient.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(s.x, s.y, r * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // 核
        ctx.beginPath();
        ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      }
    };

    let raf: number;
    const animate = () => {
      draw();
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [nodes, edges, positions, hovered, toScreen, size]);

  // 拖拽节点
  useEffect(() => {
    if (!dragging) return;
    const container = containerRef.current;
    if (!container) return;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const world = screenToWorld(
        e.clientX - rect.left,
        e.clientY - rect.top,
        { width: rect.width, height: rect.height },
        { scale: view.scale, zoom, cx: view.cx, cy: view.cy }
      );
      setPositions((prev) => {
        const next = new Map(prev);
        next.set(dragging, world);
        return next;
      });
    };
    const handlePointerUp = () => setDragging(null);

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [dragging, view, zoom]);

  // 画布平移：在空白处（canvas）按下拖动，视点跟随移动
  const [panning, setPanning] = useState(false);
  const panOriginRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!panning) return;
    const container = containerRef.current;
    if (!container) return;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      // 拖拽方向 = 内容跟随：屏幕右移 → 视点左移
      setView((v) =>
        pannedView(
          { scale: v.scale, zoom, cx: v.cx, cy: v.cy },
          e.clientX - panOriginRef.current.x,
          e.clientY - panOriginRef.current.y,
          { width: rect.width, height: rect.height }
        )
      );
    };
    const handlePointerUp = () => setPanning(false);

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [panning, view, zoom]);

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden"
      role="application"
      aria-label="哲学问题知识图谱"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{ cursor: panning ? "grabbing" : "grab" }}
        onPointerDown={(e) => {
          panOriginRef.current = { x: e.clientX, y: e.clientY };
          setPanning(true);
        }}
      />

      {/* DOM 标签层 */}
      {size.width > 0 &&
        nodes.map((n) => {
          const p = positions.get(n.id) ?? n;
          const s = toScreen(p.x, p.y);
          const color = epochColors[n.epoch];
          const isHovered = hovered === n.id;

          return (
            <div
              key={n.id}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer select-none"
              style={{ left: s.x, top: s.y }}
              onMouseEnter={() => setHovered(n.id)}
              onMouseLeave={() => setHovered(null)}
              onPointerDown={() => setDragging(n.id)}
              onClick={() => {
                if (!dragging) router.push(`/question/${n.id}`);
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") router.push(`/question/${n.id}`);
              }}
              aria-label={`问题：${n.title}`}
            >
              <div
                className={`mt-3 whitespace-nowrap text-center transition-opacity duration-300 ${
                  hovered && !isHovered ? "opacity-30" : "opacity-100"
                }`}
              >
                <div className="text-[10px] tracking-widest" style={{ color }}>
                  {epochLabels[n.epoch]}
                </div>
                <div className="mt-0.5 max-w-[200px] font-serif-cn text-xs leading-relaxed text-[var(--color-void-100)] md:text-sm">
                  {n.title}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
