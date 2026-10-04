import { test } from "node:test";
import assert from "node:assert/strict";
import { GraphNode, GraphEdge } from "@/data/types";
import { simulate } from "./force-layout";

function makeNode(id: string, x: number, y: number): GraphNode {
  return { id: id as GraphNode["id"], title: id, epoch: "mind", x, y, vx: 0, vy: 0 };
}

test("steps = 0 时坐标不变", () => {
  const nodes = [makeNode("a", 0, 0), makeNode("b", 400, 0)];
  const edges: GraphEdge[] = [];
  const out = simulate(nodes, edges, 0);
  assert.equal(out[0].x, 0);
  assert.equal(out[1].x, 400);
});

test("弹簧力把有边相连的远距离节点拉近", () => {
  const nodes = [makeNode("a", 0, 0), makeNode("b", 800, 0)];
  const edges: GraphEdge[] = [
    { source: "a" as GraphEdge["source"], target: "b" as GraphEdge["target"] },
  ];
  const [a, b] = simulate(nodes, edges, 200);
  assert.ok(b.x - a.x < 800, "边两端距离应收缩");
  assert.ok(b.x - a.x > 0, "不应越过彼此");
});

test("斥力把无边的重叠节点推开，模拟稳定不发散", () => {
  const nodes = [makeNode("a", 0, 0), makeNode("b", 2, 0)];
  const out = simulate(nodes, [], 300);
  for (const n of out) {
    assert.ok(Number.isFinite(n.x) && Number.isFinite(n.y));
    assert.ok(Math.abs(n.x) < 1e5 && Math.abs(n.y) < 1e5);
  }
  assert.ok(out[1].x - out[0].x > 2, "斥力应保持节点不重叠");
});

test("config 覆盖生效：斥力与中心引力都归零且无边时坐标完全不变", () => {
  const nodes = [makeNode("a", 0, 0), makeNode("b", 1000, 0)];
  const edges: GraphEdge[] = [];
  const out = simulate(nodes, edges, 100, { repulsion: 0, centerStrength: 0 });
  assert.equal(out[0].x, 0);
  assert.equal(out[1].x, 1000);
});
