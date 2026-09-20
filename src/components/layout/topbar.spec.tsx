import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Topbar } from "./topbar";
vi.mock("@/providers/auth-provider", () => ({
  useAuth: () => ({
    user: { name: "Samuel" },
    logout: vi.fn(),
    logoutAll: vi.fn(),
  }),
}));
describe("Topbar", () => {
  it("mostra menu da conta autenticada", () => {
    render(<Topbar />);
    expect(
      screen.getByRole("button", { name: "Menu da conta" }),
    ).toHaveTextContent("Samuel");
  });
});
