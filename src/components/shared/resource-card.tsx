import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Progress } from "@/components/ui/progress";

/** Secao 2 da especificacao: recurso e o conteudo usado por uma atividade. */
type ResourceKind = "curso" | "documento" | "aula" | "artigo" | "livro";

const KIND_ICON: Record<ResourceKind, string> = {
  curso: "graduation-cap",
  documento: "file-text",
  aula: "play-circle",
  artigo: "article",
  livro: "book-2",
};

interface ResourceCardProps {
  kind: ResourceKind;
  title: string;
  meta: string;
  project?: string;
  progress?: number;
  badges?: string[];
}

export function ResourceCard({
  kind,
  title,
  meta,
  project,
  progress,
  badges = [],
}: ResourceCardProps) {
  return (
    <Card elevation="interactive" className="flex items-start gap-4 p-5">
      <div className="flex h-16 w-16 flex-none items-center justify-center rounded-lg bg-blue-100 text-blue-700">
        <Icon name={KIND_ICON[kind]} size="feature" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-[10px]">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1">
            <strong className="text-[18px] font-bold tracking-[-0.01em]">{title}</strong>
            <span className="text-sm text-graphite-500">{meta}</span>
          </div>
          <Icon name="arrow-right" className="flex-none text-blue-600" />
        </div>

        {typeof progress === "number" && (
          <div className="flex items-center gap-3">
            <Progress value={progress} className="flex-1" label={`Progresso de ${title}`} />
            <span className="font-mono text-[12px] text-graphite-500">{progress}%</span>
          </div>
        )}

        {(badges.length > 0 || project) && (
          <div className="flex flex-wrap gap-2">
            {project && (
              <Badge tone="brand" size="sm">
                {project}
              </Badge>
            )}
            {badges.map((badge) => (
              <Badge key={badge} size="sm">
                {badge}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}

export type { ResourceCardProps, ResourceKind };
