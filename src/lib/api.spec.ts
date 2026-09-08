import type { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { api, authClient, unwrap, unwrapList } from "@/lib/api";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/lib/constants";
import type { ApiResponse, PaginationMeta } from "@/types/api.types";
import type { AuthPayload, User } from "@/types/auth.types";

const USER: User = {
  id: "u1",
  name: "Ana",
  email: "ana@gradum.dev",
  role: "student",
};

function envelope<T>(data: T): ApiResponse<T> {
  return { data, meta: { timestamp: "2026-09-08T00:00:00.000Z", requestId: "req-1" } };
}

function okResponse(
  config: InternalAxiosRequestConfig,
  data: unknown,
): Promise<AxiosResponse> {
  return Promise.resolve({ data, status: 200, statusText: "OK", headers: {}, config });
}

function errorResponse(
  config: InternalAxiosRequestConfig,
  status: number,
): Promise<AxiosResponse> {
  return Promise.reject({
    config,
    isAxiosError: true,
    message: `Request failed with status code ${status}`,
    response: {
      config,
      data: { statusCode: status, message: "Unauthorized", error: "Unauthorized", timestamp: "", path: config.url ?? "" },
      headers: {},
      status,
      statusText: "Unauthorized",
    },
  });
}

function refreshPayload(): AuthPayload {
  return { accessToken: "new-access", refreshToken: "new-refresh", user: USER };
}

beforeEach(() => {
  localStorage.clear();
  document.cookie = `${ACCESS_TOKEN_KEY}=; path=/; max-age=0`;
  Object.defineProperty(window, "location", {
    value: { href: "" },
    writable: true,
  });
});

describe("api", () => {
  it("cenário 1: renova a sessão expirada com o envelope e refaz a chamada original", async () => {
    localStorage.setItem(REFRESH_TOKEN_KEY, "old-refresh");

    const authAdapter = vi.fn((config: InternalAxiosRequestConfig) =>
      okResponse(config, envelope(refreshPayload())),
    );
    authClient.defaults.adapter = authAdapter;

    const apiAdapter = vi.fn((config: InternalAxiosRequestConfig) => {
      if (config.headers?.Authorization === "Bearer new-access") {
        return okResponse(config, { ok: true });
      }
      return errorResponse(config, 401);
    });
    api.defaults.adapter = apiAdapter;

    const response = await api.get("/progress");

    expect(response.data).toEqual({ ok: true });
    expect(authAdapter).toHaveBeenCalledTimes(1);
    expect(localStorage.getItem(ACCESS_TOKEN_KEY)).toBe("new-access");
    expect(localStorage.getItem(REFRESH_TOKEN_KEY)).toBe("new-refresh");
  });

  it("cenário 2: enfileira chamadas concorrentes e dispara uma renovação só", async () => {
    localStorage.setItem(REFRESH_TOKEN_KEY, "old-refresh");

    const authAdapter = vi.fn((config: InternalAxiosRequestConfig) =>
      okResponse(config, envelope(refreshPayload())),
    );
    authClient.defaults.adapter = authAdapter;

    const apiAdapter = vi.fn((config: InternalAxiosRequestConfig) => {
      if (config.headers?.Authorization === "Bearer new-access") {
        return okResponse(config, { url: config.url });
      }
      return errorResponse(config, 401);
    });
    api.defaults.adapter = apiAdapter;

    const [first, second] = await Promise.all([api.get("/a"), api.get("/b")]);

    expect(authAdapter).toHaveBeenCalledTimes(1);
    expect(first.data).toEqual({ url: "/a" });
    expect(second.data).toEqual({ url: "/b" });
  });

  it("cenário 3: falha na renovação limpa a sessão, redireciona uma vez e não tenta de novo", async () => {
    localStorage.setItem(ACCESS_TOKEN_KEY, "old-access");
    localStorage.setItem(REFRESH_TOKEN_KEY, "old-refresh");
    document.cookie = `${ACCESS_TOKEN_KEY}=old-access; path=/`;

    const authAdapter = vi.fn((config: InternalAxiosRequestConfig) => errorResponse(config, 401));
    authClient.defaults.adapter = authAdapter;

    const apiAdapter = vi.fn((config: InternalAxiosRequestConfig) => errorResponse(config, 401));
    api.defaults.adapter = apiAdapter;

    await expect(api.get("/progress")).rejects.toBeTruthy();

    expect(authAdapter).toHaveBeenCalledTimes(1);
    expect(localStorage.getItem(ACCESS_TOKEN_KEY)).toBeNull();
    expect(localStorage.getItem(REFRESH_TOKEN_KEY)).toBeNull();
    expect(document.cookie).not.toContain(ACCESS_TOKEN_KEY);
    expect(window.location.href).toBe("/login");
  });

  it("cenário 4: chamada de autenticação com 401 não dispara renovação", async () => {
    const authAdapter = vi.fn();
    authClient.defaults.adapter = authAdapter;

    const apiAdapter = vi.fn((config: InternalAxiosRequestConfig) => errorResponse(config, 401));
    api.defaults.adapter = apiAdapter;

    await expect(api.post("/auth/login", { email: "a@a.com" })).rejects.toBeTruthy();

    expect(authAdapter).not.toHaveBeenCalled();
    expect(apiAdapter).toHaveBeenCalledTimes(1);
  });

  it("cenário 5: injeta Authorization quando há token e omite quando não há", async () => {
    const apiAdapter = vi.fn((config: InternalAxiosRequestConfig) =>
      okResponse(config, { received: config.headers?.Authorization ?? null }),
    );
    api.defaults.adapter = apiAdapter;

    const withoutToken = await api.get("/public");
    expect(withoutToken.data).toEqual({ received: null });

    localStorage.setItem(ACCESS_TOKEN_KEY, "my-token");
    const withToken = await api.get("/public");
    expect(withToken.data).toEqual({ received: "Bearer my-token" });
  });

  it("cenário 6: unwrap e unwrapList devolvem o dado sem o envelope vazar", () => {
    const config = {} as InternalAxiosRequestConfig;

    const singleResponse = {
      config,
      data: envelope({ id: "1" }),
      headers: {},
      status: 200,
      statusText: "OK",
    } as AxiosResponse<ApiResponse<{ id: string }>>;

    expect(unwrap(singleResponse)).toEqual({ id: "1" });

    const pagination: PaginationMeta = {
      total: 1,
      page: 1,
      limit: 20,
      totalPages: 1,
      hasNextPage: false,
      hasPreviousPage: false,
    };
    const listResponse = {
      config,
      data: { data: [{ id: "1" }], meta: { timestamp: "", requestId: "r", pagination } },
      headers: {},
      status: 200,
      statusText: "OK",
    } as AxiosResponse<ApiResponse<{ id: string }[]>>;

    expect(unwrapList(listResponse)).toEqual({ items: [{ id: "1" }], pagination });
  });
});
