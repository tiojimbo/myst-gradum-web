import axios, { type AxiosError, type AxiosResponse } from "axios";
import { API_BASE_URL, API_TIMEOUT_MS } from "@/lib/constants";
import { clearTokens, getAccessToken } from "@/lib/tokens";
import type { ApiResponse, PaginationMeta } from "@/types/api.types";
if (!API_BASE_URL) throw new Error("NEXT_PUBLIC_API_URL não está definida");
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
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
api.interceptors.response.use(
  (response) => {
    if (typeof window !== "undefined")
      window.dispatchEvent(new Event("gradum:permission-restored"));
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      const sent = error.config?.headers?.Authorization;
      const current = getAccessToken();
      if (!current || sent === `Bearer ${current}`) {
        clearTokens();
        window.dispatchEvent(new Event("gradum:session-invalid"));
      }
    }
    if (error.response?.status === 403) {
      error.message = "Sem permissão";
      if (typeof window !== "undefined")
        window.dispatchEvent(new Event("gradum:permission-denied"));
    }
    return Promise.reject(error);
  },
);
export function unwrap<T>(response: AxiosResponse<ApiResponse<T>>): T {
  return response.data.data;
}
export function unwrapList<T>(response: AxiosResponse<ApiResponse<T[]>>): {
  items: T[];
  pagination: PaginationMeta | undefined;
} {
  return {
    items: response.data.data,
    pagination: response.data.meta.pagination,
  };
}
