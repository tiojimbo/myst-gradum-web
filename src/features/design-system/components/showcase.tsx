import { FoundationsSection } from "./foundations-section";
import { PrimitivesSection } from "./primitives-section";
import { ProductSection } from "./product-section";
import { CompositionsSection } from "./compositions-section";
import { TokenSection } from "./token-section";
import { SECTIONS, SOURCE_FILES, SOURCE_COMPONENTS } from "../data/inventory";
export function Showcase() {
  return <div className="ds-showcase mx-auto max-w-[1320px] px-4 py-7 md:px-7"><header className="mb-7 space-y-4"><p className="text-overline font-bold uppercase tracking-[.2em] text-blue-700">Gradum · referência visual</p><h1 className="text-h1 font-bold tracking-[-.03em]">Design system</h1><p className="max-w-[720px] text-body text-graphite-600">Componentes reais, estados e composições. Todos os dados e ações desta página são demonstrativos e ficam apenas nesta visita.</p><p className="font-mono text-xs text-graphite-600">{SOURCE_FILES.length} arquivos de referência · {SOURCE_COMPONENTS.length} componentes visuais no pacote</p></header><nav aria-label="Índice do design system" className="mb-7 grid gap-2 rounded-xl border border-border bg-surface p-5 sm:grid-cols-2 md:grid-cols-3">{SECTIONS.map((section) => <a key={section.id} href={`#${section.id}`} className="flex items-center rounded-md px-3 py-2 text-sm text-graphite-700 hover:bg-blue-50 focus-visible:shadow-focus">{section.title}</a>)}</nav><FoundationsSection /><PrimitivesSection /><ProductSection /><CompositionsSection /><TokenSection /></div>;
}
