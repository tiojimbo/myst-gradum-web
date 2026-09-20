import { api, authClient, unwrap } from "@/lib/api";
import type { ApiResponse } from "@/types/api.types";
import type { AuthPayload, User } from "@/types/auth.types";
export const authService = {
  async login(input: {
    email: string;
    password: string;
  }): Promise<AuthPayload> {
    return unwrap(
      await authClient.post<ApiResponse<AuthPayload>>("/auth/login", input),
    );
  },
  async getMe(): Promise<User> {
    return unwrap(await api.get<ApiResponse<User>>("/auth/me"));
  },
  async logout(): Promise<void> {
    await api.post("/auth/logout");
  },
  async logoutAll(): Promise<void> {
    await api.post("/auth/logout-all");
  },
};
