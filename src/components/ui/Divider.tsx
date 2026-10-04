export function Divider({ className = "" }: { className?: string }) {
  return (
    <div
      className={`h-px bg-gradient-to-r from-transparent via-[var(--color-void-700)] to-transparent ${className}`}
    />
  );
}
