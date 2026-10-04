import Link from "next/link";
import { questionById } from "@/data/questions";
import { QuestionId } from "@/data/types";

export function RelatedQuestions({ questionId }: { questionId: QuestionId }) {
  const q = questionById[questionId];
  if (!q) return null;

  const related = q.relatedQuestionIds
    .map((id) => questionById[id])
    .filter(Boolean);

  return (
    <nav className="mt-12 border-t border-[var(--color-void-800)] pt-8">
      <h3 className="font-serif-cn text-sm tracking-widest text-[var(--color-void-400)]">
        关联问题
      </h3>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {related.map((rq) => (
          <Link
            key={rq.id}
            href={`/question/${rq.id}`}
            className="group rounded-sm border border-[var(--color-void-800)] px-5 py-4 transition-colors hover:border-[var(--color-void-600)]"
          >
            <span className="text-xs tracking-widest text-[var(--color-void-400)]">
              {rq.epoch.toUpperCase()}
            </span>
            <p className="mt-2 font-serif-cn text-sm leading-relaxed text-[var(--color-void-100)] transition-colors group-hover:text-[var(--color-void-50)]">
              {rq.title}
            </p>
          </Link>
        ))}
      </div>
    </nav>
  );
}
