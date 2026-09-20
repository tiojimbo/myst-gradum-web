import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { LoginForm } from "./login-form";
const login = vi.hoisted(() => vi.fn());
vi.mock("@/providers/auth-provider", () => ({ useAuth: () => ({ login }) }));
beforeEach(() => {
  login.mockReset();
});
function fill() {
  fireEvent.change(screen.getByLabelText("E-mail"), {
    target: { value: "p@example.test" },
  });
  fireEvent.change(screen.getByLabelText("Senha"), {
    target: { value: "senha1234" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Entrar" }));
}
describe("LoginForm", () => {
  it("valida campos", async () => {
    render(<LoginForm />);
    fireEvent.click(screen.getByRole("button", { name: "Entrar" }));
    expect(
      await screen.findByText("Informe um e-mail válido"),
    ).toBeInTheDocument();
    expect(login).not.toHaveBeenCalled();
  });
  it("mostra erro sem cadastro ou renovação", async () => {
    login.mockRejectedValue(new Error("401"));
    render(<LoginForm />);
    fill();
    expect(
      await screen.findByText(/Não foi possível entrar/),
    ).toBeInTheDocument();
    expect(screen.queryByText(/cadastro|refresh/i)).not.toBeInTheDocument();
  });
  it("mostra carregando e sucesso", async () => {
    let finish!: () => void;
    login.mockReturnValue(
      new Promise<void>((resolve) => {
        finish = resolve;
      }),
    );
    render(<LoginForm />);
    fill();
    await screen.findByText("Entrando…");
    finish();
    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent("Tudo certo"),
    );
  });
});
