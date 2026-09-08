import { GradumMark } from "@/components/shared/companion-sidebar";
import { Icon } from "@/components/ui/icon";
import { MAIN_NAVIGATION } from "@/config/navigation";
import { cn } from "@/lib/utils";

interface AppSidebarProps {
  /** href do item ativo. */
  active?: string;
}

/**
 * Secao 12 do design system: item selecionado recebe fundo Ice Blue, icone
 * Mist Blue e texto Deep Graphite. O icone ativo usa a variante -fill.
 */
export function AppSidebar({ active = "/hoje" }: AppSidebarProps) {
  return (
    <nav className="flex w-[232px] flex-none flex-col gap-5 border-r border-border bg-surface p-5">
      <div className="flex items-center gap-2">
        <GradumMark size={28} />
        <strong className="text-[19px] tracking-[-0.02em]">Gradum</strong>
      </div>

      <ul className="flex flex-col gap-1">
        {MAIN_NAVIGATION.map((item) => {
          const isActive = item.href === active;

          return (
            <li key={item.href}>
              <a
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-[10px] px-4 py-[10px] text-sm transition-colors duration-base ease-gradum",
                  isActive
                    ? "bg-action-soft font-semibold text-graphite-900"
                    : "font-medium text-graphite-700 hover:bg-graphite-100",
                )}
              >
                <Icon
                  name={item.icon}
                  variant={isActive ? "fill" : "line"}
                  size="nav"
                  className={isActive ? "text-action" : "text-graphite-500"}
                />
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export type { AppSidebarProps };
