import type { ReactNode } from "react";

export interface DataTableColumn<T> {
  key: string;
  header: string;
  sortable?: boolean;
  align?: "left" | "right";
  render?: (row: T) => ReactNode;
}

export interface DataTableAction<T> {
  label: string;
  icon?: string;
  destructive?: boolean;
  onSelect: (row: T) => void;
}

export interface DataTableFilter {
  key: string;
  label: string;
  options: { label: string; value: string }[];
}

export interface DataTableDescriptor<T> {
  columns: DataTableColumn<T>[];
  actions?: DataTableAction<T>[];
  filters?: DataTableFilter[];
  searchable?: boolean;
  emptyState?: { title: string; description: string; icon?: string };
}
