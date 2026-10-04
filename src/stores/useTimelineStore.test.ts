import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { useTimelineStore, PLAYBACK_RATES, DEFAULT_DURATION } from "./useTimelineStore";

/** 每个用例前重置为初始状态（store 为模块级单例） */
beforeEach(() => {
  useTimelineStore.setState({ t: 0, playing: false, rate: 1 });
});

test("PLAYBACK_RATES 档位与产品约定一致", () => {
  assert.deepEqual([...PLAYBACK_RATES], [1, 1.25, 1.5, 2]);
  assert.equal(DEFAULT_DURATION, 90);
});

test("cycleRate 按 1 → 1.25 → 1.5 → 2 → 1 循环", () => {
  const { cycleRate } = useTimelineStore.getState();
  const seen: number[] = [];
  for (let i = 0; i < 5; i++) {
    cycleRate();
    seen.push(useTimelineStore.getState().rate);
  }
  assert.deepEqual(seen, [1.25, 1.5, 2, 1, 1.25]);
});

test("tick 未播放时不推进", () => {
  const { tick } = useTimelineStore.getState();
  tick(1);
  assert.equal(useTimelineStore.getState().t, 0);
});

test("tick 按 rate 倍率推进：2× 的推进量是 1× 的两倍", () => {
  const base = 1 / DEFAULT_DURATION;
  useTimelineStore.setState({ playing: true, rate: 1 });
  useTimelineStore.getState().tick(1);
  assert.ok(Math.abs(useTimelineStore.getState().t - base) < 1e-12);

  useTimelineStore.setState({ t: 0, rate: 2 });
  useTimelineStore.getState().tick(1);
  assert.ok(Math.abs(useTimelineStore.getState().t - base * 2) < 1e-12);
});

test("tick 到达终点自动停止（t=1 且 playing=false）", () => {
  useTimelineStore.setState({ playing: true, t: 0.999, rate: 2 });
  useTimelineStore.getState().tick(1);
  const s = useTimelineStore.getState();
  assert.equal(s.t, 1);
  assert.equal(s.playing, false);
});
