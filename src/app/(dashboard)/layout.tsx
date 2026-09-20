import { AuthPanel } from "@/features/auth/components/auth-panel";
import type { ReactNode } from "react";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { MainContent } from "@/components/layout/main-content";
import { Topbar } from "@/components/layout/topbar";

/**
 * Casca da aplicacao: sidebar + topbar + area de conteudo. Server Component,
 * item ativo da sidebar fica no default `/hoje` (divergencia D5, sem wrapper
 * de usePathname nesta frente).
 */
function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <AuthPanel>
      <div className="flex min-h-screen bg-bg">
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <Topbar />
          <MainContent>{children}</MainContent>
        </div>
      </div>
    </AuthPanel>
  );
}

export default DashboardLayout;
