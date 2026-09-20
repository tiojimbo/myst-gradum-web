import { renderHook, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, it, expect, vi } from "vitest";
import { useApiKeys } from "./use-api-keys";
vi.mock("../services/api-keys.service", () => ({
  apiKeysService: {
    create: async () => ({ key: "pk_secret", apiKey: { id: "key" } }),
  },
}));
describe("useApiKeys", () => {
  it("segredo não entra em cache de consulta ou mutação", async () => {
    const client = new QueryClient();
    const { result } = renderHook(() => useApiKeys(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
      ),
    });
    await act(async () => {
      expect((await result.current.create({ name: "Teste" })).key).toBe(
        "pk_secret",
      );
    });
    expect(client.getMutationCache().getAll()).toHaveLength(0);
    expect(JSON.stringify(client.getQueryCache().getAll())).not.toContain(
      "pk_secret",
    );
  });
});
