"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  ProjectSelector,
  type Project,
} from "@/components/layout/project-selector";
import {
  CommandSearch,
  type CommandSearchGroup,
} from "@/components/shared/command-search";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/providers/auth-provider";

interface TopbarProps {
  projects?: Project[];
  searchGroups?: CommandSearchGroup[];
  mode?: "authenticated" | "demonstration";
}

type TopbarContentProps = Omit<TopbarProps, "mode"> & {
  account: ReturnType<typeof useAuth> | null;
};

function AuthenticatedTopbar(props: Omit<TopbarProps, "mode">) {
  const account = useAuth();

  return <TopbarContent {...props} account={account} />;
}

function TopbarContent({
  projects = [],
  searchGroups = [],
  account,
}: TopbarContentProps) {
  const [accountError, setAccountError] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  async function leave(all: boolean) {
    if (!account) return;

    setAccountError(null);

    try {
      await (all ? account.logoutAll() : account.logout());
    } catch {
      setAccountError("Não foi possível sair. Tente novamente.");
    }
  }

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        setIsSearchOpen((open) => !open);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const normalizedQuery = query.toLocaleLowerCase();
  const filteredGroups = searchGroups.map((group) => ({
    ...group,
    results: group.results.filter((result) =>
      result.title.toLocaleLowerCase().includes(normalizedQuery),
    ),
  }));

  return (
    <header className="flex flex-wrap items-center gap-3 border-b border-border bg-surface p-4">
      <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <DialogTrigger asChild>
          <button
            type="button"
            className="flex min-w-[150px] flex-1 items-center gap-2 rounded-md bg-bg px-4 py-3 text-left text-sm text-graphite-600"
          >
            <Icon name="search" />
            Buscar em tudo…
            <kbd className="ml-auto font-mono text-xs">⌘K</kbd>
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-[560px]">
          <DialogTitle>Busca global</DialogTitle>
          <DialogDescription>
            Resultados disponíveis neste contexto.
          </DialogDescription>
          <Input
            aria-label="Buscar em tudo"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <CommandSearch query={query} groups={filteredGroups} />
        </DialogContent>
      </Dialog>

      <ProjectSelector projects={projects} />

      <button
        type="button"
        aria-label="Notificações"
        className="p-2 text-graphite-600"
      >
        <Icon name="notification-3" />
      </button>

      {account && (
        <DropdownMenu>
          <DropdownMenuTrigger
            aria-label="Menu da conta"
            className="rounded-full bg-action-soft px-3 py-2 text-sm font-semibold"
          >
            {account.user?.name ?? "Conta"}
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
      )}

      {accountError && (
        <p role="alert" className="text-sm text-danger">
          {accountError}
        </p>
      )}
    </header>
  );
}

export function Topbar({ mode = "authenticated", ...props }: TopbarProps) {
  if (mode === "demonstration") {
    return <TopbarContent {...props} account={null} />;
  }

  return <AuthenticatedTopbar {...props} />;
}

export type { TopbarProps };
