import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Permission } from "#/lib/permission";

interface PermissionStore {
  permission: Permission | null;
  setPermission: (permission: Permission | null) => void;
}

export const usePermission = create<PermissionStore>()(
  persist(
    (set) => ({
      permission: null,
      setPermission: (permission) => set({ permission }),
    }),
    {
      name: "permission-storage",
      onRehydrateStorage: () => (state) => {
        if (state?.permission) {
          console.log(
            "[PermissionStore] onRehydrateStorage — permission:",
            state.permission,
          );
        }
      },
    },
  ),
);
