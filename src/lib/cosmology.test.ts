import { test } from "node:test";
import assert from "node:assert/strict";
import { cosmicEras } from "@/data/cosmic-eras";
import {
  timeAt,
  eraIndexAt,
  eraProgressAt,
  scaleFactorAt,
  cameraAt,
  eraTicks,
} from "./cosmology";

test("timeAt 端点等于首末纪元的宇宙学时间（对数往返有浮点误差，按相对误差断言）", () => {
  const first = cosmicEras[0].cosmologicalTime.seconds;
  const last = cosmicEras[cosmicEras.length - 1].cosmologicalTime.seconds;
  assert.ok(Math.abs(timeAt(0) - first) / first < 1e-9);
  assert.ok(Math.abs(timeAt(1) - last) / last < 1e-9);
});

test("timeAt 为对数插值（中点应为几何中点）", () => {
  const mid = timeAt(0.5);
  const expected = Math.sqrt(
    cosmicEras[0].cosmologicalTime.seconds *
      cosmicEras[cosmicEras.length - 1].cosmologicalTime.seconds
  );
  assert.ok(Math.abs(mid - expected) / expected < 1e-9);
});

test("eraIndexAt 端点与各纪元区间中点", () => {
  assert.equal(eraIndexAt(0), 0);
  assert.equal(eraIndexAt(1), cosmicEras.length - 1);
  const ticks = eraTicks().map((x) => x.t);
  // 普通纪元：相邻刻度中点应归属该纪元（刻度是区间边界，归后一个纪元）
  for (let i = 0; i < ticks.length - 2; i++) {
    const mid = (ticks[i] + ticks[i + 1]) / 2;
    assert.equal(eraIndexAt(mid), i, `中点 t=${mid} 应归属纪元 ${i}`);
  }
  // 末纪元：拥有 (前一刻度, 1] 区间（曾因零宽而导致 u 恒 0）
  const lastMid = (ticks[ticks.length - 2] + 1) / 2;
  assert.equal(eraIndexAt(lastMid), cosmicEras.length - 1);
});

test("eraProgressAt 终点 u 归一并 clamp 在 [0,1]", () => {
  assert.deepEqual(eraProgressAt(0), { index: 0, u: 0 });
  const end = eraProgressAt(1);
  assert.equal(end.index, cosmicEras.length - 1);
  assert.equal(end.u, 1);
  for (let t = 0; t <= 1; t += 0.01) {
    const { u } = eraProgressAt(t);
    assert.ok(u >= 0 && u <= 1);
  }
});

test("scaleFactorAt 端点等于纪元 scaleRange，且全程单调不衰减", () => {
  assert.equal(scaleFactorAt(0), cosmicEras[0].visual.scaleRange[0]);
  assert.equal(scaleFactorAt(1), cosmicEras[cosmicEras.length - 1].visual.scaleRange[1]);
  let prev = scaleFactorAt(0);
  for (let t = 0.01; t <= 1; t += 0.01) {
    const a = scaleFactorAt(t);
    assert.ok(a >= prev, `尺度因子应单调不衰减: t=${t}`);
    prev = a;
  }
});

test("cameraAt 无 fov 配置的纪元回退 60，端点半径正确", () => {
  const quarksIdx = cosmicEras.findIndex((e) => e.id === "quarks");
  const tick = eraTicks()[quarksIdx];
  assert.equal(cameraAt(tick.t).fov, 60);
  assert.equal(cameraAt(0).radius, cosmicEras[0].visual.camera.radius[0]);
  assert.equal(cameraAt(1).radius, cosmicEras[cosmicEras.length - 1].visual.camera.radius[1]);
});

test("eraTicks 单调递增且闭合 [0,1]", () => {
  const ticks = eraTicks();
  assert.equal(ticks.length, cosmicEras.length);
  assert.ok(Math.abs(ticks[0].t) < 1e-9);
  assert.ok(Math.abs(ticks[ticks.length - 1].t - 1) < 1e-9);
  for (let i = 1; i < ticks.length; i++) {
    assert.ok(ticks[i].t > ticks[i - 1].t);
  }
});
