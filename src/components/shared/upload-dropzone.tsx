import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { ConfidenceBadge } from "@/components/shared/chips";
import { cn } from "@/lib/utils";
export function UploadDropzone({ dragging = false, onChoose }: { dragging?: boolean; onChoose?: () => void }) {
  return <div className={cn("flex flex-col items-center gap-4 rounded-xl border border-dashed border-blue-300 bg-blue-50 p-6 text-center", dragging && "border-blue-600 bg-blue-100 shadow-focus")}><Icon name="upload-cloud-2" size="feature" className="text-blue-600" /><strong>Arraste seus materiais aqui</strong><p className="text-sm text-graphite-600">PDF · DOCX · PPTX · XLSX · CSV · TXT · transcrições</p><Button variant="secondary" onClick={onChoose}>Selecionar material demonstrativo</Button></div>;
}
export function ImportReview({ title, onConfirm }: { title: string; onConfirm?: () => void }) {
  return <div className="space-y-4 rounded-xl border border-border bg-surface p-5"><strong>{title}</strong><p className="text-sm">371 aulas · 109h15 · 12 áreas · 27 módulos</p><ConfidenceBadge level="alta" /><p className="text-sm text-graphite-600">Estrutura: Curso → Módulo → Aula</p><div className="flex flex-wrap gap-3 text-xs text-graphite-600">{["duração", "nível", "professor", "software", "competências", "exercícios"].map((item) => <span key={item}><Icon name="check" size="inline" className="text-success" /> {item}</span>)}</div><Button onClick={onConfirm}>Confirmar demonstração</Button></div>;
}
