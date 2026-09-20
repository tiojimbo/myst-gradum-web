"use client";
import { useState, useId } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { GradumLogo } from "@/components/shared/gradum-logo";
const schema = z.object({ email: z.string().email("Informe um e-mail válido."), password: z.string().min(1, "Informe sua senha.") });
export function LoginDemo({ compact = false }: { compact?: boolean }) {
  const id = useId();
  const [state, setState] = useState<"idle" | "loading" | "error" | "success">("idle");
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema), defaultValues: { email: "", password: "" } });
  return <div className={compact ? "overflow-hidden rounded-[24px] border border-border bg-surface" : "overflow-hidden rounded-[24px] border border-border bg-surface md:grid md:grid-cols-2"}><div className={compact ? "hidden" : "hidden space-y-6 bg-graphite-900 p-6 text-white md:block"}><GradumLogo tone="dark" /><h3 className="text-h1 font-bold">Your path<br />to mastery</h3><p className="text-sm text-graphite-300">Variante de marca fornecida na referência.</p></div><div className="space-y-5 p-5"><div className={compact ? "" : "md:hidden"}><GradumLogo /></div><h3 className="text-h3 font-bold">Entre no Gradum</h3><p className="text-sm text-graphite-600">Continue seu caminho até o domínio.</p><form noValidate className="space-y-4" onSubmit={handleSubmit(() => setState("success"))}><div><Label htmlFor={id + "-email"}>E-mail</Label><Input id={id + "-email"} type="email" autoComplete="off" {...register("email")} invalid={!!errors.email} />{errors.email && <p role="alert" className="text-sm text-danger">{errors.email.message}</p>}</div><div><Label htmlFor={id + "-password"}>Senha</Label><Input id={id + "-password"} type="password" autoComplete="off" {...register("password")} invalid={!!errors.password} />{errors.password && <p role="alert" className="text-sm text-danger">{errors.password.message}</p>}</div>{state === "error" && <p role="alert" className="text-sm text-danger">E-mail ou senha incorretos. Exemplo demonstrativo.</p>}{state === "success" && <p role="status" className="text-sm text-success">Demonstração concluída. Nenhum dado foi enviado.</p>}<Button type="submit" className="w-full" disabled={state === "loading"}>{state === "loading" ? "Entrando…" : "Entrar"}</Button></form><div className="flex flex-wrap gap-2">{(["idle", "loading", "error", "success"] as const).map((value) => <Button key={value} variant="ghost" size="sm" onClick={() => setState(value)}>{({ idle: "Normal", loading: "Carregando", error: "Erro", success: "Sucesso" })[value]}</Button>)}</div><p className="text-xs text-graphite-600">Demonstração do contrato F0.3. Apenas e-mail e senha; estados locais.</p></div></div>;
}
