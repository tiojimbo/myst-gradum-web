import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

/** Secao 14 da especificacao: os cinco estados de projeto, nada alem deles. */
export type ProjectStatus = "ativo" | "pausado" | "manutencao" | "concluido" | "arquivado";

const STATUS_LABEL: Record<ProjectStatus, string> = {
  ativo: "Ativo",
  pausado: "Pausado",
  manutencao: "Manutenção",
  concluido: "Concluído",
  arquivado: "Arquivado",
};

const STATUS_TONE = {
  ativo: "success",
  pausado: "warning",
  manutencao: "brand",
  concluido: "neutral",
  arquivado: "neutral",
} as const;

export function StatusChip({ status }: { status: ProjectStatus }) {
  return (
    <Badge tone={STATUS_TONE[status]} size="sm">
      {STATUS_LABEL[status]}
    </Badge>
  );
}

/** Ponto colorido + nome do projeto, usado para marcar a origem de um card. */
export function ProjectChip({ name, color = "var(--gr-action)" }: { name: string; color?: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-[13px] text-graphite-600">
      <span className="h-2 w-2 flex-none rounded-full" style={{ background: color }} />
      {name}
    </span>
  );
}

export function SourceBadge({ name, icon = "graduation-cap" }: { name: string; icon?: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-sm bg-graphite-100 px-3 py-[6px] text-[12px] font-semibold text-graphite-700">
      <Icon name={icon} size="inline" />
      {name}
    </span>
  );
}

/** Secao 6 da especificacao: confianca epistemica, nunca qualidade da aula. */
export type ConfidenceLevel = "alta" | "parcial" | "baixa";

const CONFIDENCE = {
  alta: { label: "Confiança alta", tone: "success" },
  parcial: { label: "Cobertura parcial", tone: "warning" },
  baixa: { label: "Confiança baixa", tone: "danger" },
} as const;

export function ConfidenceBadge({ level }: { level: ConfidenceLevel }) {
  const config = CONFIDENCE[level];
  return (
    <Badge tone={config.tone} size="sm">
      {config.label}
    </Badge>
  );
}

/** Timestamp da aula que originou a nota. Sempre mono. */
export function TimestampChip({ value, className }: { value: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-sm bg-blue-100 px-2 py-1 font-mono text-[12px] text-blue-700",
        className,
      )}
    >
      {value}
    </span>
  );
}
