import {
  act,
  render,
  screen,
  waitFor,
  fireEvent,
} from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { beforeEach, describe, it, expect, vi } from "vitest";
import { AuthProvider, useAuth } from "./auth-provider";
import { ACCESS_TOKEN_KEY } from "@/lib/constants";
const mocks = vi.hoisted(() => ({
  replace: vi.fn(),
  getMe: vi.fn(),
  login: vi.fn(),
  logout: vi.fn(),
  logoutAll: vi.fn(),
}));
vi.mock("next/navigation", () => ({ useRouter: () => router }));
const router = { replace: mocks.replace };
vi.mock("@/features/auth/services/auth.service", () => ({
  authService: mocks,
}));
const owner = {
  id: "one",
  name: "Pessoa",
  email: "p@example.test",
  onboardingCompletedAt: null,
};
function State() {
  const auth = useAuth();
  return (
    <>
      <span>
        {auth.isLoading ? "carregando" : (auth.user?.name ?? "anônimo")}
      </span>
      <button onClick={() => void auth.logout().catch(() => {})}>sair</button>
    </>
  );
}
function setup() {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  client.setQueryData(["private"], "private");
  render(
    <QueryClientProvider client={client}>
      <AuthProvider>
        <State />
      </AuthProvider>
    </QueryClientProvider>,
  );
  return client;
}
beforeEach(() => {
  localStorage.clear();
  vi.clearAllMocks();
  mocks.getMe.mockResolvedValue(owner);
  mocks.logout.mockResolvedValue(undefined);
});
describe("AuthProvider", () => {
  it("recupera token sem cookie apenas depois de validar em me", async () => {
    localStorage.setItem(ACCESS_TOKEN_KEY, "token");
    document.cookie = `${ACCESS_TOKEN_KEY}=; max-age=0; path=/`;
    setup();
    expect(screen.getByText("carregando")).toBeInTheDocument();
    await screen.findByText("Pessoa");
    expect(mocks.getMe).toHaveBeenCalledTimes(1);
    expect(document.cookie).toContain("token");
  });
  it("falha de rede no logout preserva usuário", async () => {
    localStorage.setItem(ACCESS_TOKEN_KEY, "token");
    mocks.logout.mockRejectedValue(new Error("network"));
    setup();
    await screen.findByText("Pessoa");
    fireEvent.click(screen.getByText("sair"));
    await waitFor(() => expect(mocks.logout).toHaveBeenCalled());
    expect(screen.getByText("Pessoa")).toBeInTheDocument();
    expect(localStorage.getItem(ACCESS_TOKEN_KEY)).toBe("token");
  });
  it("401 limpa cache e navega uma vez", async () => {
    localStorage.setItem(ACCESS_TOKEN_KEY, "token");
    const client = setup();
    await screen.findByText("Pessoa");
    act(() => {
      window.dispatchEvent(new Event("gradum:session-invalid"));
      window.dispatchEvent(new Event("gradum:session-invalid"));
    });
    expect(screen.getByText("anônimo")).toBeInTheDocument();
    expect(client.getQueryData(["private"])).toBeUndefined();
    expect(mocks.replace).toHaveBeenCalledTimes(1);
  });
  it("outra aba encerra interface ao remover token", async () => {
    localStorage.setItem(ACCESS_TOKEN_KEY, "token");
    setup();
    await screen.findByText("Pessoa");
    act(() => {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      window.dispatchEvent(
        new StorageEvent("storage", { key: ACCESS_TOKEN_KEY, newValue: null }),
      );
    });
    expect(screen.getByText("anônimo")).toBeInTheDocument();
  });
  it("cookie sem token local termina no login", async () => {
    document.cookie = `${ACCESS_TOKEN_KEY}=invalid; path=/`;
    setup();
    await screen.findByText("anônimo");
    expect(document.cookie).not.toContain(ACCESS_TOKEN_KEY);
    expect(mocks.replace).toHaveBeenCalledWith("/login");
  });
  it("403 preserva usuário e cache", async () => {
    localStorage.setItem(ACCESS_TOKEN_KEY, "token");
    const client = setup();
    await screen.findByText("Pessoa");
    act(() => window.dispatchEvent(new Event("gradum:permission-denied")));
    expect(screen.getByText("Pessoa")).toBeInTheDocument();
    expect(client.getQueryData(["private"])).toBe("private");
    expect(localStorage.getItem(ACCESS_TOKEN_KEY)).toBe("token");
  });
});
