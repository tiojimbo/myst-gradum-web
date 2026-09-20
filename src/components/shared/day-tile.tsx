import { cn } from "@/lib/utils";
export function DayTile({ day, date, state = "empty" }: { day: string; date: string; state?: "empty" | "done" | "planned" | "review" }) {
  return <div className={cn("flex min-w-0 flex-col items-center gap-2 rounded-[14px] border border-border px-1 py-3 text-xs sm:p-3 sm:text-sm", state === "planned" && "border-blue-200 bg-blue-50")}><span className="text-overline text-graphite-600">{day}</span><strong className="font-mono">{date}</strong><span aria-label={state} className={state === "done" ? "text-success" : "text-blue-600"}>{state === "done" ? "✓" : state === "review" ? "↻" : state === "planned" ? "●" : "·"}</span></div>;
}
