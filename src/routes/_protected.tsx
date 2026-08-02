import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useAuthStore } from "#/stores/auth.store";

export const Route = createFileRoute("/_protected")({
  beforeLoad: () => {
    if (!useAuthStore.getState().isAuthenticated) {
      throw redirect({ to: "/unauthorized" });
    }
  },
  component: Outlet,
});
