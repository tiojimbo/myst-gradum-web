import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CreateApiKeyDialog } from "./create-api-key-dialog";
vi.mock("../hooks/use-api-keys", () => ({
  useApiKeys: () => ({
    isPending: false,
    create: async () => ({ key: "pk_secret" }),
  }),
}));
describe("CreateApiKeyDialog", () => {
  it("exibe e copia uma vez, limpa ao fechar", async () => {
    const copy = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: copy },
      configurable: true,
    });
    const onOpenChange = vi.fn();
    render(<CreateApiKeyDialog open onOpenChange={onOpenChange} />);
    fireEvent.change(screen.getByLabelText("Nome"), {
      target: { value: "Companion" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Criar chave" }));
    await screen.findByText("pk_secret");
    fireEvent.click(screen.getByText("Copiar chave"));
    expect(copy).toHaveBeenCalledWith("pk_secret");
    fireEvent.click(screen.getByRole("button", { name: "Fechar" }));
    expect(screen.queryByText("pk_secret")).not.toBeInTheDocument();
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
