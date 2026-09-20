"use client";
import { useState } from "react";
import { useAuth } from "@/providers/auth-provider";
import type { LoginInput } from "../schemas/login.schema";
export function useLogin() {
  const { login } = useAuth();
  const [isPending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  async function submit(input: LoginInput) {
    setPending(true);
    setError(null);
    try {
      await login(input);
      setSuccess(true);
    } catch {
      setError(
        "Não foi possível entrar. Confira seu e-mail e senha e tente novamente.",
      );
    } finally {
      setPending(false);
    }
  }
  return { submit, isPending, error, success };
}
