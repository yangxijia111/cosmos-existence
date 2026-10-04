/**
 * 数据引用完整性校验
 * 在 verify 流程中运行，任何错误阻断构建
 */
import { questions } from "./questions";
import { QuestionId, CosmicEraId } from "./types";
import { cosmicEras } from "./cosmic-eras";

export interface ValidationError {
  type: string;
  message: string;
}

export function validateQuestions(): ValidationError[] {
  const errors: ValidationError[] = [];
  const ids = new Set<QuestionId>();
  const orders = new Set<number>();

  for (const q of questions) {
    // id 唯一
    if (ids.has(q.id)) {
      errors.push({ type: "duplicate-id", message: `重复 id: ${q.id}` });
    }
    ids.add(q.id);

    // order 连续不重复
    if (orders.has(q.order)) {
      errors.push({ type: "duplicate-order", message: `重复 order: ${q.order} (${q.id})` });
    }
    orders.add(q.order);

    // 每个问题至少 2 个立场
    if (q.positions.length < 2) {
      errors.push({ type: "insufficient-positions", message: `${q.id} 立场数不足（${q.positions.length} < 2）` });
    }

    // 每个立场至少 1 论证 + 1 反驳
    for (const p of q.positions) {
      if (p.arguments.length < 1) {
        errors.push({ type: "insufficient-arguments", message: `${q.id}/${p.id} 论证不足` });
      }
      if (p.objections.length < 1) {
        errors.push({ type: "insufficient-objections", message: `${q.id}/${p.id} 反驳不足` });
      }
      // 立场 id 唯一（问题内）
      const posIds = q.positions.map((x) => x.id);
      if (new Set(posIds).size !== posIds.length) {
        errors.push({ type: "duplicate-position-id", message: `${q.id} 立场 id 重复` });
      }
    }
  }

  // order 连续性
  const expectedOrders = new Set(questions.map((_, i) => i + 1));
  for (const o of orders) {
    if (!expectedOrders.has(o)) {
      errors.push({ type: "order-gap", message: `order 不连续: ${o}` });
    }
  }

  // 校验关联引用
  for (const q of questions) {
    for (const rid of q.relatedQuestionIds) {
      if (!ids.has(rid)) {
        errors.push({ type: "missing-ref", message: `${q.id} 引用不存在的问题 ${rid}` });
      }
    }
  }

  // 校验交叉引用
  const eraIds = new Set<CosmicEraId>(cosmicEras.map((e) => e.id));
  for (const q of questions) {
    if (q.entryFromEra && !eraIds.has(q.entryFromEra)) {
      errors.push({ type: "bad-era", message: `${q.id} entryFromEra 无效: ${q.entryFromEra}` });
    }
  }
  for (const e of cosmicEras) {
    if (e.philosophyHook && !ids.has(e.philosophyHook)) {
      errors.push({ type: "bad-hook", message: `${e.id} philosophyHook 无效: ${e.philosophyHook}` });
    }
  }

  return errors;
}

export function validateAll(): ValidationError[] {
  return [...validateQuestions()];
}

/** CLI 入口：node scripts/validate-data.mjs 或 tsx */
if (typeof process !== "undefined" && process.argv[1]?.includes("validators")) {
  const errors = validateAll();
  if (errors.length > 0) {
    console.error("数据校验失败：");
    for (const e of errors) console.error(`  [${e.type}] ${e.message}`);
    process.exit(1);
  }
  console.log("数据校验通过。");
}
