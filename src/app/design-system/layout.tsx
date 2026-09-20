import type { Metadata } from "next";
import type { ReactNode } from "react";
export const metadata: Metadata = { title: "Design system · Gradum", description: "Vitrine pública de componentes e estados demonstrativos." };
export default function DesignSystemLayout({ children }: { children: ReactNode }) {
  return children;
}
