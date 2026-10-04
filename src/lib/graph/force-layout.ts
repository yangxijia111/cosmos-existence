/**
 * 2D 力导向布局引擎（自研，无重依赖）
 * 节点含 x/y/vx/vy，边牵引 + 节点斥力 + 中心引力
 */
import { GraphNode, GraphEdge } from "@/data/types";

export interface ForceConfig {
  /** 斥力系数 */
  repulsion: number;
  /** 弹簧长度 */
  springLength: number;
  /** 弹簧强度 */
  springStrength: number;
  /** 向中心引力 */
  centerStrength: number;
  /** 速度衰减 */
  damping: number;
}

const DEFAULT_CONFIG: ForceConfig = {
  repulsion: 4000,
  springLength: 120,
  springStrength: 0.005,
  centerStrength: 0.0005,
  damping: 0.9,
};

function applyForces(
  nodes: GraphNode[],
  edges: GraphEdge[],
  cfg: ForceConfig
) {
  // 斥力（每对节点）
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i];
      const b = nodes[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const dist2 = dx * dx + dy * dy || 1;
      const dist = Math.sqrt(dist2);
      const force = cfg.repulsion / dist2;
      const fx = (dx / dist) * force;
      const fy = (dy / dist) * force;
      a.vx += fx;
      a.vy += fy;
      b.vx -= fx;
      b.vy -= fy;
    }
  }

  // 边弹簧力
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));
  for (const edge of edges) {
    const a = nodeMap.get(edge.source);
    const b = nodeMap.get(edge.target);
    if (!a || !b) continue;
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
    const force = (dist - cfg.springLength) * cfg.springStrength;
    const fx = (dx / dist) * force;
    const fy = (dy / dist) * force;
    a.vx -= fx;
    a.vy -= fy;
    b.vx += fx;
    b.vy += fy;
  }

  // 中心引力
  for (const n of nodes) {
    n.vx -= n.x * cfg.centerStrength;
    n.vy -= n.y * cfg.centerStrength;
  }

  // 更新位置
  for (const n of nodes) {
    n.vx *= cfg.damping;
    n.vy *= cfg.damping;
    n.x += n.vx;
    n.y += n.vy;
  }
}

/**
 * 执行多步力导向迭代
 * @param steps 迭代次数
 */
export function simulate(
  nodes: GraphNode[],
  edges: GraphEdge[],
  steps = 300,
  cfg: Partial<ForceConfig> = {}
): GraphNode[] {
  const config = { ...DEFAULT_CONFIG, ...cfg };
  for (let i = 0; i < steps; i++) {
    applyForces(nodes, edges, config);
  }
  return nodes;
}
