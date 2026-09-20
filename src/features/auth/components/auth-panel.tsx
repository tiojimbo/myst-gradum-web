"use client";
import { useAuth } from "@/providers/auth-provider";
import { Button } from "@/components/ui/button";
export function AuthPanel({ children }: { children: React.ReactNode }) {
  const { isLoading, isAuthenticated, error, getMe } = useAuth();
  if (isLoading)
    return (
      <p role="status" className="p-8 text-sm text-graphite-500">
        Validando sessão…
      </p>
    );
  if (!isAuthenticated)
    return (
      <div className="p-8">
        <p role="alert">{error ?? "Entre para continuar."}</p>
        {error && (
          <Button onClick={() => void getMe()}>Tentar novamente</Button>
        )}
      </div>
    );
  return (
    <>
      {error && (
        <p role="alert" className="p-4 text-danger">
          {error}
        </p>
      )}
      {children}
    </>
  );
}
