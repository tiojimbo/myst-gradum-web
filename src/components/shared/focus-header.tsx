import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Progress } from "@/components/ui/progress";

interface FocusHeaderProps {
  session: string;
  elapsed: string;
  progress: number;
  activity?: string;
  onDark?: boolean;
  compact?: boolean;
  onClose?: () => void;
}

/**
 * Secao 24 da especificacao: progresso discreto, sem cronometro pressionando.
 * O tempo planejado e estimativa, nao prazo punitivo.
 */
export function FocusHeader({ session, elapsed, progress, activity, onDark = false, compact = false, onClose }: FocusHeaderProps) {
  if (compact) return <div className="flex items-center gap-3"><span className="text-overline uppercase tracking-[.18em] text-graphite-500">Sessão</span><Progress value={progress} size="xs" onDark className="flex-1" label={`Progresso da sessão ${session}`} /><span className="whitespace-nowrap font-mono text-xs text-graphite-400">{elapsed}</span><Button variant="ghost" size="icon" className="text-graphite-400 hover:bg-graphite-800" aria-label="Encerrar sessão demonstrativa" onClick={onClose}><Icon name="close" /></Button></div>;
  return (
    <div className={onDark ? "flex flex-col gap-3 rounded-xl bg-graphite-900 p-5 text-white" : "flex flex-col gap-3 rounded-xl border border-border bg-surface p-5"}>
      <div className="flex items-baseline justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-overline font-bold uppercase tracking-[0.18em] text-graphite-500">
            Sessão
          </span>
          <strong className="text-[17px] font-bold">{session}</strong>
        </div>
        <span className="font-mono text-[13px] text-graphite-500">{elapsed}</span>
      </div>
      <Progress onDark={onDark} value={progress} label={`Progresso da sessão ${session}`} />
      {activity && <span className="text-[13px] text-graphite-600">{activity}</span>}
    </div>
  );
}

export type { FocusHeaderProps };
