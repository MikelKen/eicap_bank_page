import { string, url } from "../_libs/zod.mjs";
import { axios } from "../_libs/axios+[...].mjs";
import { createEnv } from "../_libs/t3-oss__env-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/endpoints-CJI49jz4.js
var env = createEnv({
	server: { SERVER_URL: url().optional() },
	clientPrefix: "VITE_",
	client: {
		VITE_APP_TITLE: string().min(1).optional(),
		VITE_API_URL: string().url().or(string().startsWith("/"))
	},
	runtimeEnv: {
		"BASE_URL": "/",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"SSR": true,
		"TSS_DEV_SERVER": "false",
		"TSS_DEV_SSR_STYLES_BASEPATH": "/",
		"TSS_DEV_SSR_STYLES_ENABLED": "true",
		"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
		"TSS_INLINE_CSS_ENABLED": "false",
		"TSS_ROUTER_BASEPATH": "",
		"TSS_SERVER_FN_BASE": "/_serverFn/",
		"VITE_API_URL": "http://localhost:8000/api/v1"
	},
	emptyStringAsUndefined: true
});
var api = axios.create({
	baseURL: env.VITE_API_URL,
	timeout: 1e4,
	withCredentials: true
});
var ENDPOINTS = {
	AUTH: { LOGIN: "/auth/login" },
	USERS: {
		BASE: "/users",
		ME: "/users/me",
		DETAIL: (id) => `/users/${id}`
	},
	CLIENTS: {
		BASE: "/clients",
		MINE: "/clients/mine",
		DETAIL: (id) => `/clients/${id}`
	},
	ACCOUNTS: {
		BASE: "/accounts",
		BY_CLIENT: (clientId) => `/accounts/client/${clientId}`
	},
	BANK_OPERATIONS: {
		BASE: "/bank-operations",
		BY_CLIENT: (clientId) => `/bank-operations/client/${clientId}`,
		ACTIVE_SESSION: "/bank-operations/active-session",
		MINE: "/bank-operations/mine"
	},
	CASH_SESSIONS: {
		BASE: "/cash-sessions",
		LIST: "/cash-sessions/",
		OPEN: "/cash-sessions/open",
		MINE_OPEN: "/cash-sessions/mine/open",
		DETAIL: (id) => `/cash-sessions/${id}`,
		CLOSE: (id) => `/cash-sessions/${id}/close`
	},
	DENOMINATIONS: { BASE: "/denominations" },
	TYPE_ACCOUNTS: { BASE: "/type-accounts" },
	TYPE_OPERATIONS: { BASE: "/type-operations" }
};
//#endregion
export { ENDPOINTS, api };
