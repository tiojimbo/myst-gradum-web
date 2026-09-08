import { Icon } from "@/components/ui/icon";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

/** Estados de fase na Rota do projeto, secao 20 da especificacao. */
type PhaseState = "concluida" | "atual" | "futura";

interface PhaseCardProps {
  index: number;
  title: string;
  state: PhaseState;
  mastery?: number;
}

export function PhaseCard({ index, title, state, mastery }: PhaseCardProps) {
  const isCurrent = state === "atual";

  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-lg border p-4 transition-colors duration-base ease-gradum",
        isCurrent ? "border-blue-100 bg-blue-50" : "border-border bg-surface",
      )}
    >
      <div
        className={cn(
          "flex h-[34px] w-[34px] flex-none items-center justify-center rounded-full text-[13px] font-bold",
          state === "concluida" && "bg-success text-on-action",
          state === "atual" && "bg-action text-on-action",
          state === "futura" && "bg-graphite-100 text-graphite-500",
        )}
      >
        {state === "concluida" ? <Icon name="check" size="inline" /> : index}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="text-overline font-bold uppercase tracking-[0.18em] text-graphite-500">
          {isCurrent ? "Fase atual" : `Fase ${index}`}
        </span>
        <strong className={cn("text-[15px]", state === "futura" && "text-graphite-700")}>
          {title}
        </strong>
        {typeof mastery === "number" && <Progress value={mastery} className="mt-1" />}
      </div>

      {typeof mastery === "number" && (
        <span className="font-mono text-[13px] text-graphite-500">{mastery}%</span>
      )}
    </div>
  );
}

export type { PhaseCardProps, PhaseState };
