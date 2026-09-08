# Graph Report - myst-gradum-web  (2026-09-08)

## Corpus Check
- Corpus is ~9,814 words - fits in a single context window. You may not need a graph.

## Summary
- 399 nodes · 691 edges · 16 communities (14 shown, 2 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 6 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Data Table e Cliente HTTP
- Primitivos Radix e UI Compartilhada
- Metadados e Scripts do Pacote
- Chips e Cards de Conteudo
- Dashboard, Busca e Menus
- Dependencias de Producao
- Providers e Layout Raiz
- Botao, Alerta e Setup de Teste
- Shell de Navegacao e Sidebars
- Opcoes do Compilador TypeScript
- Progresso, Fase e Competencia
- Dependencias de Desenvolvimento
- Middleware de Rota e Site
- Configuracao do ESLint
- Configuracao do Next
- Configuracao do PostCSS

## God Nodes (most connected - your core abstractions)
1. `cn()` - 58 edges
2. `react` - 22 edges
3. `Icon()` - 18 edges
4. `compilerOptions` - 15 edges
5. `Button` - 11 edges
6. `useDataTable()` - 9 edges
7. `scripts` - 7 edges
8. `DataTable()` - 7 edges
9. `vitest` - 6 edges
10. `DataTableDescriptor` - 6 edges

## Surprising Connections (you probably didn't know these)
- `CompetencyRow()` --calls--> `cn()`  [EXTRACTED]
  src/components/shared/competency-row.tsx → src/lib/utils.ts
- `PhaseCard()` --calls--> `cn()`  [EXTRACTED]
  src/components/shared/phase-card.tsx → src/lib/utils.ts
- `DropdownMenuLabel` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/dropdown-menu.tsx → src/lib/utils.ts
- `Stepper()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/progress.tsx → src/lib/utils.ts
- `AppSidebar()` --calls--> `cn()`  [EXTRACTED]
  src/components/layout/app-sidebar.tsx → src/lib/utils.ts

## Import Cycles
- None detected.

## Communities (16 total, 2 thin omitted)

### Community 0 - "Data Table e Cliente HTTP"
Cohesion: 0.06
Nodes (46): axios, @testing-library/user-event, DataTable(), DataTableProps, descriptor, Row, ROWS, DataTableAction (+38 more)

### Community 1 - "Primitivos Radix e UI Compartilhada"
Cohesion: 0.06
Nodes (42): clsx, @radix-ui/react-checkbox, @radix-ui/react-label, @radix-ui/react-radio-group, @radix-ui/react-slider, @radix-ui/react-switch, @radix-ui/react-tabs, react (+34 more)

### Community 2 - "Metadados e Scripts do Pacote"
Cohesion: 0.05
Nodes (36): name, private, scripts, build, dev, lint, start, test (+28 more)

### Community 3 - "Chips e Cards de Conteudo"
Cohesion: 0.06
Nodes (27): class-variance-authority, CONFIDENCE, ConfidenceLevel, ProjectChip(), ProjectStatus, SourceBadge(), STATUS_LABEL, STATUS_TONE (+19 more)

### Community 4 - "Dashboard, Busca e Menus"
Cohesion: 0.13
Nodes (19): Project, ProjectSelector(), ProjectSelectorProps, TopbarProps, CommandSearch(), CommandSearchGroup, CommandSearchProps, EmptyState() (+11 more)

### Community 5 - "Dependencias de Producao"
Cohesion: 0.08
Nodes (25): dependencies, axios, class-variance-authority, clsx, @hookform/resolvers, next, @radix-ui/react-checkbox, @radix-ui/react-dialog (+17 more)

### Community 6 - "Providers e Layout Raiz"
Cohesion: 0.13
Nodes (16): next, @tanstack/react-query, @tanstack/react-query-devtools, jetBrainsMono, metadata, plusJakartaSans, makeQueryClient(), getAccessToken() (+8 more)

### Community 7 - "Botao, Alerta e Setup de Teste"
Cohesion: 0.13
Nodes (13): @radix-ui/react-slot, @testing-library/react, vitest, ErrorPageProps, ReviewCardProps, ReviewItem, Alert(), AlertProps (+5 more)

### Community 8 - "Shell de Navegacao e Sidebars"
Cohesion: 0.12
Nodes (11): AppSidebar(), AppSidebarProps, MainContent(), MainContentProps, Topbar(), CompanionNote, CompanionSidebarProps, GradumMark() (+3 more)

### Community 9 - "Opcoes do Compilador TypeScript"
Cohesion: 0.11
Nodes (17): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+9 more)

### Community 10 - "Progresso, Fase e Competencia"
Cohesion: 0.14
Nodes (11): CompetencyRow(), CompetencyRowProps, MasteryDeltaProps, FocusHeaderProps, PhaseCard(), PhaseCardProps, PhaseState, Progress() (+3 more)

### Community 11 - "Dependencias de Desenvolvimento"
Cohesion: 0.12
Nodes (16): devDependencies, autoprefixer, eslint, eslint-config-next, jsdom, postcss, tailwindcss, @testing-library/jest-dom (+8 more)

### Community 12 - "Middleware de Rota e Site"
Cohesion: 0.24
Nodes (5): SITE, AUTH_ROUTES, config, middleware(), PUBLIC_ROUTES

### Community 13 - "Configuracao do ESLint"
Cohesion: 0.29
Nodes (6): extends, rules, no-console, @typescript-eslint/no-explicit-any, next/core-web-vitals, next/typescript

## Knowledge Gaps
- **169 isolated node(s):** `next/core-web-vitals`, `next/typescript`, `no-console`, `@typescript-eslint/no-explicit-any`, `nextConfig` (+164 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 202 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `Primitivos Radix e UI Compartilhada` to `Data Table e Cliente HTTP`, `Metadados e Scripts do Pacote`, `Dashboard, Busca e Menus`, `Providers e Layout Raiz`, `Botao, Alerta e Setup de Teste`, `Shell de Navegacao e Sidebars`?**
  _High betweenness centrality (0.205) - this node is a cross-community bridge._
- **Why does `cn()` connect `Primitivos Radix e UI Compartilhada` to `Data Table e Cliente HTTP`, `Chips e Cards de Conteudo`, `Dashboard, Busca e Menus`, `Botao, Alerta e Setup de Teste`, `Shell de Navegacao e Sidebars`, `Progresso, Fase e Competencia`?**
  _High betweenness centrality (0.160) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Dependencias de Producao` to `Metadados e Scripts do Pacote`?**
  _High betweenness centrality (0.108) - this node is a cross-community bridge._
- **What connects `next/core-web-vitals`, `next/typescript`, `no-console` to the rest of the system?**
  _169 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Data Table e Cliente HTTP` be split into smaller, more focused modules?**
  _Cohesion score 0.059907834101382486 - nodes in this community are weakly interconnected._
- **Should `Primitivos Radix e UI Compartilhada` be split into smaller, more focused modules?**
  _Cohesion score 0.06291591046581972 - nodes in this community are weakly interconnected._
- **Should `Metadados e Scripts do Pacote` be split into smaller, more focused modules?**
  _Cohesion score 0.04878048780487805 - nodes in this community are weakly interconnected._