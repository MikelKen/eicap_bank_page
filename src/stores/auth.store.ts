import type { User } from "#/services/user/user.type";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { validateToken } from "#/lib/utils";

interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setUser: (user) => set({ user }),
      setToken: (token) =>
        set({
          token,
          isAuthenticated: token !== null && validateToken(token),
        }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => (state) => {
        if (state?.token && !validateToken(state.token)) {
          state.logout();
        }
      },
    },
  ),
);

let _prevToken: string | null = null;
useAuthStore.subscribe((state) => {
  if (state.token !== _prevToken) {
    if (state.token && !validateToken(state.token)) {
      state.logout();
    }
    _prevToken = state.token;
  }
});
