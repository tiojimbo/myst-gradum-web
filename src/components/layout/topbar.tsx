"use client";
import { useEffect, useState } from "react";
import { ProjectSelector, type Project } from "@/components/layout/project-selector";
import { CommandSearch, type CommandSearchGroup } from "@/components/shared/command-search";
import { Icon } from "@/components/ui/icon";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
interface TopbarProps { projects?: Project[]; searchGroups?: CommandSearchGroup[] }
export function Topbar({ projects = [], searchGroups = [] }: TopbarProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") { event.preventDefault(); setOpen((value) => !value); }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
  return <header className="flex flex-wrap items-center gap-3 border-b border-border bg-surface p-4"><Dialog open={open} onOpenChange={setOpen}><DialogTrigger asChild><button className="flex min-w-[150px] flex-1 items-center gap-2 rounded-md bg-bg px-4 py-3 text-left text-sm text-graphite-600"><Icon name="search" />Buscar em tudo…<kbd className="ml-auto font-mono text-xs">⌘K</kbd></button></DialogTrigger><DialogContent className="max-w-[560px]"><DialogTitle>Busca global</DialogTitle><DialogDescription>Resultados disponíveis neste contexto.</DialogDescription><Input aria-label="Buscar em tudo" value={query} onChange={(event) => setQuery(event.target.value)} /><CommandSearch query={query} groups={searchGroups.map((group) => ({ ...group, results: group.results.filter((result) => result.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())) }))} /></DialogContent></Dialog><ProjectSelector projects={projects} /><button type="button" aria-label="Notificações" className="p-2 text-graphite-600"><Icon name="notification-3" /></button><button type="button" aria-label="Configurações" className="p-2 text-graphite-600"><Icon name="settings-3" /></button><span className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">SA</span></header>;
}
export type { TopbarProps };
