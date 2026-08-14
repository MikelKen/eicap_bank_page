export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
  },
  USERS: {
    BASE: "/users",
    ME: "/users/me",
  },
  CLIENTS: {
    BASE: "/clients",
    MINE: "/clients/mine",
    DETAIL: (id: string) => `/clients/${id}`,
  },
  ACCOUNTS: {
    BASE: "/accounts",
    BY_CLIENT: (clientId: string) => `/accounts/client/${clientId}`,
  },
  BANK_OPERATIONS: {
    BASE: "/bank-operations",
    BY_CLIENT: (clientId: string) => `/bank-operations/client/${clientId}`,
    ACTIVE_SESSION: "/bank-operations/active-session",
    MINE: "/bank-operations/mine",
  },
  CASH_SESSIONS: {
    BASE: "/cash-sessions",
    LIST: "/cash-sessions/",
    OPEN: "/cash-sessions/open",
    MINE_OPEN: "/cash-sessions/mine/open",
    DETAIL: (id: string) => `/cash-sessions/${id}`,
    CLOSE: (id: string) => `/cash-sessions/${id}/close`,
  },
  DENOMINATIONS: {
    BASE: "/denominations",
  },
  TYPE_OPERATIONS: {
    BASE: "/type-operations",
  },
};
