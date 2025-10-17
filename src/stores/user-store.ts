import { IUser } from "@/utils/types";
import { createStore } from "zustand/vanilla";

export type UserState = {
  user: IUser | null;
  isLoading: boolean;
}

export type UserAction = {
  setUser: (user: IUser) => void;
  clearUser: () => void;
  setLoading: (isLoading: boolean) => void;
}

export type UserStore = UserState & UserAction;

export const defaultInitState: UserState = {
  user: null,
  isLoading: false,
}

export function createUserStore(
  initState: UserState = defaultInitState,
) {
  return createStore<UserStore>()((set) => ({
    ...initState,
    setUser: (user: IUser) => set({ user }),
    clearUser: () => set({ user: null }),
    setLoading: (isLoading) => set({ isLoading }),
  }));
}