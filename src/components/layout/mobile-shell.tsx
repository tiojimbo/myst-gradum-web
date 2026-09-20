import type { ReactNode } from "react";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { MAIN_NAVIGATION } from "@/config/navigation";
export function MobileTabBar({ active, onNavigate }: { active: string; onNavigate: (href: string) => void }) {
  return <nav aria-label="Navegação móvel demonstrativa" className="flex border-t border-border bg-surface p-2">{MAIN_NAVIGATION.map((item) => <button key={item.href} onClick={() => onNavigate(item.href)} aria-current={active === item.href ? "page" : undefined} className={`flex min-w-0 flex-1 flex-col items-center gap-1 rounded-md px-1 py-2 text-[10px] ${active === item.href ? "bg-blue-100 text-blue-700" : "text-graphite-600"}`}><Icon name={item.icon} size="control" variant={active === item.href ? "fill" : "line"} />{item.label}</button>)}</nav>;
}
export function MobileHeader({ title, onSearch, onSettings }: { title: string; onSearch?: () => void; onSettings?: () => void }) {
  return <header className="flex items-center gap-2 border-b border-border p-4"><strong className="flex-1">{title}</strong><Button variant="ghost" size="sm" className="px-2" aria-label="Buscar no modelo móvel" onClick={onSearch}><Icon name="search" /></Button><Button variant="ghost" size="sm" className="px-2" aria-label="Configurações do modelo móvel" onClick={onSettings}><Icon name="settings-3" /></Button></header>;
}
export function MobileSheet({ open, onOpenChange, children, onCloseAutoFocus }: { open: boolean; onOpenChange: (open: boolean) => void; children: ReactNode; onCloseAutoFocus?: (event: Event) => void }) {
  return <Dialog open={open} onOpenChange={onOpenChange}><DialogContent onCloseAutoFocus={onCloseAutoFocus} className="top-auto bottom-0 max-h-[85vh] translate-y-0 overflow-y-auto rounded-b-none rounded-t-[24px]"><DialogTitle>Busca demonstrativa</DialogTitle><DialogDescription>Dados locais do modelo móvel derivado.</DialogDescription>{children}</DialogContent></Dialog>;
}
export function MobileShell({ title, active = "/hoje", onNavigate, tabBar = true, header = true, onSearch, children }: { title: string; active?: string; onNavigate: (href: string) => void; tabBar?: boolean; header?: boolean; onSearch?: () => void; children: ReactNode }) {
  return <div className="mx-auto flex w-full max-w-[390px] flex-col overflow-hidden rounded-[24px] border border-border bg-[var(--gr-bg-app)]">{header && <MobileHeader title={title} onSearch={onSearch} onSettings={onSearch} />}<div className="min-w-0 space-y-4 p-4">{children}</div>{tabBar && <MobileTabBar active={active} onNavigate={onNavigate} />}</div>;
}
