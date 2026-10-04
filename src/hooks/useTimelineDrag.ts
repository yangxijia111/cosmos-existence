/**
 * 时间轴拖动逻辑（指针 + 触控）
 * 返回 ref 与拖动状态，输出归一化位置 progress ∈ [0,1]
 */
import { useRef, useState, useCallback, useEffect } from "react";

interface TimelineDragResult {
  /** 绑定到可拖动元素的 ref */
  ref: React.RefObject<HTMLDivElement | null>;
  /** 当前归一化进度 */
  progress: number;
  /** 是否正在拖动 */
  dragging: boolean;
  /** 以编程方式设置进度 */
  setProgress: (p: number) => void;
}

export function useTimelineDrag(
  initialProgress = 0
): TimelineDragResult {
  const ref = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(initialProgress);
  const [dragging, setDragging] = useState(false);

  const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

  const updateFromEvent = useCallback(
    (clientX: number) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = clientX - rect.left;
      const p = clamp01(x / rect.width);
      setProgress(p);
    },
    []
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onPointerDown = (e: PointerEvent) => {
      e.preventDefault();
      setDragging(true);
      el.setPointerCapture(e.pointerId);
      updateFromEvent(e.clientX);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      updateFromEvent(e.clientX);
    };

    const onPointerUp = () => {
      setDragging(false);
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerUp);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerUp);
    };
  }, [dragging, updateFromEvent]);

  return { ref, progress, dragging, setProgress };
}
