/**
 * Secao 15 da especificacao e secao 11 do design system.
 * Cinco destinos e nada alem deles. Semana e Calendario sao views de Plano,
 * Flashcards e parte de Revisar. Adicionar um sexto item aqui quebra a regra.
 */
export const MAIN_NAVIGATION = [
  { href: "/hoje", label: "Hoje", icon: "sun", question: "O que eu faço agora?" },
  { href: "/plano", label: "Plano", icon: "route", question: "Qual é o caminho?" },
  { href: "/biblioteca", label: "Biblioteca", icon: "book-open", question: "O que eu tenho?" },
  { href: "/revisar", label: "Revisar", icon: "refresh", question: "O que preciso recuperar?" },
  { href: "/progresso", label: "Progresso", icon: "bar-chart-2", question: "Estou ficando melhor?" },
] as const;

/** Experiencias que existem fora da sidebar, secao 15 da especificacao. */
export const OUTSIDE_NAVIGATION = [
  "Onboarding",
  "Project Builder",
  "Detalhe de projeto",
  "Detalhe de fase",
  "Detalhe de curso",
  "Sessão de Estudo",
  "Gradum Companion",
  "Busca global",
  "Gerenciar projetos",
] as const;

export type NavigationItem = (typeof MAIN_NAVIGATION)[number];
