import { ProjectChip, SourceBadge } from "@/components/shared/chips";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";

interface SessionActivity {
  label: string;
  duration: string;
}

interface SessionCardProps {
  eyebrow?: string;
  title: string;
  project: string;
  duration: string;
  activities: SessionActivity[];
  sources?: string[];
  actionLabel?: string;
}

/**
 * Secao 13. Sessao e bloco planejado, nunca uma aula: a composicao lista as
 * atividades da sessao e as aulas aparecem como um item dentro dela.
 */
export function SessionCard({
  eyebrow = "Próxima sessão",
  title,
  project,
  duration,
  activities,
  sources = [],
  actionLabel = "Começar sessão",
}: SessionCardProps) {
  return (
    <Card elevation="sm" className="flex flex-col gap-4 p-[26px] shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-[6px]">
          <span className="text-overline font-bold uppercase tracking-[0.18em] text-graphite-500">
            {eyebrow}
          </span>
          <strong className="text-h3 font-bold tracking-[-0.015em]">{title}</strong>
          <ProjectChip name={`${project} · ${duration}`} />
        </div>
        <Icon name="timer" size="nav" className="text-graphite-500" />
      </div>

      <div className="flex flex-col gap-2">
        {activities.map((activity) => (
          <div
            key={activity.label}
            className="flex justify-between text-[13.5px] text-graphite-700"
          >
            <span>{activity.label}</span>
            <span className="font-mono text-graphite-500">{activity.duration}</span>
          </div>
        ))}
      </div>

      {sources.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {sources.map((source) => (
            <SourceBadge key={source} name={source} />
          ))}
        </div>
      )}

      <Button className="w-full">{actionLabel}</Button>
    </Card>
  );
}

interface SessionRowProps {
  time: string;
  project: string;
  title: string;
  duration: string;
}

/** Variante secundaria: as sessoes de "mais tarde" na tela Hoje. */
export function SessionRow({ time, project, title, duration }: SessionRowProps) {
  return (
    <Card padding="md" className="flex items-center gap-4 p-5">
      <span className="w-11 flex-none font-mono text-[13px] text-graphite-500">{time}</span>
      <div className="flex min-w-0 flex-1 flex-col gap-[2px]">
        <strong className="text-[15.5px]">{project}</strong>
        <span className="text-[13px] text-graphite-500">{title}</span>
      </div>
      <span className="font-mono text-[13px] text-graphite-600">{duration}</span>
    </Card>
  );
}

export type { SessionActivity, SessionCardProps, SessionRowProps };
