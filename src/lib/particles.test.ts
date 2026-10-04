import { test } from "node:test";
import assert from "node:assert/strict";
import { createRng, generateCloud, hashSeed } from "./particles";

test("createRng 同 seed 产生相同序列", () => {
  const a = createRng(12345);
  const b = createRng(12345);
  for (let i = 0; i < 50; i++) {
    assert.equal(a(), b());
  }
});

test("createRng 输出落在 [0,1)", () => {
  const rng = createRng(7);
  for (let i = 0; i < 1000; i++) {
    const v = rng();
    assert.ok(v >= 0 && v < 1);
  }
});

test("generateCloud 可复现：同 count/seed 两次生成逐位一致", () => {
  const a = generateCloud(100, 42);
  const b = generateCloud(100, 42);
  assert.deepEqual(a.positions, b.positions);
  assert.deepEqual(a.sizes, b.sizes);
  assert.deepEqual(a.seeds, b.seeds);
});

test("generateCloud 不同 seed 产生不同分布", () => {
  const a = generateCloud(100, 1);
  const b = generateCloud(100, 2);
  assert.notDeepEqual(a.positions, b.positions);
});

test("generateCloud 数组长度与数值合法性", () => {
  const cloud = generateCloud(64, 9);
  assert.equal(cloud.count, 64);
  assert.equal(cloud.positions.length, 64 * 3);
  assert.equal(cloud.sizes.length, 64);
  for (let i = 0; i < cloud.positions.length; i++) {
    assert.ok(Number.isFinite(cloud.positions[i]));
    // 均匀球内分布：r = cbrt(u) ≤ 1，各分量 ∈ [-1,1]
    assert.ok(Math.abs(cloud.positions[i]) <= 1);
  }
});

test("hashSeed 稳定且不同字符串区分", () => {
  assert.equal(hashSeed("singularity"), hashSeed("singularity"));
  assert.notEqual(hashSeed("singularity"), hashSeed("inflation"));
  assert.equal(hashSeed(""), 2166136261);
});
