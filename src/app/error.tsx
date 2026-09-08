"use client";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-bg px-5">
      <Alert
        tone="danger"
        title="Algo deu errado"
        description="Não conseguimos carregar esta página. Tente novamente."
      />
      <Button variant="secondary" onClick={reset}>
        Tentar novamente
      </Button>
    </div>
  );
}

export default ErrorPage;
