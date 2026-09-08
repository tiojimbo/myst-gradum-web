import type { ReactNode } from "react";

import { GradumMark } from "@/components/shared/companion-sidebar";

/**
 * Layout centralizado, sem sidebar e sem topbar. Nasce sem pagina dentro:
 * /login e /register sao F0.3.
 */
function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-bg px-5 py-8">
      <div className="flex items-center gap-2">
        <GradumMark size={32} />
        <strong className="text-[19px] tracking-[-0.02em]">Gradum</strong>
      </div>
      {children}
    </div>
  );
}

export default AuthLayout;
