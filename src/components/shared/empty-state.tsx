import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
  actionLabel?: string;
}

export function EmptyState({
  icon = "inbox",
  title,
  description,
  actionLabel,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border border-dashed border-graphite-300 bg-surface p-[28px] text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-graphite-100 text-graphite-500">
        <Icon name={icon} size="feature" />
      </div>
      <div className="flex flex-col gap-2">
        <strong className="text-[18px] font-bold">{title}</strong>
        <p className="max-w-md text-sm leading-relaxed text-graphite-600">{description}</p>
      </div>
      {actionLabel && <Button variant="secondary">{actionLabel}</Button>}
    </div>
  );
}

export type { EmptyStateProps };
