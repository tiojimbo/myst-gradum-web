import { Alert } from "@/components/ui/alert";
export function FeedbackPanel({ verdict = "parcial", title, points = [] }: { verdict?: "correto" | "parcial" | "incorreto"; title: string; points?: string[] }) {
  return <Alert tone={verdict === "correto" ? "success" : verdict === "incorreto" ? "danger" : "warning"} title={title} description={points.join(" ")} className="p-5" />;
}
