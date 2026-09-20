import type { ReactNode } from "react";
export function Section({ id, title, children, source }: { id: string; title: string; children: ReactNode; source?: string }) {
  return <section id={id} aria-labelledby={`${id}-title`} className="space-y-5 border-t border-border py-7"><header className="space-y-2"><h2 id={`${id}-title`} className="text-h2 font-bold tracking-[-.02em]">{title}</h2>{source && <p className="font-mono text-xs text-graphite-600">{source}</p>}</header>{children}</section>;
}
