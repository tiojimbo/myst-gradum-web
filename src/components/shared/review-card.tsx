import { Button } from "@/components/ui/button";

interface ReviewItem {
  label: string;
  count: number;
}

interface ReviewCardProps {
  title?: string;
  estimate: string;
  items: ReviewItem[];
  actionLabel?: string;
}

/**
 * Secao 22 da especificacao: a fila reune varios formatos, por isso a area se
 * chama Revisar e nunca Flashcards.
 */
export function ReviewCard({
  title = "Revisões de hoje",
  estimate,
  items,
  actionLabel = "Revisar agora",
}: ReviewCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-blue-100 bg-blue-50 p-5">
      <div className="flex items-baseline justify-between">
        <strong className="text-[17px] font-bold">{title}</strong>
        <span className="font-mono text-[13px] text-graphite-600">{estimate}</span>
      </div>

      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <div key={item.label} className="flex justify-between text-sm text-graphite-700">
            <span>{item.label}</span>
            <span className="font-mono text-graphite-500">{item.count}</span>
          </div>
        ))}
      </div>

      <Button variant="tonal" className="w-full">
        {actionLabel}
      </Button>
    </div>
  );
}

export type { ReviewCardProps, ReviewItem };
