import { EmptyState } from "@/components/shared/empty-state";

/**
 * Responde em `/`, herdando a casca de `(dashboard)/layout.tsx`. Nenhuma
 * tela de produto nasce nesta frente (R2): so o Empty State.
 */
function DashboardPage() {
  return (
    <EmptyState
      title="Ainda não há nenhuma tela de produto aqui"
      description="Esta é a fundação da aplicação. Hoje, Plano, Biblioteca, Revisar e Progresso chegam nas próximas frentes."
    />
  );
}

export default DashboardPage;
