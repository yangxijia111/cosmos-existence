import { PhilosophyQuestion } from "@/data/types";

/**
 * QuestionHero — 问题首屏大字排版 + 所属纪元氛围
 */
export function QuestionHero({ question }: { question: PhilosophyQuestion }) {
  return (
    <section className="relative flex min-h-[60vh] flex-col justify-end px-6 pb-12 md:px-12 md:pb-16">
      <div className="max-w-4xl">
        <p className="font-mono-num text-[10px] tracking-[0.3em] text-[var(--color-void-400)]">
          {question.epoch.toUpperCase()} · #{String(question.order).padStart(2, "0")}
        </p>
        <h1 className="mt-6 font-serif-cn text-2xl leading-relaxed tracking-wider text-[var(--color-void-50)] md:text-5xl md:leading-relaxed">
          {question.title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed tracking-wider text-[var(--color-void-200)] md:text-lg">
          {question.subtitle}
        </p>
      </div>
    </section>
  );
}
