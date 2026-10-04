import { ButtonHTMLAttributes, forwardRef } from "react";

export const IconButton = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(({ className = "", ...rest }, ref) => {
  return (
    <button
      ref={ref}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full text-[var(--color-void-200)] transition-colors hover:text-[var(--color-void-50)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-cosmic-indigo)] ${className}`}
      {...rest}
    />
  );
});
IconButton.displayName = "IconButton";
