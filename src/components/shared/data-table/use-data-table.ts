"use client";

import { useMemo, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { MAX_PAGE_SIZE } from "@/lib/constants";
import type { ApiResponse, PaginationMeta } from "@/types/api.types";
import type { SortOrder } from "@/types/common.types";

import type { DataTableDescriptor } from "./types";

function clampLimit(limit: number): number {
  return Math.min(Math.max(1, limit), MAX_PAGE_SIZE);
}

interface UseDataTableParams<T> {
  queryKey: unknown[];
  endpoint: string;
  descriptor: DataTableDescriptor<T>;
  defaultLimit?: number;
  localData?: { rows: T[]; state?: "ready" | "loading" | "error" };
}

interface UseDataTableResult<T> {
  rows: T[];
  pagination: PaginationMeta | undefined;
  isLoading: boolean;
  isError: boolean;
  page: number;
  setPage: (page: number) => void;
  limit: number;
  setLimit: (limit: number) => void;
  search: string;
  setSearch: (search: string) => void;
  sortBy: string | undefined;
  sortOrder: SortOrder;
  toggleSort: (key: string) => void;
  filters: Record<string, string>;
  setFilter: (key: string, value: string | undefined) => void;
}

export function useDataTable<T>({
  queryKey,
  endpoint,
  descriptor,
  defaultLimit = 20,
  localData,
}: UseDataTableParams<T>): UseDataTableResult<T> {
  const [page, setPageState] = useState(1);
  const [limit, setLimitState] = useState(() => clampLimit(defaultLimit));
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<string | undefined>(undefined);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [filters, setFilters] = useState<Record<string, string>>({});

  function setPage(next: number): void {
    setPageState(Math.max(1, next));
  }

  function setLimit(next: number): void {
    setLimitState(clampLimit(next));
  }

  function toggleSort(key: string): void {
    if (sortBy !== key) {
      setSortBy(key);
      setSortOrder("asc");
      return;
    }
    setSortOrder((current) => (current === "asc" ? "desc" : "asc"));
  }

  function setFilter(key: string, value: string | undefined): void {
    setFilters((current) => {
      const next = { ...current };
      if (value) {
        next[key] = value;
      } else {
        delete next[key];
      }
      return next;
    });
  }

  const params = useMemo(() => {
    const query: Record<string, string | number> = { page, limit };
    if (descriptor.searchable && search) {
      query.search = search;
    }
    if (sortBy) {
      query.sortBy = sortBy;
      query.sortOrder = sortOrder;
    }
    for (const [key, value] of Object.entries(filters)) {
      query[`filter[${key}]`] = value;
    }
    return query;
  }, [page, limit, search, sortBy, sortOrder, filters, descriptor.searchable]);

  const { data, isLoading, isError } = useQuery({
    queryKey: [...queryKey, params],
    enabled: localData === undefined,
    queryFn: async () => {
      const { api, unwrapList } = await import("@/lib/api");
      const response = await api.get<ApiResponse<T[]>>(endpoint, { params });
      return unwrapList(response);
    },
    placeholderData: keepPreviousData,
  });

  const localRows = localData?.rows.filter((row) => Object.entries(filters).every(([key, value]) => String((row as Record<string, unknown>)[key]) === value));
  if (localRows && sortBy) localRows.sort((left, right) => String((left as Record<string, unknown>)[sortBy]).localeCompare(String((right as Record<string, unknown>)[sortBy])) * (sortOrder === "asc" ? 1 : -1));
  const totalPages = Math.max(1, Math.ceil((localRows?.length ?? 0) / limit));
  return {
    rows: localRows ? localRows.slice((page - 1) * limit, page * limit) : data?.items ?? [],
    pagination: localRows ? { page, limit, total: localRows.length, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } : data?.pagination,
    isLoading: localData ? localData.state === "loading" : isLoading,
    isError: localData ? localData.state === "error" : isError,
    page,
    setPage,
    limit,
    setLimit,
    search,
    setSearch,
    sortBy,
    sortOrder,
    toggleSort,
    filters,
    setFilter,
  };
}
