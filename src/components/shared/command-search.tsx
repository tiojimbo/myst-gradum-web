import { Icon } from "@/components/ui/icon";

interface CommandSearchGroup {
  label: string;
  results: { title: string; meta?: string }[];
}

interface CommandSearchProps {
  query: string;
  groups: CommandSearchGroup[];
}

/**
 * Secao 25 da especificacao: busca global agrupada por tipo, aberta pelo topo
 * ou por atalho de comando.
 */
export function CommandSearch({ query, groups }: CommandSearchProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-lg">
      <div className="flex items-center gap-3 border-b border-border px-5 py-4">
        <Icon name="search" className="text-graphite-500" />
        <span className="flex-1 text-[15px] text-graphite-900">{query}</span>
        <kbd className="rounded-sm bg-graphite-100 px-2 py-1 font-mono text-[12px] text-graphite-500">
          ⌘K
        </kbd>
      </div>

      <div className="flex flex-col gap-4 p-4">
        {groups.map((group) => (
          <div key={group.label} className="flex flex-col gap-2">
            <span className="text-overline font-bold uppercase tracking-[0.18em] text-graphite-500">
              {group.label}
            </span>
            {group.results.map((result) => (
              <div
                key={result.title}
                className="flex items-center justify-between rounded-sm px-3 py-2 text-sm text-graphite-700 transition-colors duration-fast ease-gradum hover:bg-graphite-50"
              >
                <span>{result.title}</span>
                {result.meta && (
                  <span className="font-mono text-[12px] text-graphite-500">{result.meta}</span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export type { CommandSearchGroup, CommandSearchProps };
