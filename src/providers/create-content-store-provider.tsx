"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";
import { CreateContentStore, createContentStore } from "@/stores/create-content-store";

export type CreateContentStoreApi = ReturnType<typeof createContentStore>;

export const CreateContentStoreContext = createContext<CreateContentStoreApi | undefined>(undefined);

export interface CreateContentStoreProviderProps {
  children: ReactNode;
}

export function CreateContentStoreProvider({ children }: CreateContentStoreProviderProps) {
  const storeRef = useRef<CreateContentStoreApi | null>(null);
  if (!storeRef.current) {
    storeRef.current = createContentStore();
  }

  return (
    <CreateContentStoreContext.Provider value={storeRef.current}>
      {children}
    </CreateContentStoreContext.Provider>
  );
}

export function useCreateContentStore<T>(
  selector: (store: CreateContentStore) => T,
): T {
  const createContentStoreContext = useContext(CreateContentStoreContext);

  if (!createContentStoreContext) {
    throw new Error(`useCreateContentStore must be used within CreateContentStoreProvider`);
  }

  return useStore(createContentStoreContext, selector);
} 