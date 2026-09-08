import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthUiState {
  isAccountMenuOpen: boolean;
  setAccountMenuOpen: (open: boolean) => void;
}

export const useAuthStore = create<AuthUiState>()(
  persist(
    (set) => ({
      isAccountMenuOpen: false,
      setAccountMenuOpen: (open) => set({ isAccountMenuOpen: open }),
    }),
    { name: "gradum-auth-ui" },
  ),
);
