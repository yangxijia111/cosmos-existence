import { test } from "node:test";
import assert from "node:assert/strict";
import { viewScale, worldToScreen, screenToWorld, pannedView } from "./viewport";

const SIZE = { width: 1200, height: 800 };
const VIEW = { zoom: 1, cx: 0, cy: 0, scale: 1 };

test("viewScale 按短边归一，zoom 线性缩放", () => {
  assert.equal(viewScale(SIZE, VIEW), 800 / 600);
  assert.equal(viewScale(SIZE, { ...VIEW, zoom: 2 }), (800 * 2) / 600);
  assert.equal(viewScale(SIZE, { ...VIEW, scale: 0.75 }), (800 * 0.75) / 600);
});

test("worldToScreen：视点中心落在画布中心", () => {
  const s = worldToScreen(VIEW.cx, VIEW.cy, SIZE, VIEW);
  assert.equal(s.x, 600);
  assert.equal(s.y, 400);
});

test("worldToScreen 与 screenToWorld 互为逆运算", () => {
  const p = worldToScreen(120, -45, SIZE, { ...VIEW, zoom: 1.7, cx: 30, cy: -20 });
  const back = screenToWorld(p.x, p.y, SIZE, { ...VIEW, zoom: 1.7, cx: 30, cy: -20 });
  assert.ok(Math.abs(back.x - 120) < 1e-9);
  assert.ok(Math.abs(back.y - -45) < 1e-9);
});

test("pannedView：拖拽后同一世界点的屏幕位置跟随指针移动", () => {
  const before = worldToScreen(100, 50, SIZE, VIEW);
  const panned = pannedView(VIEW, 80, -40, SIZE);
  const after = worldToScreen(100, 50, SIZE, panned);
  // 屏幕右移 80px、上移 40px → 内容跟随
  assert.ok(Math.abs(after.x - before.x - 80) < 1e-9);
  assert.ok(Math.abs(after.y - before.y + 40) < 1e-9);
});

test("pannedView：零增量视点不变，且不修改原对象", () => {
  const same = pannedView(VIEW, 0, 0, SIZE);
  assert.deepEqual(same, VIEW);
  assert.notEqual(same, VIEW, "应返回新对象（不可变更新）");
});

test("pannedView：zoom 越大同样屏幕拖拽移动的世界距离越小", () => {
  const near = pannedView({ ...VIEW, zoom: 3 }, 100, 0, SIZE);
  const far = pannedView({ ...VIEW, zoom: 0.5 }, 100, 0, SIZE);
  assert.ok(Math.abs(near.cx) < Math.abs(far.cx));
});
