// @vitest-environment node
import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";

import { middleware } from "@/middleware";

function makeRequest(pathname: string, cookie?: string) {
  const url = `https://gradum.test${pathname}`;
  const headers = cookie ? { cookie: `auth_access_token=${cookie}` } : undefined;

  return new NextRequest(url, { headers });
}

describe("middleware", () => {
  it("redireciona rota privada sem cookie para /login com callbackUrl", () => {
    const response = middleware(makeRequest("/"));

    expect(response.status).toBe(307);
    expect(new URL(response.headers.get("location")!).pathname).toBe("/login");
    expect(new URL(response.headers.get("location")!).searchParams.get("callbackUrl")).toBe("/");
  });

  it("preserva caminho aninhado no callbackUrl", () => {
    const response = middleware(makeRequest("/plano/fase-1"));

    const location = new URL(response.headers.get("location")!);

    expect(location.pathname).toBe("/login");
    expect(location.searchParams.get("callbackUrl")).toBe("/plano/fase-1");
  });

  it("deixa passar rota privada com cookie", () => {
    const response = middleware(makeRequest("/", "token-valido"));

    expect(response.status).toBe(200);
    expect(response.headers.get("location")).toBeNull();
  });

  it("deixa passar /login sem cookie", () => {
    const response = middleware(makeRequest("/login"));

    expect(response.status).toBe(200);
    expect(response.headers.get("location")).toBeNull();
  });

  it("redireciona /login com cookie para a raiz", () => {
    const response = middleware(makeRequest("/login", "token-valido"));

    expect(response.status).toBe(307);
    expect(new URL(response.headers.get("location")!).pathname).toBe("/");
  });
});
