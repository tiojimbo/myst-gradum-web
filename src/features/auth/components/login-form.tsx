"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "../hooks/use-login";
import { loginSchema, type LoginInput } from "../schemas/login.schema";
export function LoginForm() {
  const { submit, isPending, error, success } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });
  return (
    <section className="w-full max-w-[420px] rounded-2xl border border-border bg-surface p-8 shadow-sm">
      <h1 className="text-2xl font-bold tracking-tight">Entre no Gradum</h1>
      <p className="mt-2 text-sm text-graphite-500">
        Continue seu caminho até o domínio.
      </p>
      <form
        className="mt-6 space-y-5"
        onSubmit={handleSubmit(submit)}
        noValidate
      >
        <div>
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            autoComplete="username"
            {...register("email")}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p role="alert" className="mt-1 text-sm text-danger">
              {errors.email.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            {...register("password")}
            aria-invalid={!!errors.password}
          />
          {errors.password && (
            <p role="alert" className="mt-1 text-sm text-danger">
              {errors.password.message}
            </p>
          )}
        </div>
        {error && (
          <p role="alert" className="text-sm text-danger">
            {error}
          </p>
        )}
        {success && (
          <p role="status" className="text-sm text-success">
            Tudo certo. Abrindo seu painel…
          </p>
        )}
        <Button
          type="submit"
          className="w-full"
          disabled={isPending || success}
        >
          {isPending ? "Entrando…" : "Entrar"}
        </Button>
      </form>
    </section>
  );
}
