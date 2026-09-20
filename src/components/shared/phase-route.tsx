import { PhaseCard, type PhaseCardProps } from "@/components/shared/phase-card";
export function PhaseRoute({ phases }: { phases: PhaseCardProps[] }) {
  return <div className="space-y-3">{phases.map((phase) => <PhaseCard key={phase.index} {...phase} />)}</div>;
}
