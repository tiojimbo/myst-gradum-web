import { Fragment, useId, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { TimestampChip } from "@/components/shared/chips";
const COMMANDS = [
  ["bold", "Negrito"], ["italic", "Itálico"], ["code-s-slash", "Código"], ["link", "Link"],
  ["h-2", "Título"], ["h-3", "Subtítulo"], ["list-unordered", "Lista"], ["list-ordered", "Lista numerada"],
  ["list-check-2", "Checklist"], ["quote-text", "Citação"], ["terminal-box", "Bloco de código"], ["image", "Imagem demonstrativa"],
] as const;
export function EditorToolbar({ active = [], onCommand, extra }: { active?: string[]; onCommand?: (command: string) => void; extra?: ReactNode }) {
  return <div role="toolbar" aria-label="Formatação demonstrativa" className="flex flex-wrap gap-1 rounded-[14px] bg-graphite-100 p-2">{[COMMANDS.slice(0,4), COMMANDS.slice(4,9), COMMANDS.slice(9)].map((group,index) => <Fragment key={index}>{index > 0 && <span role="separator" aria-orientation="vertical" className="mx-1 h-[24px] w-px self-center bg-graphite-300" />}{group.map(([command, label]) => <Button key={command} type="button" variant={active.includes(command) ? "tonal" : "ghost"} className="h-[44px] w-[44px] p-0 text-graphite-700" aria-label={label} aria-pressed={active.includes(command)} onClick={() => onCommand?.(command)}><Icon name={command} variant={["code-s-slash", "terminal-box", "image"].includes(command) ? "line" : "none"} /></Button>)}</Fragment>)}{extra && <><span role="separator" aria-orientation="vertical" className="mx-1 h-[24px] w-px self-center bg-graphite-300" />{extra}</>}</div>;
}
export function KnowledgeLinks({ items = [], onAdd }: { items?: string[]; onAdd?: () => void }) {
  return <div className="flex flex-wrap items-center gap-2 border-t border-border pt-4"><span className="text-xs text-graphite-600">Conceitos</span>{items.map((item) => <span key={item} className="rounded-full bg-blue-100 px-3 py-2 text-xs font-semibold text-blue-700">{item}</span>)}<Button variant="ghost" size="sm" onClick={onAdd}><Icon name="add" size="inline" />Vincular</Button></div>;
}
export function NoteEditor({ title, onTitleChange, timestamp, context, status, kind = "nota", active, onCommand, children, footer, toolbarExtra }: { title: string; onTitleChange?: (title: string) => void; timestamp?: string; context?: string; status?: string; kind?: "nota" | "duvida" | "importante" | "erro"; active?: string[]; onCommand?: (command: string) => void; children: ReactNode; footer?: ReactNode; toolbarExtra?: ReactNode }) {
  const id = useId();
  return <div className="min-w-0 space-y-4 rounded-xl border border-border bg-surface p-5"><div className="flex flex-wrap items-center gap-3 text-xs text-graphite-600">{timestamp && <TimestampChip value={timestamp} />}<span>{{nota:"Nota",duvida:"Dúvida",importante:"Importante",erro:"Erro"}[kind]}</span><span role="status" className="ml-auto">{status}</span></div><label className="sr-only" htmlFor={id}>Título da nota</label><Input id={id} value={title} readOnly={!onTitleChange} onChange={(event) => onTitleChange?.(event.target.value)} className="border-0 p-0 text-h3 font-bold" /><p className="text-xs text-graphite-600">{context}</p><EditorToolbar active={active} onCommand={onCommand} extra={toolbarExtra} /><div className="min-h-[220px] space-y-4 leading-[1.7]">{children}</div>{footer}</div>;
}
