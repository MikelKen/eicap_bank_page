import { createFileRoute } from "@tanstack/react-router";
import { UnauthorizedPage } from "#/components/core/UnauthorizedPage";

export const Route = createFileRoute("/unauthorized")({
	component: RouteComponent,
});

function RouteComponent() {
	return <UnauthorizedPage />;
}
