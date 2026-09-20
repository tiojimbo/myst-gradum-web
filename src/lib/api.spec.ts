import type { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { api, authClient, unwrap, unwrapList } from "@/lib/api";
import { ACCESS_TOKEN_KEY } from "@/lib/constants";
import type { ApiResponse, PaginationMeta } from "@/types/api.types";
function envelope<T>(data: T): ApiResponse<T> {
  return { data, meta: { timestamp: "", requestId: "r" } };
}
function okResponse(
  config: InternalAxiosRequestConfig,
  data: unknown,
): Promise<AxiosResponse> {
  return Promise.resolve({
    data,
    status: 200,
    statusText: "OK",
    headers: {},
    config,
  });
}
function errorResponse(
  config: InternalAxiosRequestConfig,
  status: number,
): Promise<AxiosResponse> {
  return Promise.reject({ config, message: "failed", response: { status } });
}
beforeEach(() => {
  localStorage.clear();
});
describe("api", () => {
  it("401 em me limpa sessão sem refresh", async () => {
    localStorage.setItem(ACCESS_TOKEN_KEY, "token");
    const event = vi.fn();
    window.addEventListener("gradum:session-invalid", event);
    const refresh = vi.fn();
    authClient.defaults.adapter = refresh;
    api.defaults.adapter = (config) => errorResponse(config, 401);
    await expect(api.get("/auth/me")).rejects.toBeTruthy();
    expect(localStorage.getItem(ACCESS_TOKEN_KEY)).toBeNull();
    expect(event).toHaveBeenCalledTimes(1);
    expect(refresh).not.toHaveBeenCalled();
    window.removeEventListener("gradum:session-invalid", event);
  });
  it("403 preserva sessão e mostra Sem permissão", async () => {
    localStorage.setItem(ACCESS_TOKEN_KEY, "token");
    api.defaults.adapter = (config) => errorResponse(config, 403);
    await expect(api.get("/api-keys")).rejects.toMatchObject({
      message: "Sem permissão",
    });
    expect(localStorage.getItem(ACCESS_TOKEN_KEY)).toBe("token");
  });
  it("401 no login fica no formulário", async () => {
    localStorage.setItem(ACCESS_TOKEN_KEY, "token");
    authClient.defaults.adapter = (config) => errorResponse(config, 401);
    await expect(authClient.post("/auth/login")).rejects.toBeTruthy();
    expect(localStorage.getItem(ACCESS_TOKEN_KEY)).toBe("token");
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
      data: {
        data: [{ id: "1" }],
        meta: { timestamp: "", requestId: "r", pagination },
      },
      headers: {},
      status: 200,
      statusText: "OK",
    } as AxiosResponse<ApiResponse<{ id: string }[]>>;

    expect(unwrapList(listResponse)).toEqual({
      items: [{ id: "1" }],
      pagination,
    });
  });
});
