"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { forwardRef } from "react";

import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

export const Checkbox = forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "flex h-[22px] w-[22px] flex-none items-center justify-center rounded-[7px] border border-graphite-300 bg-surface transition-colors duration-fast ease-gradum",
      "data-[state=checked]:border-action data-[state=checked]:bg-action data-[state=checked]:text-on-action",
      "disabled:cursor-not-allowed disabled:border-graphite-200 disabled:bg-graphite-100",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator>
      <Icon name="check" size="inline" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));

Checkbox.displayName = "Checkbox";
