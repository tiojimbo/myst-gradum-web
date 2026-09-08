import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { render, screen, waitFor } from "@/test/render";
import { api } from "@/lib/api";
import { MAX_PAGE_SIZE } from "@/lib/constants";
import type { PaginationMeta } from "@/types/api.types";

import { DataTable } from "./data-table";
import type { DataTableDescriptor } from "./types";

vi.mock("@/lib/api", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/api")>();
  return { ...actual, api: { get: vi.fn() } };
});

interface Row {
  id: string;
  name: string;
  status: string;
}

const descriptor: DataTableDescriptor<Row> = {
  columns: [
    { key: "name", header: "Nome", sortable: true },
    { key: "status", header: "Status" },
  ],
  filters: [
    {
      key: "status",
      label: "Status",
      options: [
        { label: "Ativo", value: "active" },
        { label: "Inativo", value: "inactive" },
      ],
    },
  ],
  emptyState: { title: "Sem registros", description: "Nada encontrado por aqui." },
};

const ROWS: Row[] = [
  { id: "1", name: "Ana", status: "active" },
  { id: "2", name: "Bruno", status: "inactive" },
];

function pagination(overrides: Partial<PaginationMeta> = {}): PaginationMeta {
  return {
    total: 2,
    page: 1,
    limit: 20,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false,
    ...overrides,
  };
}

function mockList(items: Row[], meta: PaginationMeta) {
  vi.mocked(api.get).mockResolvedValue({
    data: {
      data: items,
      meta: { timestamp: "2026-09-08T00:00:00.000Z", requestId: "req-1", pagination: meta },
    },
  });
}

function lastParams(): Record<string, unknown> {
  const calls = vi.mocked(api.get).mock.calls;
  const lastCall = calls[calls.length - 1];
  return (lastCall[1] as { params: Record<string, unknown> }).params;
}

beforeEach(() => {
  vi.mocked(api.get).mockReset();
});

describe("DataTable", () => {
  it("renderiza exatamente as colunas declaradas, na ordem declarada", async () => {
    mockList(ROWS, pagination());

    render(<DataTable queryKey={["rows"]} endpoint="/rows" descriptor={descriptor} />);

    const headers = await screen.findAllByRole("columnheader");
    expect(headers.map((header) => header.textContent)).toEqual(["Nome", "Status"]);
  });

  it("pedir limit acima do teto emite o teto (MAX_PAGE_SIZE) na query", async () => {
    mockList(ROWS, pagination({ total: 300, limit: 300, totalPages: 15 }));

    render(
      <DataTable
        queryKey={["rows"]}
        endpoint="/rows"
        descriptor={descriptor}
        defaultLimit={MAX_PAGE_SIZE + 150}
      />,
    );

    await screen.findAllByRole("columnheader");
    expect(lastParams().limit).toBe(MAX_PAGE_SIZE);
  });

  it("ordenar por uma coluna sortable emite sortBy e alterna sortOrder", async () => {
    mockList(ROWS, pagination());
    const user = userEvent.setup();

    render(<DataTable queryKey={["rows"]} endpoint="/rows" descriptor={descriptor} />);

    const nameHeader = await screen.findByRole("button", { name: /Nome/ });
    const callsBefore = () => vi.mocked(api.get).mock.calls.length;

    const firstCallCount = callsBefore();
    await user.click(nameHeader);
    await waitFor(() => expect(callsBefore()).toBeGreaterThan(firstCallCount));
    expect(lastParams().sortBy).toBe("name");
    expect(lastParams().sortOrder).toBe("asc");

    const secondCallCount = callsBefore();
    await user.click(nameHeader);
    await waitFor(() => expect(callsBefore()).toBeGreaterThan(secondCallCount));
    expect(lastParams().sortOrder).toBe("desc");
  });

  it("acionar um filtro declarado emite filter[<key>]=<valor>", async () => {
    mockList(ROWS, pagination());
    const user = userEvent.setup();

    render(<DataTable queryKey={["rows"]} endpoint="/rows" descriptor={descriptor} />);

    await screen.findAllByRole("columnheader");
    await user.selectOptions(screen.getByLabelText("Status"), "active");

    expect(lastParams()["filter[status]"]).toBe("active");
  });

  it("fonte sem resultado renderiza o EmptyState, não uma tabela vazia", async () => {
    mockList([], pagination({ total: 0, totalPages: 0 }));

    render(<DataTable queryKey={["rows"]} endpoint="/rows" descriptor={descriptor} />);

    expect(await screen.findByText("Sem registros")).toBeInTheDocument();
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });

  it("page e totalPages exibidos vêm de meta.pagination, não de contagem no cliente", async () => {
    mockList(ROWS, pagination({ page: 2, totalPages: 5, hasPreviousPage: true, hasNextPage: true }));

    render(<DataTable queryKey={["rows"]} endpoint="/rows" descriptor={descriptor} />);

    expect(await screen.findByText("Página 2 de 5")).toBeInTheDocument();
  });
});
