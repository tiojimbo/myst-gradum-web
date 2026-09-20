import { GradumMark } from "@/components/shared/companion-sidebar";
export function GradumLogo({ tone = "light", size = 40 }: { tone?: "light" | "dark"; size?: number }) {
  return <span className="inline-flex items-center font-bold tracking-[-0.03em]" style={{ gap: size * .4, fontSize: size * .7, color: tone === "dark" ? "var(--gr-white)" : "var(--gr-text)" }}><GradumMark size={size} tone={tone} />Gradum</span>;
}
