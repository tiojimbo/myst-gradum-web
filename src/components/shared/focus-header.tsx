import { Progress } from "@/components/ui/progress";

interface FocusHeaderProps {
  session: string;
  elapsed: string;
  progress: number;
  activity?: string;
}

/**
 * Secao 24 da especificacao: progresso discreto, sem cronometro pressionando.
 * O tempo planejado e estimativa, nao prazo punitivo.
 */
export function FocusHeader({ session, elapsed, progress, activity }: FocusHeaderProps) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-5">
      <div className="flex items-baseline justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-overline font-bold uppercase tracking-[0.18em] text-graphite-500">
            Sessão
          </span>
          <strong className="text-[17px] font-bold">{session}</strong>
        </div>
        <span className="font-mono text-[13px] text-graphite-500">{elapsed}</span>
      </div>
      <Progress value={progress} label={`Progresso da sessão ${session}`} />
      {activity && <span className="text-[13px] text-graphite-600">{activity}</span>}
    </div>
  );
}

export type { FocusHeaderProps };
