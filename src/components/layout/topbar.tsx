"use client";

import { useEffect, useState } from "react";

import {
  ProjectSelector,
  type Project,
} from "@/components/layout/project-selector";
import {
  CommandSearch,
  type CommandSearchGroup,
} from "@/components/shared/command-search";
import Link from "next/link";
import { useAuth } from "@/providers/auth-provider";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@/components/ui/icon";

interface TopbarProps {
  projects?: Project[];
  /** Nada a buscar ainda nesta frente: default vazio. */
  searchGroups?: CommandSearchGroup[];
}

/**
 * Secao 12 do design system: barra superior. Abre, fecha e escuta o atalho
 * de teclado do painel de busca; CommandSearch e so o desenho, apresentacional.
 */
export function Topbar({ projects = [], searchGroups = [] }: TopbarProps) {
  const { user, logout, logoutAll } = useAuth();
  const [accountError, setAccountError] = useState<string | null>(null);
  async function leave(all: boolean) {
    setAccountError(null);
    try {
      await (all ? logoutAll() : logout());
    } catch {
      setAccountError("Não foi possível sair. Tente novamente.");
    }
  }
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        setIsSearchOpen((open) => !open);
      }

      if (event.key === "Escape") {
        setIsSearchOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className="flex items-center gap-3 border-b border-border bg-surface px-5 py-[14px]">
      <button
        type="button"
        onClick={() => setIsSearchOpen(true)}
        className="flex flex-1 items-center gap-2 rounded-md bg-bg px-4 py-[10px] text-left text-sm text-graphite-500 transition-colors duration-fast ease-gradum hover:bg-graphite-100"
      >
        <Icon name="search" />
        Buscar em tudo…
        <kbd className="ml-auto font-mono text-[11px] text-graphite-400">
          ⌘K
        </kbd>
      </button>

      <ProjectSelector projects={projects} />

      <button
        type="button"
        aria-label="Notificações"
        className="text-graphite-500 transition-colors duration-fast ease-gradum hover:text-graphite-700"
      >
        <Icon name="notification-3" />
      </button>

      <DropdownMenu>
        <DropdownMenuTrigger
          aria-label="Menu da conta"
          className="rounded-full bg-action-soft px-3 py-2 text-sm font-semibold"
        >
          {user?.name ?? "Conta"}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href="/configuracoes/api-keys">Chaves de API</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => void leave(false)}>
            Sair
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => void leave(true)}>
            Sair de todos os dispositivos
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {accountError && (
        <p role="alert" className="text-sm text-danger">
          {accountError}
        </p>
      )}

      {isSearchOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-graphite-900/50 pt-[10vh]"
          onClick={() => setIsSearchOpen(false)}
        >
          <div
            className="w-full max-w-[560px]"
            onClick={(event) => event.stopPropagation()}
          >
            <CommandSearch query="" groups={searchGroups} />
          </div>
        </div>
      )}
    </header>
  );
}

export type { TopbarProps };
