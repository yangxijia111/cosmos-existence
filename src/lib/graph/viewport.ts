/**
 * 图谱视图变换（纯函数，无 React / DOM 依赖）
 * 世界坐标（力导向布局输出，量级约 ±600）↔ 屏幕坐标的换算，
 * 以及画布平移（pan）的数学。KnowledgeGraph 与 MiniGraph 共用。
 */

export interface Viewport {
  /** 滚轮缩放系数（0.5 ~ 3） */
  zoom: number;
  /** 视点中心（世界坐标），画布平移时移动 */
  cx: number;
  cy: number;
  /** 基准缩放：1 = 世界满 600 单位映射到画布短边 */
  scale: number;
}

export interface Size {
  width: number;
  height: number;
}

/** 世界单位 → 屏幕像素的比例因子（按画布短边归一，保证各方向等比） */
export function viewScale(size: Size, view: Viewport): number {
  return (view.scale * view.zoom * Math.min(size.width, size.height)) / 600;
}

/** 世界坐标 → 屏幕坐标 */
export function worldToScreen(
  x: number,
  y: number,
  size: Size,
  view: Viewport
): { x: number; y: number } {
  const s = viewScale(size, view);
  return {
    x: size.width / 2 + (x - view.cx) * s,
    y: size.height / 2 + (y - view.cy) * s,
  };
}

/** 屏幕坐标 → 世界坐标（节点拖拽落点计算用） */
export function screenToWorld(
  sx: number,
  sy: number,
  size: Size,
  view: Viewport
): { x: number; y: number } {
  const s = viewScale(size, view);
  return {
    x: view.cx + (sx - size.width / 2) / s,
    y: view.cy + (sy - size.height / 2) / s,
  };
}

/**
 * 画布平移：把一次屏幕拖拽增量应用为新视点
 * 内容跟随指针——屏幕右移 dx，视点左移 dx/s，节点看起来跟着指针走
 */
export function pannedView(
  view: Viewport,
  dxScreen: number,
  dyScreen: number,
  size: Size
): Viewport {
  const s = viewScale(size, view);
  return { ...view, cx: view.cx - dxScreen / s, cy: view.cy - dyScreen / s };
}
