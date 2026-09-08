"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@/components/ui/icon";

interface Project {
  id: string;
  name: string;
  color?: string;
}

interface ProjectSelectorProps {
  /** Sem entidade Project nesta frente: entra vazio ate a F0.3. */
  projects?: Project[];
}

/**
 * Secao 12 do design system: seletor de projeto do topbar. "Todos os
 * projetos", a lista, "Novo projeto" e "Gerenciar projetos".
 */
export function ProjectSelector({ projects = [] }: ProjectSelectorProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 rounded-md border border-border px-3 py-[10px] text-sm font-semibold text-graphite-900 transition-colors duration-fast ease-gradum hover:bg-graphite-100">
        <span className="h-2 w-2 rounded-full bg-action" />
        Todos os projetos
        <Icon name="arrow-down-s" size="inline" className="text-graphite-500" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[240px]">
        <DropdownMenuItem className="bg-action-soft font-semibold text-blue-700">
          <Icon name="stack" size="inline" />
          Todos os projetos
        </DropdownMenuItem>
        {projects.map((project) => (
          <DropdownMenuItem key={project.id}>
            <span
              className="h-2 w-2 flex-none rounded-full"
              style={{ backgroundColor: project.color ?? "var(--gr-blue-500)" }}
            />
            {project.name}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="font-semibold text-action">
          <Icon name="add" size="inline" />
          Novo projeto
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Icon name="list-settings" size="inline" />
          Gerenciar projetos
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export type { Project, ProjectSelectorProps };
