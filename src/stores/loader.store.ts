import { create } from "zustand";

interface LoaderStore {
  isLoading: boolean;
  message: string | null;
  show: (message?: string) => void;
  hide: () => void;
}

export const useLoader = create<LoaderStore>((set) => ({
  isLoading: false,
  message: null,
  show: (message?: string) =>
    set({ isLoading: true, message: message || null }),
  hide: () => set({ isLoading: false, message: null }),
}));
