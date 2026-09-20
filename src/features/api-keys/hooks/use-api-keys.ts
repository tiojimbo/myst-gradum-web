"use client";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { apiKeysService } from "../services/api-keys.service";
export function useApiKeys() {
  const client = useQueryClient();
  const [isPending, setPending] = useState(false);
  async function create(input: { name: string }) {
    setPending(true);
    try {
      const result = await apiKeysService.create(input);
      await client.invalidateQueries({ queryKey: ["api-keys"] });
      return result;
    } finally {
      setPending(false);
    }
  }
  async function revoke(id: string) {
    setPending(true);
    try {
      await apiKeysService.revoke(id);
      await client.invalidateQueries({ queryKey: ["api-keys"] });
    } finally {
      setPending(false);
    }
  }
  return { create, revoke, isPending };
}
