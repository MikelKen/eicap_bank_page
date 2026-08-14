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
  },
};
