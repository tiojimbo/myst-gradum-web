import { cn } from "@/lib/utils";

/**
 * Secao 10 do design system: Remix Icon e a unica biblioteca, grade 24px.
 * A variante -line e o padrao; -fill so em item de navegacao ativo, estado
 * concluido e favorito marcado. A cor herda currentColor e nunca sai da paleta.
 */
const ICON_SIZE = {
  inline: 16,
  control: 20,
  nav: 24,
  feature: 32,
} as const;

type IconSize = keyof typeof ICON_SIZE;

interface IconProps {
  /** Nome do Remix Icon sem o prefixo, por exemplo "arrow-right". */
  name: string;
  variant?: "line" | "fill" | "none";
  size?: IconSize;
  className?: string;
}

export function Icon({ name, variant = "line", size = "control", className }: IconProps) {
  return (
    <i
      aria-hidden
      className={cn(variant === "none" ? `ri-${name}` : `ri-${name}-${variant}`, className)}
      style={{ fontSize: ICON_SIZE[size] }}
    />
  );
}

export type { IconProps, IconSize };
