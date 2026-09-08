"use client";

import * as SwitchPrimitive from "@radix-ui/react-switch";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

export const Switch = forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    className={cn(
      "flex h-[28px] w-[48px] flex-none items-center rounded-full bg-graphite-300 p-[3px] transition-colors duration-base ease-gradum",
      "data-[state=checked]:bg-action",
      "disabled:cursor-not-allowed disabled:opacity-60",
      className,
    )}
    {...props}
  >
    <SwitchPrimitive.Thumb className="block h-[22px] w-[22px] rounded-full bg-surface transition-transform duration-base ease-gradum data-[state=checked]:translate-x-[20px]" />
  </SwitchPrimitive.Root>
));

Switch.displayName = "Switch";
