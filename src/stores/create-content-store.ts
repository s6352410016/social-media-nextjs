import { createStore } from "zustand/vanilla";

type Context = "POST" | "COMMENT" | "REPLY" | "CHAT" | undefined;

type ContextType = {
  type: Context;
  content: string | undefined;
};

export type CreateContentState = {
  context: ContextType;
};

export type CreateContentAction = {
  setContext: (context: ContextType) => void;
};

export type CreateContentStore = CreateContentState & CreateContentAction;

export const defaultInitState: CreateContentState = {
  context: {
    type: undefined,
    content: undefined,
  },
};

export function createContentStore(
  initState: CreateContentState = defaultInitState
) {
  return createStore<CreateContentStore>()((set) => ({
    ...initState,
    setContext: (context) => set({ context }),
  }));
}
