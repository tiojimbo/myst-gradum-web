import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Secao 07 do design system. Os tons soft de sucesso, atencao e perigo nao estao
 * no bloco de tokens da secao 19: os hex vem do proprio arquivo e estao fixados aqui.
 */
const badgeVariants = cva(
  "inline-flex items-center gap-2 rounded-full font-semibold",
  {
    variants: {
      tone: {
        brand: "bg-blue-100 text-blue-700",
        neutral: "bg-graphite-100 text-graphite-700",
        success: "bg-[#E4F5EC] text-[#1F7A51]",
        warning: "bg-[#FBF1DC] text-[#8A6414]",
        danger: "bg-[#FBE7E6] text-[#A83B37]",
        dark: "bg-graphite-900 text-on-action",
      },
      size: {
        sm: "px-3 py-[6px] text-[12px]",
        md: "px-[14px] py-[7px] text-[13px]",
      },
    },
    defaultVariants: {
      tone: "neutral",
      size: "md",
    },
  },
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, tone, size, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ tone, size }), className)} {...props} />;
}

export { badgeVariants };
export type { BadgeProps };
