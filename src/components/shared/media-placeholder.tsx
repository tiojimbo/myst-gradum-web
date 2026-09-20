import { Icon } from "@/components/ui/icon";
export function MediaPlaceholder({ label = "Mídia externa", className = "" }: { label?: string; className?: string }) {
  return <div className={`flex min-h-[140px] items-center justify-center gap-3 rounded-lg border border-border bg-graphite-100 p-5 text-sm text-graphite-600 ${className}`} style={{ backgroundImage: "repeating-linear-gradient(135deg,transparent,transparent 8px,var(--gr-border) 8px,var(--gr-border) 9px)" }}><Icon name="play-circle" size="feature" />{label}</div>;
}
