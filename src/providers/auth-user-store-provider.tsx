"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import { 
  type AuthUserStore, 
  createAuthUserStore,
} from "@/stores/auth-user-store";

export type AuthUserStoreApi = ReturnType<typeof createAuthUserStore>;

export const AuthUserStoreContext = createContext<AuthUserStoreApi | undefined>(undefined);

export interface AuthUserStoreProviderProps {
  children: ReactNode;
}

export function AuthUserStoreProvider({ children }: AuthUserStoreProviderProps) {
  const storeRef = useRef<AuthUserStoreApi | null>(null);
  if (!storeRef.current) {
    storeRef.current = createAuthUserStore();
  }

  return (
    <AuthUserStoreContext.Provider value={storeRef.current}>
      {children}
    </AuthUserStoreContext.Provider>
  );
}

export function useAuthUserStore<T>(
  selector: (store: AuthUserStore) => T,
): T {
  const authUserStoreContext = useContext(AuthUserStoreContext);

  if (!authUserStoreContext) {
    throw new Error(`useAuthUserStore must be used within AuthUserStoreProvider`);
  }

  return useStore(authUserStoreContext, selector);
} 