import { api, unwrap, unwrapList } from "@/lib/api";
import type { ApiResponse } from "@/types/api.types";
import type { ApiKey, CreatedApiKey } from "../types/api-key.types";
export const apiKeysService = {
  async create(input: { name: string }): Promise<CreatedApiKey> {
    return unwrap(
      await api.post<ApiResponse<CreatedApiKey>>("/api-keys", input),
    );
  },
  async list(page = 1, limit = 20) {
    return unwrapList(
      await api.get<ApiResponse<ApiKey[]>>("/api-keys", {
        params: { page, limit: Math.min(limit, 100) },
      }),
    );
  },
  async revoke(id: string): Promise<ApiKey> {
    return unwrap(
      await api.post<ApiResponse<ApiKey>>(`/api-keys/${id}/revoke`),
    );
  },
};
