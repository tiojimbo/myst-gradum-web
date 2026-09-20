"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authService } from "@/features/auth/services/auth.service";
import { ACCESS_TOKEN_KEY } from "@/lib/constants";
import { clearTokens, getAccessToken, setTokens } from "@/lib/tokens";
import { SITE } from "@/config/site";
import type { User } from "@/types/auth.types";
interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  login: (input: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  logoutAll: () => Promise<void>;
  getMe: () => Promise<void>;
}
const AuthContext = createContext<AuthContextValue | null>(null);
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const router = useRouter();
  const redirected = useRef(false);
  const epoch = useRef(0);
  const endSession = useCallback(() => {
    epoch.current += 1;
    clearTokens();
    setUser(null);
    setIsLoading(false);
    queryClient.clear();
    if (
      !redirected.current &&
      ![SITE.loginPath, "/design-system"].includes(window.location.pathname)
    ) {
      redirected.current = true;
      router.replace(SITE.loginPath);
    }
  }, [queryClient, router]);
  const getMe = useCallback(async () => {
    const token = getAccessToken();
    const current = ++epoch.current;
    if (!token) {
      clearTokens();
      setUser(null);
      setIsLoading(false);
      if (
        ![SITE.loginPath, "/design-system"].includes(
          window.location.pathname,
        ) &&
        !redirected.current
      ) {
        redirected.current = true;
        router.replace(SITE.loginPath);
      }
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const nextUser = await authService.getMe();
      if (epoch.current !== current || token !== getAccessToken()) return;
      setTokens({ accessToken: token });
      setUser(nextUser);
      redirected.current = false;
      if (window.location.pathname === SITE.loginPath)
        router.replace(SITE.homePath);
    } catch (cause) {
      if (epoch.current === current) {
        setUser(null);
        setError(
          cause instanceof Error && cause.message === "Sem permissão"
            ? cause.message
            : "Não foi possível validar sua sessão. Tente novamente.",
        );
      }
    } finally {
      if (epoch.current === current) setIsLoading(false);
    }
  }, [router]);
  useEffect(() => {
    void getMe();
    const onInvalid = () => endSession();
    const onDenied = () => setError("Sem permissão");
    const onRestored = () => setError(null);
    window.addEventListener("gradum:permission-denied", onDenied);
    window.addEventListener("gradum:permission-restored", onRestored);
    const onStorage = (event: StorageEvent) => {
      if (event.key === ACCESS_TOKEN_KEY || event.key === null) {
        queryClient.clear();
        setUser(null);
        if (!getAccessToken()) endSession();
        else void getMe();
      }
    };
    window.addEventListener("gradum:session-invalid", onInvalid);
    window.addEventListener("storage", onStorage);
    return () => {
      epoch.current += 1;
      window.removeEventListener("gradum:permission-denied", onDenied);
      window.removeEventListener("gradum:permission-restored", onRestored);
      window.removeEventListener("gradum:session-invalid", onInvalid);
      window.removeEventListener("storage", onStorage);
    };
  }, [getMe, endSession, queryClient]);
  const login = async (input: { email: string; password: string }) => {
    const result = await authService.login(input);
    epoch.current += 1;
    queryClient.clear();
    setTokens(result);
    setUser(result.user);
    setError(null);
    setIsLoading(false);
    redirected.current = false;
    router.replace(SITE.homePath);
  };
  const logout = async () => {
    await authService.logout();
    endSession();
  };
  const logoutAll = async () => {
    await authService.logoutAll();
    endSession();
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        error,
        login,
        logout,
        logoutAll,
        getMe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth deve ser usado dentro de um <AuthProvider>.");
  return context;
}
