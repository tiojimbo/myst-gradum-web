import { cn } from "@/lib/utils";

interface ProgressProps {
  /** 0 a 100. Ignorado quando indeterminate e true. */
  value?: number;
  indeterminate?: boolean;
  /** Secao 07: a barra de maestria atingida usa verde em vez de azul. */
  tone?: "action" | "success";
  className?: string;
  label?: string;
}

export function Progress({
  value = 0,
  indeterminate = false,
  tone = "action",
  className,
  label,
}: ProgressProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={indeterminate ? undefined : clamped}
      aria-label={label}
      className={cn("h-2 overflow-hidden rounded-full bg-graphite-200", className)}
    >
      {indeterminate ? (
        <div className={cn("h-full w-1/3 rounded-full", tone === "success" ? "bg-success" : "bg-action", "animate-gradum-indeterminate")} />
      ) : (
        <div
          className={cn(
            "h-full rounded-full transition-[width] duration-slow ease-gradum",
            tone === "success" ? "bg-success" : "bg-action",
          )}
          style={{ width: `${clamped}%` }}
        />
      )}
    </div>
  );
}

interface StepperProps {
  current: number;
  total: number;
  className?: string;
}

export function Stepper({ current, total, className }: StepperProps) {
  return (
    <div className={cn("flex gap-2", className)} aria-label={`Etapa ${current} de ${total}`}>
      {Array.from({ length: total }, (_, index) => (
        <span
          key={index}
          className={cn(
            "h-2 flex-1 rounded-full transition-colors duration-base ease-gradum",
            index < current ? "bg-action" : "bg-graphite-200",
          )}
        />
      ))}
    </div>
  );
}

export type { ProgressProps, StepperProps };
