import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
interface Lesson { title: string; duration: string; state: "concluida" | "atual" | "bloqueada" }
export function LessonList({ lessons }: { lessons: Lesson[] }) {
  return <ul className="divide-y divide-border">{lessons.map((lesson) => <li key={lesson.title} className={cn("flex items-center gap-3 rounded-md p-4 text-sm", lesson.state === "atual" && "bg-blue-50", lesson.state === "bloqueada" && "text-graphite-500")}><Icon name={lesson.state === "concluida" ? "checkbox-circle" : lesson.state === "bloqueada" ? "lock" : "play-circle"} className={lesson.state === "concluida" ? "text-success" : "text-blue-600"} /><span className="flex-1">{lesson.title}<span className="block text-xs text-graphite-600">{lesson.state}</span></span><span className="font-mono">{lesson.duration}</span></li>)}</ul>;
}
