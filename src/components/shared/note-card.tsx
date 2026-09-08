import { TimestampChip } from "@/components/shared/chips";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";

/** Secao 12 da especificacao: os cinco tipos rapidos de anotacao. */
export type NoteKind = "nota" | "duvida" | "importante" | "acao" | "exemplo";

const KIND: Record<NoteKind, { label: string; icon: string; className: string }> = {
  nota: { label: "Nota", icon: "sticky-note", className: "bg-graphite-100 text-graphite-700" },
  duvida: { label: "Dúvida", icon: "question", className: "bg-[#FBF1DC] text-[#8A6414]" },
  importante: { label: "Importante", icon: "star", className: "bg-blue-100 text-blue-700" },
  acao: { label: "Ação", icon: "check-double", className: "bg-[#E4F5EC] text-[#1F7A51]" },
  exemplo: { label: "Exemplo", icon: "lightbulb", className: "bg-graphite-100 text-graphite-700" },
};

interface NoteCardProps {
  kind?: NoteKind;
  title: string;
  body?: string;
  timestamp?: string;
  /** Curso, aula ou sessao de onde a nota nasceu. */
  context?: string;
}

export function NoteCard({ kind = "nota", title, body, timestamp, context }: NoteCardProps) {
  const config = KIND[kind];

  return (
    <Card elevation="interactive" className="flex flex-col gap-3 p-5">
      <div className="flex items-center gap-2">
        <span
          className={`inline-flex items-center gap-1 rounded-sm px-2 py-1 text-[12px] font-semibold ${config.className}`}
        >
          <Icon name={config.icon} size="inline" />
          {config.label}
        </span>
        {timestamp && <TimestampChip value={timestamp} />}
      </div>

      <strong className="text-[16px] font-bold">{title}</strong>
      {body && <p className="text-sm leading-relaxed text-graphite-600">{body}</p>}
      {context && <span className="text-[12px] text-graphite-500">{context}</span>}
    </Card>
  );
}

export type { NoteCardProps };
