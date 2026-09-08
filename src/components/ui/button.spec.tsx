import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Button, buttonVariants } from "@/components/ui/button";

afterEach(() => {
  cleanup();
});

describe("Button", () => {
  it("renderiza o texto filho", () => {
    render(<Button>Continuar</Button>);

    expect(
      screen.getByRole("button", { name: "Continuar" }),
    ).toBeInTheDocument();
  });

  it("aplica as classes de variant e size emitidas por buttonVariants", () => {
    render(
      <Button variant="secondary" size="sm">
        Ação
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Ação" });
    const expectedClasses = buttonVariants({ variant: "secondary", size: "sm" })
      .split(" ")
      .filter(Boolean);

    for (const className of expectedClasses) {
      expect(button.className).toContain(className);
    }
    expect(button.className).not.toContain("bg-action");
  });

  it("bloqueia o onClick quando disabled", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <Button disabled onClick={onClick}>
        Desabilitado
      </Button>,
    );

    await user.click(screen.getByRole("button", { name: "Desabilitado" }));

    expect(onClick).not.toHaveBeenCalled();
  });

  it("renderiza o filho no lugar do button quando asChild", () => {
    render(
      <Button asChild>
        <a href="/destino">Ir</a>
      </Button>,
    );

    const link = screen.getByRole("link", { name: "Ir" });

    expect(link.tagName).toBe("A");
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
