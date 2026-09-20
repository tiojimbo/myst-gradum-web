import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

interface CompanionNote {
  timestamp: string;
  text: string;
}

interface CompanionSidebarProps {
  session: string;
  lesson: string;
  position: string;
  notes?: CompanionNote[];
  progress?: number;
}

/**
 * Secao 11 da especificacao. O Companion nao vira um segundo Gradum: durante a
 * aula ele so permite anotar, marcar duvida e marcar importante.
 */
export function CompanionSidebar({
  session,
  lesson,
  position,
  notes = [],
  progress = 45,
}: CompanionSidebarProps) {
  return (
    <aside className="flex w-[280px] flex-col gap-4 rounded-lg border border-border bg-surface p-4">
      <div className="flex items-center gap-2">
        <GradumMark size={22} />
        <strong className="text-[15px] tracking-[-0.02em]">Gradum</strong>
      </div>

      <div className="flex flex-col gap-1 border-t border-border pt-3">
        <span className="text-overline font-bold uppercase tracking-[0.18em] text-graphite-500">
          Sessão
        </span>
        <span className="text-sm text-graphite-700">{session}</span>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-overline font-bold uppercase tracking-[0.18em] text-graphite-500">
          Aula atual
        </span>
        <strong className="text-sm">{lesson}</strong>
        <div className="flex items-center gap-2"><Progress value={progress} size="xs" className="flex-1" label="Posição na aula" /><span className="whitespace-nowrap font-mono text-[10px] text-graphite-500">{position}</span></div>
      </div>

      <div className="grid grid-cols-3 gap-2 border-t border-border pt-3">
        <Button variant="secondary" size="sm" className="h-auto flex-col gap-2 border-0 bg-graphite-100 px-1 py-3 text-xs">
          <Icon name="add" size="inline" />
          Nota
        </Button>
        <Button variant="secondary" size="sm" className="h-auto flex-col gap-2 border-0 bg-graphite-100 px-1 py-3 text-xs">
          <Icon name="question" size="inline" />
          Dúvida
        </Button>
        <Button variant="secondary" size="sm" className="h-auto flex-col gap-2 border-0 bg-graphite-100 px-1 py-3 text-xs">
          <Icon name="star" size="inline" />
          Importante
        </Button>
      </div>

      {notes.length > 0 && (
        <div className="flex flex-col gap-2 border-t border-border pt-3">
          {notes.map((note) => (
            <div key={note.timestamp} className="flex flex-col gap-2 rounded-[14px] bg-blue-50 p-3">
              <span className="font-mono text-[12px] text-graphite-500">{note.timestamp}</span>
              <span className="text-[13px] text-graphite-700">{note.text}</span>
            </div>
          ))}
        </div>
      )}
    </aside>
  );
}

/** Marca da secao 01: dois quadrantes arredondados em degrade, um sobre o outro. */
export function GradumMark({ size = 28, tone = "light" }: { size?: number; tone?: "light" | "dark" }) {
  const inner = Math.round(size * 0.6);
  const offset = Math.round(size * 0.39);

  return (
    <span className="relative flex-none" style={{ width: size, height: size }}>
      <span
        className="absolute left-0 top-0 rounded-[100%_0_100%_0] bg-gradient-to-br from-blue-400 to-blue-600"
        style={{ width: inner, height: inner }}
      />
      <span
        className={tone === "dark" ? "absolute rounded-[100%_0_100%_0] border-2 border-blue-200" : "absolute rounded-[100%_0_100%_0] bg-blue-100"}
        style={{ width: inner, height: inner, left: offset, top: offset }}
      />
    </span>
  );
}

export type { CompanionNote, CompanionSidebarProps };
