/// <reference types="vite/client" />
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve, join } from "node:path";
import { describe, expect, it, vi, beforeAll, afterAll } from "vitest";
import { render, screen, fireEvent, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Showcase } from "./components/showcase";
import { LoginDemo } from "./components/login-demo";
import { EditorDemo, SessionDemo, TableDemo } from "./components/product-section";
import { PrimitivesSection } from "./components/primitives-section";
import { CompositionsSection } from "./components/compositions-section";
import { SOURCE_FILES, SOURCE_COMPONENTS, SECTIONS } from "./data/inventory";
beforeAll(() => {
  vi.stubGlobal("ResizeObserver", class { observe() {} unobserve() {} disconnect() {} });
  vi.stubGlobal("matchMedia", () => ({ matches: false, addEventListener() {}, removeEventListener() {} }));
});
afterAll(() => vi.unstubAllGlobals());
function renderDemo(node: React.ReactNode) {
  return render(<QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>{node}</QueryClientProvider>);
}
describe("F0.4: demonstrações reais", () => {
  it("mantém rota fora do layout autenticado e inventário sem entradas duplicadas", () => {
    expect(existsSync(resolve("src/app/design-system/page.tsx"))).toBe(true);
    expect(new Set(SOURCE_FILES).size).toBe(196);
    expect(SOURCE_COMPONENTS).toHaveLength(74);
    expect(SECTIONS).toHaveLength(24);
  });
  it("valida login e conclui somente estado local", async () => {
    const user = userEvent.setup();
    const request = vi.spyOn(globalThis, "fetch");
    renderDemo(<LoginDemo />);
    await user.click(screen.getByRole("button", { name: "Entrar" }));
    expect(await screen.findByText("Informe um e-mail válido.")).toBeInTheDocument();
    await user.type(screen.getByLabelText("E-mail"), "demo@example.com");
    await user.type(screen.getByLabelText("Senha"), "exemplo");
    await user.click(screen.getByRole("button", { name: "Entrar" }));
    expect(await screen.findByText(/Nenhum dado foi enviado/)).toBeInTheDocument();
    expect(request).not.toHaveBeenCalled();
    request.mockRestore();
  });
  it("edita nota e alterna estado real dos comandos sem persistência", async () => {
    const user = userEvent.setup();
    const persist = vi.spyOn(Storage.prototype, "setItem");
    renderDemo(<EditorDemo />);
    await user.click(screen.getByRole("button", { name: "Negrito" }));
    expect(screen.getByRole("button", { name: "Negrito" })).toHaveAttribute("aria-pressed", "true");
    const body = screen.getByRole("textbox", { name: "Conteúdo da nota" });
    expect(body.querySelector("strong")).toHaveTextContent("Gamut");
    expect(body.querySelector("em")).toHaveTextContent("gamma");
    expect(body.querySelectorAll("li")).toHaveLength(2);
    expect(body.querySelector("blockquote")).toBeInTheDocument();
    expect(screen.getAllByRole("separator")).toHaveLength(3);
    fireEvent.input(body, { target: { textContent: "Nota local" } });
    expect(body).toHaveTextContent("Nota local");
    expect(screen.getByText("Alterado localmente")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Gerar flashcard demonstrativo" }));
    expect(screen.getByText("Flashcard demonstrativo solicitado localmente")).toBeInTheDocument();
    expect(persist).not.toHaveBeenCalled();
    persist.mockRestore();
  });
  it("tabela local pagina e demonstra erro/vazio sem API", async () => {
    const user = userEvent.setup();
    const request = vi.spyOn(globalThis, "fetch");
    renderDemo(<TableDemo />);
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByText("Filmmaking Academy")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Próxima" }));
    expect(screen.getByText("Shutter Speed")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Tabela com erro" }));
    expect(screen.getByText("Não foi possível carregar os dados.")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Tabela vazia" }));
    expect(screen.getByText("Nenhum material demonstrativo")).toBeInTheDocument();
    expect(request).not.toHaveBeenCalled();
    request.mockRestore();
  });
  it("diálogo contém campo real e retorna foco ao fechar pelo teclado", async () => {
    const user = userEvent.setup();
    renderDemo(<PrimitivesSection />);
    const trigger = screen.getByRole("button", { name: "Abrir diálogo" });
    await user.click(trigger);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByLabelText("Campo no diálogo")).toHaveFocus();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
  it("percorre as sete atividades antes do resumo da sessão", async () => {
    const user = userEvent.setup();
    renderDemo(<SessionDemo />);
    for (let index = 0; index < 6; index++) await user.click(screen.getByRole("button", { name: "Próxima atividade" }));
    expect(screen.getByText("Dois conceitos antigos ligados a esta sessão")).toBeInTheDocument();
    expect(screen.queryByText("Sessão concluída · exemplo")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Concluir sessão demonstrativa" }));
    expect(screen.getByText("Sessão concluída · exemplo")).toBeInTheDocument();
  });
  it("detalhe do plano tem abas próprias e calendário somente desktop", async () => {
    const user = userEvent.setup();
    renderDemo(<CompositionsSection />);
    const desktop = screen.getByRole("group", { name: "Escolher composição desktop" });
    await user.click(within(desktop).getByRole("button", { name: "Detalhe do plano" }));
    expect(screen.getByRole("tab", { name: "Calendário" })).toBeInTheDocument();
  });

  it("confirmação e busca móvel devolvem foco ao disparador em Escape", async () => {
    const user = userEvent.setup();
    renderDemo(<><PrimitivesSection /><CompositionsSection /></>);
    for (const name of ["Abrir confirmação", "Buscar no modelo móvel"]) {
      const trigger = screen.getByRole("button", { name });
      await user.click(trigger);
      expect(screen.getByRole("dialog")).toBeVisible();
      await user.keyboard("{Escape}");
      await waitFor(() => expect(trigger).toHaveFocus());
    }
  });
  it("monta todos os exports visuais reais e seus estados condicionais na vitrine", async () => {
    const modules = import.meta.glob<Record<string, unknown>>(["/src/components/{ui,shared,layout}/**/*.tsx", "!**/*.spec.tsx"], { eager: true });
    const exports = Object.values(modules).flatMap((module) => Object.entries(module)).filter(([name, value]) => /^[A-Z]/.test(name) && (typeof value === "function" || (typeof value === "object" && value !== null && "$$typeof" in value)));
    expect(exports).toHaveLength(87);
    const observed = new Set<string>();
    type MountedFiber = { type?: unknown; elementType?: unknown; return?: MountedFiber | null };
    function collectMounted() {
      for (const element of Array.from(document.querySelectorAll("*"))) {
        const key = Object.keys(element).find((name) => name.startsWith("__reactFiber$"));
        if (!key) continue;
        let fiber: MountedFiber | null | undefined = (element as unknown as Record<string, MountedFiber>)[key];
        while (fiber) {
          for (const [name, component] of exports) if (fiber.type === component || fiber.elementType === component) observed.add(name);
          fiber = fiber.return;
        }
      }
    }
    const user = userEvent.setup();
    renderDemo(<Showcase />);
    collectMounted();
    for (const name of ["Abrir diálogo", "Abrir confirmação", "Abrir menu", "Buscar no modelo móvel"]) {
      await user.click(screen.getByRole("button", { name }));
      collectMounted();
      await user.keyboard("{Escape}");
    }
    const session = document.getElementById("sessao")!;
    for (let index = 0; index < 6; index++) {
      await user.click(within(session).getByRole("button", { name: "Próxima atividade" }));
      collectMounted();
      if (index === 3 || index === 4) {
        const answer = within(session).getByLabelText("Resposta demonstrativa");
        expect(answer).toHaveClass("bg-graphite-800", "text-white");
        await user.clear(answer);
        await user.type(answer, "Resposta local");
        expect(answer).toHaveValue("Resposta local");
      }
    }
    await user.click(within(session).getByRole("button", { name: "Concluir sessão demonstrativa" }));
    collectMounted();
    const onboarding = document.getElementById("onboarding")!;
    await user.click(within(onboarding).getAllByRole("button", { name: "Selecionar material demonstrativo" })[0]);
    collectMounted();
    expect(Array.from(new Set(exports.map(([name]) => name))).filter((name) => !observed.has(name))).toEqual([]);
  });

  it("percorre aula compacta e marca atividade concluída no roteiro", async () => {
    const user = userEvent.setup();
    renderDemo(<SessionDemo />);
    await user.click(screen.getByRole("button", { name: "Próxima atividade" }));
    const completed = screen.getByText("Preview").closest("li");
    expect(completed?.querySelector(".bg-success .ri-check-line")).toBeInTheDocument();
    expect(screen.getByText("FAW School · Aula 13")).toBeVisible();
    await user.click(screen.getByRole("button", { name: "Abrir recurso" }));
    expect(screen.getByText("Abertura de recurso simulada.")).toBeVisible();
    expect(screen.getByText("O Companion acompanha esta aula e mantém a mesma sessão.")).toBeVisible();
  });
  it("biblioteca pesquisa e apresenta importação local; Companion conserva três cards", async () => {
    const user = userEvent.setup();
    renderDemo(<CompositionsSection />);
    const desktop = document.getElementById("composicoes")!;
    await user.click(within(desktop).getByRole("button", { name: "Biblioteca" }));
    await user.type(within(desktop).getByRole("textbox", { name: "Buscar materiais demonstrativos" }), "sem resultado");
    expect(within(desktop).queryByText("Adobe Learn")).not.toBeInTheDocument();
    await user.click(within(desktop).getByRole("button", { name: "Adicionar material" }));
    expect(within(desktop).getByRole("button", { name: "Selecionar material demonstrativo" })).toBeVisible();
    const mobile = document.getElementById("mobile")!;
    await user.click(within(within(mobile).getByRole("group", { name: "Escolher composição móvel" })).getByRole("button", { name: "Plano" }));
    expect(within(mobile).getByText("Fase 2 de 6 · 8h/semana")).toBeVisible();
    expect(within(mobile).getByText("61%")).toBeVisible();
    expect(within(mobile).queryByText("Novo plano · demonstração")).not.toBeInTheDocument();
    expect(within(mobile).queryByText("Divisão do seu tempo · 12h por semana")).not.toBeInTheDocument();
    const companion = document.getElementById("companion")!;
    for (const name of ["O que o Companion captura","O que ele nunca vira","Contexto da nota"]) expect(within(companion).getByRole("heading", { name })).toBeVisible();
  });
  it("todas as fontes tipadas existem no pacote usado nesta worktree", () => {
    const source = resolve("../../../Gradum Design System (1)");
    for (const file of SOURCE_FILES) expect(existsSync(join(source, file)), file).toBe(true);
  });
  it("não importa runtime do pacote nem persiste demos", () => {
    function walk(path: string): string[] {
      return readdirSync(path, { withFileTypes: true }).flatMap((entry) => entry.isDirectory() ? walk(join(path, entry.name)) : [join(path, entry.name)]);
    }
    const files = walk(resolve("src/features/design-system")).filter((file) => !file.includes(".spec."));
    for (const file of files) {
      const source = readFileSync(file, "utf8");
      expect(source).not.toMatch(/localStorage|sessionStorage|axios|<iframe|dangerouslySetInnerHTML/);
      expect(source).not.toMatch(/import.*_ds_bundle/);
    }
  });
});
