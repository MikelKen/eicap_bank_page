import type { UserFilter } from "#/services/user/user.type";
import type { AccountFilter } from "#/services/account/account.type";
import type { BankOperationFilter } from "#/services/bank-operation/bank-operation.type";
import type { DenominationFilter } from "#/services/denomination/denomination.type";
import type { TypeOperationFilter } from "#/services/type-operation/type-operation.type";

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
    ACTIVE_SESSION: {
      ALL: ["bank-operations", "active-session"] as const,
      LIST: (filter: BankOperationFilter) =>
        ["bank-operations", "active-session", filter] as const,
    },
    MINE: {
      ALL: ["bank-operations", "mine"] as const,
      LIST: (filter: BankOperationFilter) =>
        ["bank-operations", "mine", filter] as const,
    },
  },
  CASH_SESSIONS: {
    ALL: ["cash-sessions"] as const,
    MINE_OPEN: ["cash-sessions", "mine", "open"] as const,
    DETAILS: ["cash-sessions", "detail"] as const,
    DETAIL: (id: string) => ["cash-sessions", "detail", id] as const,
  },
  DENOMINATIONS: {
    ALL: ["denominations"] as const,
    LISTS: ["denominations", "list"] as const,
    LIST: (filter: DenominationFilter) =>
      ["denominations", "list", filter] as const,
  },
  TYPE_OPERATIONS: {
    ALL: ["type-operations"] as const,
    LISTS: ["type-operations", "list"] as const,
    LIST: (filter: TypeOperationFilter) =>
      ["type-operations", "list", filter] as const,
  },
} as const;
