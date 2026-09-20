import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, it, expect, vi } from "vitest";

import { Topbar } from "./topbar";

const authMocks = vi.hoisted(() => ({
  available: true,
  logout: vi.fn(),
  logoutAll: vi.fn(),
}));

vi.mock("@/providers/auth-provider", () => ({
  useAuth: () => {
    if (!authMocks.available) {
      throw new Error("useAuth deve ser usado dentro de um <AuthProvider>.");
    }

    return {
      user: { name: "Samuel" },
      logout: authMocks.logout,
      logoutAll: authMocks.logoutAll,
    };
  },
}));

describe("Topbar", () => {
  beforeEach(() => {
    authMocks.available = true;
    authMocks.logout.mockReset();
    authMocks.logoutAll.mockReset();
  });

  it("preserva a busca global ao integrar a conta autenticada", async () => {
    const user = userEvent.setup();

    render(
      <Topbar
        searchGroups={[
          {
            label: "Projetos",
            results: [
              { title: "Aprender TypeScript" },
              { title: "Dominar React" },
            ],
          },
        ]}
      />,
    );

    expect(
      screen.getByRole("button", { name: "Menu da conta" }),
    ).toHaveTextContent("Samuel");

    await user.click(screen.getByRole("button", { name: /buscar em tudo/i }));
    await user.type(screen.getByRole("textbox", { name: "Buscar em tudo" }), "React");

    expect(screen.getByText("Dominar React")).toBeInTheDocument();
    expect(screen.queryByText("Aprender TypeScript")).not.toBeInTheDocument();

    await user.keyboard("{Escape}");
    await user.click(screen.getByRole("button", { name: "Menu da conta" }));
    await user.click(screen.getByRole("menuitem", { name: "Sair" }));

    expect(authMocks.logout).toHaveBeenCalledOnce();
  });

  it("exige o contexto de autenticação no modo padrão", () => {
    authMocks.available = false;
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);
    const preventWindowError = (event: ErrorEvent) => event.preventDefault();
    window.addEventListener("error", preventWindowError);

    try {
      expect(() => render(<Topbar />)).toThrow(
        "useAuth deve ser usado dentro de um <AuthProvider>.",
      );
    } finally {
      window.removeEventListener("error", preventWindowError);
      consoleError.mockRestore();
    }
  });

  it("renderiza o modo demonstrativo sem contexto ou menu da conta", () => {
    authMocks.available = false;

    render(<Topbar mode="demonstration" />);

    expect(
      screen.getByRole("button", { name: /buscar em tudo/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Menu da conta" }),
    ).not.toBeInTheDocument();
  });
});
