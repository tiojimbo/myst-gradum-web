import { forwardRef, type InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
  mono?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, invalid = false, mono = false, ...props }, ref) => (
    <input
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(
        "w-full rounded-md border bg-surface px-4 py-[14px] text-[15px] text-graphite-900 outline-none transition-colors duration-base ease-gradum",
        "placeholder:text-graphite-400",
        "focus-visible:border-action",
        "disabled:cursor-not-allowed disabled:border-graphite-200 disabled:bg-graphite-100 disabled:text-graphite-400",
        invalid ? "border-danger" : "border-graphite-300",
        mono && "font-mono",
        className,
      )}
      {...props}
    />
  ),
);

Input.displayName = "Input";

export type { InputProps };
