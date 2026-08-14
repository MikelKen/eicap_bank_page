import type { UserFilter } from "#/services/user/user.type";
import type { AccountFilter } from "#/services/account/account.type";
import type { BankOperationFilter } from "#/services/bank-operation/bank-operation.type";

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
  ACCOUNTS: {
    ALL: ["accounts"] as const,
    BY_CLIENT: (clientId: string, filter: AccountFilter) =>
      ["accounts", "by-client", clientId, filter] as const,
  },
  BANK_OPERATIONS: {
    ALL: ["bank-operations"] as const,
    BY_CLIENT: (clientId: string, filter: BankOperationFilter) =>
      ["bank-operations", "by-client", clientId, filter] as const,
  },
} as const;
