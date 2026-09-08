"use client";

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

export const RadioGroup = forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root ref={ref} className={cn("flex flex-col gap-3", className)} {...props} />
));

RadioGroup.displayName = "RadioGroup";

export const RadioGroupItem = forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    className={cn(
      "h-[22px] w-[22px] flex-none rounded-full border border-graphite-300 bg-surface transition-all duration-fast ease-gradum",
      "data-[state=checked]:border-[6px] data-[state=checked]:border-action",
      "disabled:cursor-not-allowed disabled:border-graphite-200 disabled:bg-graphite-100",
      className,
    )}
    {...props}
  />
));

RadioGroupItem.displayName = "RadioGroupItem";
