import {
  AppRouterContext,
  type AppRouterInstance,
} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {
  render as rtlRender,
  type RenderOptions,
} from "@testing-library/react";
import type { ReactElement } from "react";

import { AuthProvider } from "@/providers/auth-provider";
import { QueryProvider } from "@/providers/query-provider";

const router: AppRouterInstance = {
  back() {},
  forward() {},
  push() {},
  replace() {},
  refresh() {},
  prefetch: async () => {},
};

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterContext.Provider value={router}>
      <QueryProvider>
        <AuthProvider>{children}</AuthProvider>
      </QueryProvider>
    </AppRouterContext.Provider>
  );
}

function render(ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) {
  return rtlRender(ui, { wrapper: Providers, ...options });
}

export * from "@testing-library/react";
export { render };
