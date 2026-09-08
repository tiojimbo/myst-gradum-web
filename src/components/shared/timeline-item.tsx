import { Card } from "@/components/ui/card";

interface TimelineEntry {
  time: string;
  project: string;
  title: string;
  duration: string;
}

interface TimelineItemProps {
  day: string;
  entries: TimelineEntry[];
}

/** Secao 20 da especificacao: Semana e uma view de Plano, nao um menu proprio. */
export function TimelineItem({ day, entries }: TimelineItemProps) {
  return (
    <Card padding="md" className="flex flex-col gap-3 p-5">
      <span className="text-overline font-bold uppercase tracking-[0.18em] text-graphite-500">
        {day}
      </span>
      <div className="flex flex-col gap-3">
        {entries.map((entry) => (
          <div key={`${entry.time}-${entry.title}`} className="flex items-center gap-3">
            <span className="w-11 flex-none font-mono text-[13px] text-graphite-500">
              {entry.time}
            </span>
            <div className="flex min-w-0 flex-1 flex-col">
              <strong className="text-sm">{entry.project}</strong>
              <span className="text-[13px] text-graphite-500">{entry.title}</span>
            </div>
            <span className="font-mono text-[13px] text-graphite-600">{entry.duration}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

export type { TimelineEntry, TimelineItemProps };
