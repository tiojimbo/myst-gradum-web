"use client";

import { useMemo, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { api, unwrapList } from "@/lib/api";
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
    queryFn: async () => {
      const response = await api.get<ApiResponse<T[]>>(endpoint, { params });
      return unwrapList(response);
    },
    placeholderData: keepPreviousData,
  });

  return {
    rows: data?.items ?? [],
    pagination: data?.pagination,
    isLoading,
    isError,
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
