import Link from "next/link";
import { questions, questionById } from "@/data/questions";
import { cosmicEras } from "@/data/cosmic-eras";
import { QuestionId } from "@/data/types";
import { notFound } from "next/navigation";
import { QuestionHero } from "@/components/philosophy/QuestionHero";
import { PositionCard } from "@/components/philosophy/PositionCard";
import { RelatedQuestions } from "@/components/philosophy/RelatedQuestions";
import { Body } from "@/components/ui/Typography";

/** SSG：构建期生成全部问题页 */
export function generateStaticParams() {
  return questions.map((q) => ({ id: q.id }));
}

export default async function QuestionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const question = questionById[id as QuestionId];
  if (!question) notFound();

  // 该问题所衔接的宇宙纪元（从宇宙体验进入此问题的入口）
  const entryEra = question.entryFromEra
    ? cosmicEras.find((e) => e.id === question.entryFromEra)
    : undefined;

  return (
    <main className="min-h-screen bg-[var(--color-void-950)]">
      {/* 顶部导航：返回图谱 + 纪元入口 */}
      <nav className="flex items-center justify-between px-6 py-5 md:px-12">
        <Link
          href="/explore"
          className="text-xs tracking-[0.3em] text-[var(--color-void-400)] transition-colors hover:text-[var(--color-void-100)]"
        >
          ← 返回图谱
        </Link>
        {entryEra && (
          <Link
            href={`/?from=${entryEra.id}`}
            className="font-mono-num text-[10px] tracking-widest text-[var(--color-void-400)] transition-colors hover:text-[var(--color-void-100)]"
          >
            源于 {entryEra.title} · {entryEra.cosmologicalTime.display}
          </Link>
        )}
      </nav>

      <QuestionHero question={question} />

      <div className="mx-auto max-w-3xl px-6 pb-24 md:px-12">
        {/* 问题渊源 */}
        <section className="border-t border-[var(--color-void-800)] pt-12">
          <h2 className="font-serif-cn text-sm tracking-[0.3em] text-[var(--color-void-400)]">
            问题的渊源
          </h2>
          <Body className="mt-6 max-w-2xl">{question.originStory}</Body>
        </section>

        {/* 立场卡片流 */}
        <section className="mt-16">
          <h2 className="font-serif-cn text-sm tracking-[0.3em] text-[var(--color-void-400)]">
            哲学立场
          </h2>
          <div className="mt-8 space-y-4">
            {question.positions.map((p) => (
              <PositionCard key={p.id} position={p} />
            ))}
          </div>
        </section>

        {/* 关联问题导航 */}
        <RelatedQuestions questionId={question.id} />
      </div>
    </main>
  );
}
