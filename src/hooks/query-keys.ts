import type { UserFilter } from "#/services/user/user.type";

export const QUERY_KEYS = {
  USERS: {
    ALL: ["users"] as const,
    LISTS: ["users", "list"] as const,
    LIST: (filter: UserFilter) => ["users", "list", filter] as const,
    ME: ["users", "me"] as const,
    DETAILS: ["users", "detail"] as const,
    DETAIL: (id: string) => ["users", "detail", id] as const,
  },
  CLIENTS: {
    ALL: ["clients"] as const,
    LISTS: ["clients", "list"] as const,
    LIST: (filter: UserFilter) => ["clients", "list", filter] as const,
    ME: ["clients", "me"] as const,
    DETAILS: ["clients", "detail"] as const,
    DETAIL: (id: string) => ["clients", "detail", id] as const,
  },
} as const;
