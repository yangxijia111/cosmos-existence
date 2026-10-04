import { ButtonHTMLAttributes, forwardRef } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className = "", ...rest }, ref) => {
    const base =
      "inline-flex items-center justify-center rounded-sm px-5 py-2.5 text-sm tracking-widest transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-cosmic-indigo)]";
    const styles =
      variant === "primary"
        ? "bg-[var(--color-void-800)] text-[var(--color-void-50)] hover:bg-[var(--color-void-700)]"
        : "bg-transparent text-[var(--color-void-200)] hover:text-[var(--color-void-50)]";
    return <button ref={ref} className={`${base} ${styles} ${className}`} {...rest} />;
  }
);
Button.displayName = "Button";
