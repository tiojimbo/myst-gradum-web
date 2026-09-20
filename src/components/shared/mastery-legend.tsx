export function MasteryLegend({ items }: { items: { label: string; value: string; color: string }[] }) {
  return <ul className="space-y-3">{items.map((item) => <li key={item.label} className="flex items-center gap-3 text-sm"><span className="h-3 w-3 shrink-0 rounded-full" style={{ background: item.color }} /><span className="flex-1 whitespace-nowrap">{item.label}</span><span className="font-mono text-xs text-graphite-600">{item.value}</span></li>)}</ul>;
}
