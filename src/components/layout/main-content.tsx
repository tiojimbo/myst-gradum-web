import type { ReactNode } from "react";

interface MainContentProps {
  children: ReactNode;
}

/**
 * Secao 12 do design system: area de conteudo, max-width 1180 e gutter 24.
 */
export function MainContent({ children }: MainContentProps) {
  return (
    <main className="mx-auto flex w-full max-w-shell flex-1 flex-col gap-5 p-5">{children}</main>
  );
}

export type { MainContentProps };
