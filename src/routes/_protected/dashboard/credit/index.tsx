import { createFileRoute, redirect } from "@tanstack/react-router";
import { ViewCredit } from "#/components/module/credit/view.credit";
import { usePermission } from "#/stores/permission.store";

const ALLOWED_ROLES = ["admin", "student"];

export const Route = createFileRoute("/_protected/dashboard/credit/")({
  beforeLoad: () => {
    const permission = usePermission.getState().permission;
    if (!permission || !ALLOWED_ROLES.includes(permission)) {
      throw redirect({ to: "/unauthorized" });
    }
  },
  component: CreditIndexPage,
});

function CreditIndexPage() {
  return <ViewCredit />;
}
