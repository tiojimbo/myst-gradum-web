import axios, { type AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";

import { SITE } from "@/config/site";
import { API_BASE_URL, API_TIMEOUT_MS } from "@/lib/constants";
import { clearTokens, getAccessToken, getRefreshToken, setTokens } from "@/lib/tokens";
import type { ApiResponse, PaginationMeta } from "@/types/api.types";
import type { AuthPayload } from "@/types/auth.types";

if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_URL não está definida");
}

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT_MS,
  headers: { "Content-Type": "application/json" },
});

export const authClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT_MS,
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

interface RetryableConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

interface QueuedRequest {
  resolve: (value: unknown) => void;
  reject: (reason: unknown) => void;
  config: RetryableConfig;
}

let isRefreshing = false;
let failedQueue: QueuedRequest[] = [];

function processQueue(error: unknown): void {
  for (const { resolve, reject, config } of failedQueue) {
    if (error) {
      reject(error);
    } else {
      resolve(api(config));
    }
  }
  failedQueue = [];
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const config = error.config as RetryableConfig | undefined;
    const isAuthRoute = config?.url?.includes("/auth/") ?? false;

    if (error.response?.status !== 401 || !config || config._retry || isAuthRoute) {
      return Promise.reject(error);
    }

    config._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject, config });
      });
    }

    isRefreshing = true;

    try {
      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        throw error;
      }
      const refreshResponse = await authClient.post<ApiResponse<AuthPayload>>("/auth/refresh", {
        refreshToken,
      });
      setTokens(unwrap(refreshResponse));
      processQueue(null);
      return api(config);
    } catch (refreshError) {
      processQueue(refreshError);
      clearTokens();
      window.location.href = SITE.loginPath;
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export function unwrap<T>(response: AxiosResponse<ApiResponse<T>>): T {
  return response.data.data;
}

export function unwrapList<T>(
  response: AxiosResponse<ApiResponse<T[]>>,
): { items: T[]; pagination: PaginationMeta | undefined } {
  return { items: response.data.data, pagination: response.data.meta.pagination };
}
