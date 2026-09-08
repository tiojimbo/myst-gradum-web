import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface CompetencyRowProps {
  name: string;
  mastery: number;
  className?: string;
}

/**
 * Secao 14 do design system: linha simples dentro de um card unico.
 * Nunca envolver cada competencia no proprio card.
 */
export function CompetencyRow({ name, mastery, className }: CompetencyRowProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-baseline justify-between">
        <span className="text-sm text-graphite-700">{name}</span>
        <span className="font-mono text-[13px] text-graphite-500">{mastery}%</span>
      </div>
      <Progress value={mastery} label={`Mastery de ${name}`} />
    </div>
  );
}

interface MasteryDeltaProps {
  from: number;
  to: number;
}

/** Secao 14: a barra anima de um valor ao outro, sem confete. */
export function MasteryDelta({ from, to }: MasteryDeltaProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline gap-2 text-sm text-graphite-700">
        <span>Mastery</span>
        <span className="font-mono text-graphite-500">{from}%</span>
        <span className="text-graphite-400">→</span>
        <strong className="font-mono text-blue-600">{to}%</strong>
      </div>
      <Progress value={to} label={`Mastery de ${from}% para ${to}%`} />
    </div>
  );
}

export type { CompetencyRowProps, MasteryDeltaProps };
