import { PhilosophyQuestion, QuestionId, GraphNode, GraphEdge } from "../types";
import { whyExistence } from "./why-existence";
import { natureOfTime } from "./nature-of-time";
import { fineTuning } from "./fine-tuning";
import { originOfLife } from "./origin-of-life";
import { hardProblem } from "./hard-problem";
import { freeWill } from "./free-will";
import { canWeKnow } from "./can-we-know";
import { universeKnowingSelf } from "./universe-knowing-self";
import { meaningOfLife } from "./meaning-of-life";
import { facingDeath } from "./facing-death";

/** 全部哲学问题，按叙事顺序排列 */
export const questions: PhilosophyQuestion[] = [
  whyExistence,
  natureOfTime,
  fineTuning,
  originOfLife,
  hardProblem,
  freeWill,
  canWeKnow,
  universeKnowingSelf,
  meaningOfLife,
  facingDeath,
];

/** id → 问题 索引 */
export const questionById: Record<QuestionId, PhilosophyQuestion> = Object.fromEntries(
  questions.map((q) => [q.id, q])
) as Record<QuestionId, PhilosophyQuestion>;

/** 根据问题数据构建图谱节点与边 */
export function buildGraph(): { nodes: GraphNode[]; edges: GraphEdge[] } {
  const nodes: GraphNode[] = questions.map((q, i) => {
    // 初始位置：按 epoch 分簇环形分布
    const epochIndex = ["cosmos", "life", "mind", "meaning"].indexOf(q.epoch);
    const angle = (epochIndex / 4) * Math.PI * 2 + i * 0.35;
    const radius = 120 + epochIndex * 60;
    return {
      id: q.id,
      title: q.title,
      epoch: q.epoch,
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      vx: 0,
      vy: 0,
    };
  });

  const edges: GraphEdge[] = [];
  const seen = new Set<string>();
  for (const q of questions) {
    for (const rid of q.relatedQuestionIds) {
      const key = [q.id, rid].sort().join("::");
      if (seen.has(key)) continue;
      seen.add(key);
      edges.push({ source: q.id, target: rid });
    }
  }

  return { nodes, edges };
}
