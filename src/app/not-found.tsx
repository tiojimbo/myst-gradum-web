import Link from "next/link";

import { EmptyState } from "@/components/shared/empty-state";
import { SITE } from "@/config/site";

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-bg px-5">
      <EmptyState
        icon="question"
        title="Página não encontrada"
        description="O endereço não existe ou ainda não foi construído."
      />
      <Link
        href={SITE.homePath}
        className="text-sm font-semibold text-action hover:text-action-hover"
      >
        Voltar para o início
      </Link>
    </div>
  );
}

export default NotFound;
