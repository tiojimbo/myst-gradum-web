import type { ReactNode } from "react";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Topbar } from "@/components/layout/topbar";
import { MainContent } from "@/components/layout/main-content";
export function AppShell({ active, onNavigate, children }: { active?: string; onNavigate?: (href: string) => void; children: ReactNode }) {
  return <div className="flex min-w-0 overflow-hidden rounded-[24px] border border-border bg-[var(--gr-bg-app)]"><div className="hidden md:flex"><AppSidebar active={active} onNavigate={onNavigate} /></div><div className="min-w-0 flex-1"><Topbar projects={[{ id: "demo", name: "Audiovisual · demonstração" }]} /><MainContent>{children}</MainContent></div></div>;
}
