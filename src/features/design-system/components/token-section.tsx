"use client";
import { useEffect, useState } from "react";
import { Section } from "./section";
function collectVariables(rules: CSSRuleList, names: Set<string>): void {
  for (const rule of Array.from(rules)) {
    if (rule instanceof CSSStyleRule) for (const name of Array.from(rule.style)) if (name.startsWith("--gr-")) names.add(name);
    if ("cssRules" in rule) collectVariables((rule as CSSGroupingRule).cssRules, names);
  }
}
export function useEffectiveTokens() {
  const [tokens, setTokens] = useState<{ name: string; value: string }[]>([]);
  useEffect(() => {
    function update() {
      const names = new Set<string>();
      for (const sheet of Array.from(document.styleSheets)) { try { collectVariables(sheet.cssRules, names); } catch { continue; } }
      const style = getComputedStyle(document.documentElement);
      setTokens(Array.from(names).sort().map((name) => ({ name, value: style.getPropertyValue(name).trim() })));
    }
    update();
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return tokens;
}
export function TokenSection() {
  const tokens = useEffectiveTokens();
  return <Section id="tokens" title="19 · Tokens efetivos" source="src/app/globals.css + tailwind.config.ts · leitura do CSS aplicado"><p className="text-sm text-graphite-600">Valores calculados no navegador. O fundo geral e o fundo de aplicativo permanecem separados.</p><div className="ds-demo-grid">{tokens.map(({ name, value }) => <div key={name} className="flex items-start gap-3 border-b border-border py-3"><span className="h-8 w-8 flex-none rounded-sm border border-border" style={{ background: name.includes("color") || /blue|graphite|bg|surface|action|ink|success|warning|danger|white|text$/.test(name) ? `var(${name})` : undefined }} /><div className="min-w-0 font-mono text-xs"><strong>{name}</strong><span className="mt-1 block text-graphite-600" data-token={name}>{value}</span></div></div>)}</div></Section>;
}
