import { QueryClient } from "@tanstack/react-query";

export function getContext() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 60 * 2,
      },
    },
  });
  return { queryClient };
}

export default function TanStackProvider() {}
