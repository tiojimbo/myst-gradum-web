"use client";

import * as LabelPrimitive from "@radix-ui/react-label";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

export const Label = forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      "text-[13px] font-semibold text-graphite-700 peer-disabled:cursor-not-allowed peer-disabled:text-graphite-400",
      className,
    )}
    {...props}
  />
));

Label.displayName = "Label";
