// routes/_protected/dashboard/index.tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/dashboard/")({
  component: DashboardHome,
});

function DashboardHome() {
  return <div>Dashboard</div>;
}
