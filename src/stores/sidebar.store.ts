import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SidebarStore {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
}

export const useSidebarStore = create<SidebarStore>()(
  persist(
    (set, get) => ({
      isOpen: true,
      setOpen: (open) => set({ isOpen: open }),
      toggle: () => set({ isOpen: !get().isOpen }),
    }),
    {
      name: "sidebar-storage",
    },
  ),
);
