import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "COSMOS / 存在",
  description: "沉浸式哲学探索网站 — 从宇宙诞生到人类意识与人生意义",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-[var(--color-void-950)] text-[var(--color-void-50)]">
        {children}
      </body>
    </html>
  );
}
