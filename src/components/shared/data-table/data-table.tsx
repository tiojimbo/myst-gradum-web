"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@/components/ui/icon";
import { EmptyState } from "@/components/shared/empty-state";
import { cn } from "@/lib/utils";

import { useDataTable } from "./use-data-table";
import type { DataTableDescriptor } from "./types";

interface DataTableProps<T> {
  queryKey: unknown[];
  endpoint: string;
  descriptor: DataTableDescriptor<T>;
  defaultLimit?: number;
  getRowId?: (row: T, index: number) => string | number;
}

export function DataTable<T>({
  queryKey,
  endpoint,
  descriptor,
  defaultLimit,
  getRowId = (_row, index) => index,
}: DataTableProps<T>) {
  const {
    rows,
    pagination,
    isLoading,
    isError,
    page,
    setPage,
    sortBy,
    sortOrder,
    toggleSort,
    filters,
    setFilter,
  } = useDataTable<T>({ queryKey, endpoint, descriptor, defaultLimit });

  const hasActions = Boolean(descriptor.actions && descriptor.actions.length > 0);

  return (
    <div className="flex flex-col gap-4">
      {descriptor.filters && descriptor.filters.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {descriptor.filters.map((filter) => (
            <label key={filter.key} className="flex flex-col gap-1 text-sm text-graphite-600">
              {filter.label}
              <select
                className="rounded-md border border-graphite-300 bg-surface px-3 py-2 text-sm text-graphite-900"
                value={filters[filter.key] ?? ""}
                onChange={(event) => setFilter(filter.key, event.target.value || undefined)}
              >
                <option value="">Todos</option>
                {filter.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>
      )}

      {isLoading ? (
        <p className="py-8 text-center text-sm text-graphite-500">Carregando...</p>
      ) : isError ? (
        <p className="py-8 text-center text-sm text-danger">
          Não foi possível carregar os dados.
        </p>
      ) : rows.length === 0 ? (
        <EmptyState
          title={descriptor.emptyState?.title ?? "Nada por aqui"}
          description={descriptor.emptyState?.description ?? "Nenhum resultado encontrado."}
          icon={descriptor.emptyState?.icon}
        />
      ) : (
        <>
          <div className="overflow-hidden rounded-xl border border-border bg-surface">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border">
                  {descriptor.columns.map((column) => (
                    <th
                      key={column.key}
                      className={cn(
                        "px-4 py-3 font-semibold text-graphite-600",
                        column.align === "right" ? "text-right" : "text-left",
                      )}
                    >
                      {column.sortable ? (
                        <button
                          type="button"
                          className="inline-flex items-center gap-1"
                          onClick={() => toggleSort(column.key)}
                        >
                          {column.header}
                          {sortBy === column.key && (
                            <Icon
                              name={sortOrder === "asc" ? "arrow-up" : "arrow-down"}
                              size="inline"
                            />
                          )}
                        </button>
                      ) : (
                        column.header
                      )}
                    </th>
                  ))}
                  {hasActions && <th className="px-4 py-3" aria-label="Ações" />}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={getRowId(row, index)} className="border-b border-border last:border-0">
                    {descriptor.columns.map((column) => (
                      <td
                        key={column.key}
                        className={cn(
                          "px-4 py-3 text-graphite-800",
                          column.align === "right" ? "text-right" : "text-left",
                        )}
                      >
                        {column.render
                          ? column.render(row)
                          : String((row as Record<string, unknown>)[column.key] ?? "")}
                      </td>
                    ))}
                    {hasActions && (
                      <td className="px-4 py-3 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger
                            aria-label="Abrir ações"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-graphite-500 hover:bg-graphite-100"
                          >
                            <Icon name="more-2" size="inline" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {descriptor.actions?.map((action) => (
                              <DropdownMenuItem
                                key={action.label}
                                onSelect={() => action.onSelect(row)}
                                className={action.destructive ? "text-danger" : undefined}
                              >
                                {action.icon && <Icon name={action.icon} size="inline" />}
                                {action.label}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {pagination && (
            <div className="flex items-center justify-between text-sm text-graphite-600">
              <span>
                Página {pagination.page} de {pagination.totalPages}
              </span>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  disabled={!pagination.hasPreviousPage}
                  onClick={() => setPage(page - 1)}
                >
                  Anterior
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  disabled={!pagination.hasNextPage}
                  onClick={() => setPage(page + 1)}
                >
                  Próxima
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
