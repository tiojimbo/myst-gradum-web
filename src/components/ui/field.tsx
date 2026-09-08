import { cn } from "@/lib/utils";

type FieldTone = "neutral" | "focus" | "error" | "disabled";

const HELPER_TONE: Record<FieldTone, string> = {
  neutral: "text-graphite-500",
  focus: "text-blue-600",
  error: "text-danger",
  disabled: "text-graphite-400",
};

interface FieldProps {
  label: string;
  htmlFor?: string;
  helper?: string;
  tone?: FieldTone;
  children: React.ReactNode;
  className?: string;
}

export function Field({
  label,
  htmlFor,
  helper,
  tone = "neutral",
  children,
  className,
}: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor={htmlFor}
        className={cn(
          "text-[13px] font-semibold",
          tone === "disabled" ? "text-graphite-400" : "text-graphite-700",
        )}
      >
        {label}
      </label>
      {children}
      {helper && <span className={cn("text-[12px]", HELPER_TONE[tone])}>{helper}</span>}
    </div>
  );
}

export type { FieldProps, FieldTone };
