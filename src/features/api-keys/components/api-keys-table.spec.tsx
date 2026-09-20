import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ApiKeysTable } from "./api-keys-table";
const revoke = vi.hoisted(() => vi.fn().mockResolvedValue(undefined));
vi.mock("../hooks/use-api-keys", () => ({
  useApiKeys: () => ({ revoke, isPending: false }),
}));
vi.mock("@/components/shared/data-table/data-table", () => ({
  DataTable: ({
    descriptor,
  }: {
    descriptor: {
      actions: { onSelect: (key: { id: string; name: string }) => void }[];
    };
  }) => (
    <button
      onClick={() =>
        descriptor.actions[0].onSelect({ id: "key", name: "Integração" })
      }
    >
      Selecionar chave
    </button>
  ),
}));
describe("ApiKeysTable", () => {
  it("revoga só depois da confirmação", async () => {
    render(<ApiKeysTable />);
    fireEvent.click(screen.getByText("Selecionar chave"));
    expect(revoke).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "Revogar" }));
    await waitFor(() => expect(revoke).toHaveBeenCalledWith("key"));
  });
});
