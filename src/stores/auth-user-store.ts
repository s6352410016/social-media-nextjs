import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AuthUserState = {
  email: string;
}

export type AuthUserAction = {
  setEmail: (email: string) => void;
}

export type AuthUserStore = AuthUserState & AuthUserAction;

export const defaultInitState: AuthUserState = {
  email: "",
}

export function createAuthUserStore(
  initState: AuthUserState = defaultInitState,
) {
  return create<AuthUserStore>()(
    persist(
      (set) => ({
        ...initState,
        setEmail: (email) => set({ email }),
      }),
      {
        name: "auth-user-storage",
        partialize: (state) => ({ email: state.email }),
      }
    ),
  );
}