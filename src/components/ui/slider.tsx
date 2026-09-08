"use client";

import * as SliderPrimitive from "@radix-ui/react-slider";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

export const Slider = forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn("relative flex w-full touch-none select-none items-center", className)}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow rounded-full bg-graphite-200">
      <SliderPrimitive.Range className="absolute h-full rounded-full bg-action" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-[20px] w-[20px] rounded-full border-2 border-action bg-surface shadow-[0_4px_10px_rgba(31,37,45,0.12)] transition-shadow duration-fast ease-gradum" />
  </SliderPrimitive.Root>
));

Slider.displayName = "Slider";
