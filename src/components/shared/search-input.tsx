"use client";

import { useEffect, useRef, useState } from "react";

import { Icon } from "@/components/ui/icon";
import { Input, type InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchInputProps extends Omit<InputProps, "value" | "onChange" | "type"> {
  value?: string;
  onSearch: (value: string) => void;
  debounceMs?: number;
}

export function SearchInput({
  value = "",
  onSearch,
  debounceMs = 300,
  className,
  ...props
}: SearchInputProps) {
  const [term, setTerm] = useState(value);
  const onSearchRef = useRef(onSearch);
  onSearchRef.current = onSearch;

  useEffect(() => {
    const timer = setTimeout(() => onSearchRef.current(term), debounceMs);
    return () => clearTimeout(timer);
  }, [term, debounceMs]);

  return (
    <div className="relative">
      <Icon
        name="search"
        size="control"
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-graphite-400"
      />
      <Input
        type="search"
        value={term}
        onChange={(event) => setTerm(event.target.value)}
        className={cn("pl-11", className)}
        {...props}
      />
    </div>
  );
}

export type { SearchInputProps };
