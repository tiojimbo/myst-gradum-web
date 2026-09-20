"use client";
import { useState } from "react";
import { DataTable } from "@/components/shared/data-table/data-table";
import type { DataTableDescriptor } from "@/components/shared/data-table/types";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { Button } from "@/components/ui/button";
import { useApiKeys } from "../hooks/use-api-keys";
import type { ApiKey } from "../types/api-key.types";
import { CreateApiKeyDialog } from "./create-api-key-dialog";
export function ApiKeysTable() {
  const [createOpen, setCreateOpen] = useState(false);
  const [selected, setSelected] = useState<ApiKey | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { revoke, isPending } = useApiKeys();
  const descriptor: DataTableDescriptor<ApiKey> = {
    columns: [
      { key: "name", header: "Nome" },
      {
        key: "keySuffix",
        header: "Final",
        render: (key) => `…${key.keySuffix}`,
      },
      {
        key: "createdAt",
        header: "Criada em",
        render: (key) => new Date(key.createdAt).toLocaleDateString("pt-BR"),
      },
      {
        key: "revokedAt",
        header: "Estado",
        render: (key) => (key.revokedAt ? "Revogada" : "Ativa"),
      },
    ],
    actions: [{ label: "Revogar", destructive: true, onSelect: setSelected }],
    emptyState: {
      title: "Nenhuma chave criada",
      description: "Crie uma chave quando precisar conectar uma integração.",
    },
  };
  async function confirm() {
    if (!selected) return;
    setError(null);
    try {
      await revoke(selected.id);
      setSelected(null);
    } catch (cause) {
      setError(
        cause instanceof Error && cause.message === "Sem permissão"
          ? cause.message
          : "Não foi possível revogar a chave.",
      );
    }
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Chaves de API</h1>
        <Button onClick={() => setCreateOpen(true)}>Criar chave</Button>
      </div>
      {error && (
        <p role="alert" className="text-danger">
          {error}
        </p>
      )}
      <DataTable<ApiKey>
        queryKey={["api-keys"]}
        endpoint="/api-keys"
        descriptor={descriptor}
        getRowId={(key) => key.id}
      />
      {createOpen && <CreateApiKeyDialog open onOpenChange={setCreateOpen} />}
      <ConfirmDialog
        open={!!selected}
        onOpenChange={(open) => {
          if (!open && !isPending) setSelected(null);
        }}
        title="Revogar chave?"
        description={`A integração que usa ${selected?.name ?? "esta chave"} perderá o acesso.`}
        confirmLabel="Revogar"
        onConfirm={() => void confirm()}
        isLoading={isPending}
        destructive
      />
    </div>
  );
}
