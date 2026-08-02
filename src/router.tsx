import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { ErrorPage } from "#/components/core/ErrorPage";
import { getContext } from "./integrations/tanstack-query/root-provider";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
  const context = getContext();

  const router = createTanStackRouter({
    routeTree,
    context: {
      ...context,
    },
    scrollRestoration: true,
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: ({ error, reset }) => (
      <ErrorPage error={error} reset={reset} />
    ),
  });

  setupRouterSsrQueryIntegration({ router, queryClient: context.queryClient });

  if (import.meta.env.DEV) {
    router.subscribe("onBeforeNavigate", (event) => {
      console.log(
        `[Router] ${event.type}: ${event.fromLocation?.pathname ?? "(initial)"} → ${event.toLocation.pathname}`,
      );
    });
    router.subscribe("onLoad", (event) => {
      console.log(`[Router] ${event.type}: ${event.toLocation.pathname}`);
    });
    router.subscribe("onResolved", (event) => {
      console.log(`[Router] ${event.type}: ${event.toLocation.pathname}`);
    });
    router.subscribe("onBeforeRouteMount", (event) => {
      console.log(`[Router] ${event.type}: ${event.toLocation.pathname}`);
    });
  }

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
