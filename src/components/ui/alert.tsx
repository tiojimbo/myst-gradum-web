import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

type AlertTone = "info" | "success" | "warning" | "danger";

const TONE: Record<AlertTone, { wrapper: string; icon: string; name: string }> = {
  info: { wrapper: "bg-blue-50 text-blue-700", icon: "text-blue-600", name: "information" },
  success: { wrapper: "bg-[#E4F5EC] text-[#1F7A51]", icon: "text-success", name: "check-double" },
  warning: { wrapper: "bg-[#FBF1DC] text-[#8A6414]", icon: "text-warning", name: "time" },
  danger: { wrapper: "bg-[#FBE7E6] text-[#A83B37]", icon: "text-danger", name: "error-warning" },
};

interface AlertProps {
  tone?: AlertTone;
  title: string;
  description?: string;
  className?: string;
}

export function Alert({ tone = "info", title, description, className }: AlertProps) {
  const config = TONE[tone];

  return (
    <div
      role="status"
      className={cn("flex items-start gap-3 rounded-lg px-4 py-3", config.wrapper, className)}
    >
      <Icon name={config.name} className={cn("mt-[2px] flex-none", config.icon)} />
      <div className="flex flex-col gap-1">
        <strong className="text-[15px] font-semibold">{title}</strong>
        {description && <span className="text-sm opacity-80">{description}</span>}
      </div>
    </div>
  );
}

export type { AlertProps, AlertTone };
