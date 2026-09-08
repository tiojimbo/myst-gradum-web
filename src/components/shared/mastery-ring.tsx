import { cn } from "@/lib/utils";

interface MasteryRingSegment {
  label: string;
  value: number;
  color: string;
}

interface MasteryRingProps {
  /** Percentual central exibido no miolo do anel. */
  value: number;
  caption?: string;
  /** Quando omitido, o anel usa duas faixas: dominado e restante. */
  segments?: MasteryRingSegment[];
  className?: string;
}

const DEFAULT_REST = "var(--gr-graphite-200)";

export function MasteryRing({
  value,
  caption = "domínio",
  segments,
  className,
}: MasteryRingProps) {
  const bands = segments ?? [
    { label: caption, value, color: "var(--gr-action)" },
    { label: "restante", value: 100 - value, color: DEFAULT_REST },
  ];

  let cursor = 0;
  const stops = bands
    .map((band) => {
      const start = cursor;
      cursor += band.value;
      return `${band.color} ${start}% ${cursor}%`;
    })
    .join(", ");

  return (
    <div
      className={cn("flex h-[116px] w-[116px] flex-none items-center justify-center rounded-full", className)}
      style={{ background: `conic-gradient(${stops})` }}
      role="img"
      aria-label={`${value}% de ${caption}`}
    >
      <div className="flex h-[88px] w-[88px] flex-col items-center justify-center rounded-full bg-surface">
        <strong className="text-h3 font-bold">{value}%</strong>
        <span className="text-overline text-graphite-500">{caption}</span>
      </div>
    </div>
  );
}

export type { MasteryRingProps, MasteryRingSegment };
