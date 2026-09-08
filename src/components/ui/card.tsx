import { cn } from "@/lib/utils";

/**
 * Secao 14: card agrupa, nao decora. Nunca um card por linha de lista.
 * Elevacao segue os tres niveis da secao 04: flat, sm e md no hover.
 */
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  elevation?: "flat" | "sm" | "interactive";
  padding?: "none" | "sm" | "md" | "lg";
}

const PADDING = {
  none: "p-0",
  sm: "p-2",
  md: "p-5",
  lg: "p-6",
} as const;

const ELEVATION = {
  flat: "",
  sm: "shadow-sm",
  interactive: "shadow-sm transition-shadow duration-base ease-gradum hover:shadow-md",
} as const;

export function Card({
  className,
  elevation = "flat",
  padding = "lg",
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-surface",
        PADDING[padding],
        ELEVATION[elevation],
        className,
      )}
      {...props}
    />
  );
}

export type { CardProps };
