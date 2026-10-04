/**
 * 语义排版组件 — 保持一致的层级、字距与呼吸感
 */
export function Heading1({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h1
      className={`font-serif-cn text-3xl leading-tight tracking-wide text-[var(--color-void-50)] ${className}`}
    >
      {children}
    </h1>
  );
}

export function Heading2({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2
      className={`font-serif-cn text-2xl leading-snug tracking-wide text-[var(--color-void-50)] ${className}`}
    >
      {children}
    </h2>
  );
}

export function Body({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-base leading-relaxed tracking-wider text-[var(--color-void-200)] ${className}`}>
      {children}
    </p>
  );
}

export function Caption({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`font-mono-num text-xs tracking-widest text-[var(--color-void-400)] ${className}`}>
      {children}
    </span>
  );
}
