import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-semibold transition-colors duration-base ease-gradum disabled:cursor-not-allowed disabled:border disabled:border-graphite-200 disabled:bg-graphite-100 disabled:text-graphite-400 disabled:shadow-none",
  {
    variants: {
      variant: {
        primary: "bg-action text-on-action shadow-action hover:bg-action-hover",
        secondary:
          "border border-graphite-300 bg-surface text-graphite-900 hover:bg-graphite-100",
        tonal: "bg-blue-100 text-blue-700 hover:bg-blue-200",
        ghost: "bg-transparent text-blue-600 hover:bg-blue-50",
        dark: "bg-graphite-900 text-on-action hover:bg-graphite-800",
      },
      size: {
        sm: "rounded-[10px] px-[18px] py-[10px] text-[13px]",
        md: "rounded-md px-[26px] py-[14px] text-[15px]",
        lg: "rounded-[14px] px-[34px] py-[18px] text-[17px]",
        icon: "h-[52px] w-[52px] rounded-[14px] p-0 text-[18px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { buttonVariants };
export type { ButtonProps };
