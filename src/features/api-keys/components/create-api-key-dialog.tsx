"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useApiKeys } from "../hooks/use-api-keys";
import {
  createApiKeySchema,
  type CreateApiKeyInput,
} from "../schemas/create-api-key.schema";
export function CreateApiKeyDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [secret, setSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const { create, isPending } = useApiKeys();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateApiKeyInput>({
    resolver: zodResolver(createApiKeySchema),
    defaultValues: { name: "" },
  });
  function close(next: boolean) {
    if (isPending) return;
    if (!next) {
      setSecret(null);
      setCopied(false);
    }
    onOpenChange(next);
  }
  async function submit(input: CreateApiKeyInput) {
    setError(null);
    try {
      setSecret((await create(input)).key);
    } catch (cause) {
      setError(
        cause instanceof Error && cause.message === "Sem permissão"
          ? cause.message
          : "Não foi possível criar a chave.",
      );
    }
  }
  async function copy() {
    if (!secret) return;
    try {
      await navigator.clipboard.writeText(secret);
      setCopied(true);
    } catch {
      setError(
        "Não foi possível copiar. Selecione a chave e copie manualmente.",
      );
    }
  }
  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {secret ? "Guarde sua chave" : "Criar chave de API"}
          </DialogTitle>
          <DialogDescription>
            {secret
              ? "Esta é a única exibição da chave completa. Copie e guarde antes de fechar."
              : "Escolha um nome para identificar a integração."}
          </DialogDescription>
        </DialogHeader>
        {secret ? (
          <div className="space-y-4">
            <code
              className="block break-all rounded-md bg-bg p-3 text-sm"
              aria-label="Chave criada"
            >
              {secret}
            </code>
            <Button onClick={() => void copy()}>
              {copied ? "Copiada" : "Copiar chave"}
            </Button>
            <Button variant="secondary" onClick={() => close(false)}>
              Fechar
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(submit)} className="space-y-4">
            <Label htmlFor="key-name">Nome</Label>
            <Input id="key-name" {...register("name")} />
            {errors.name && <p role="alert">{errors.name.message}</p>}
            <Button type="submit" disabled={isPending}>
              {isPending ? "Criando…" : "Criar chave"}
            </Button>
          </form>
        )}
        {error && (
          <p role="alert" className="text-sm text-danger">
            {error}
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
