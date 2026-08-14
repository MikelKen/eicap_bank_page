import { createFileRoute, redirect } from "@tanstack/react-router";
import { ViewCredit } from "#/components/module/credit/view.credit";
import { useClientDetailQuery } from "#/hooks/client/useQuery";
import { usePermission } from "#/stores/permission.store";

const ALLOWED_ROLES = ["admin", "student"];

export const Route = createFileRoute("/_protected/dashboard/credit/$clientId")({
  beforeLoad: () => {
    const permission = usePermission.getState().permission;
    if (!permission || !ALLOWED_ROLES.includes(permission)) {
      throw redirect({ to: "/unauthorized" });
    }
  },
  component: CreditClientPage,
});

function CreditClientPage() {
  const { clientId } = Route.useParams();
  const { data: client } = useClientDetailQuery(clientId);

  return <ViewCredit client={client} />;
}
