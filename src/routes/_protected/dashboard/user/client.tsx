import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/dashboard/user/client")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div> VIEW CLIENT</div>;
}
