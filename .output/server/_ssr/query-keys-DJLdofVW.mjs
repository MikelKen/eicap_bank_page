//#region node_modules/.nitro/vite/services/ssr/assets/query-keys-DJLdofVW.js
var QUERY_KEYS = {
	USERS: {
		ALL: ["users"],
		LISTS: ["users", "list"],
		LIST: (filter) => [
			"users",
			"list",
			filter
		],
		ME: ["users", "me"],
		DETAILS: ["users", "detail"],
		DETAIL: (id) => [
			"users",
			"detail",
			id
		]
	},
	CLIENTS: {
		ALL: ["clients"],
		LISTS: ["clients", "list"],
		LIST: (filter) => [
			"clients",
			"list",
			filter
		],
		ME: ["clients", "me"],
		DETAILS: ["clients", "detail"],
		DETAIL: (id) => [
			"clients",
			"detail",
			id
		]
	},
	ACCOUNTS: {
		ALL: ["accounts"],
		BY_CLIENT: (clientId, filter) => [
			"accounts",
			"by-client",
			clientId,
			filter
		]
	},
	BANK_OPERATIONS: {
		ALL: ["bank-operations"],
		BY_CLIENT: (clientId, filter) => [
			"bank-operations",
			"by-client",
			clientId,
			filter
		],
		ACTIVE_SESSION: {
			ALL: ["bank-operations", "active-session"],
			LIST: (filter) => [
				"bank-operations",
				"active-session",
				filter
			]
		},
		MINE: {
			ALL: ["bank-operations", "mine"],
			LIST: (filter) => [
				"bank-operations",
				"mine",
				filter
			]
		}
	},
	CASH_SESSIONS: {
		ALL: ["cash-sessions"],
		LISTS: ["cash-sessions", "list"],
		LIST: (filter) => [
			"cash-sessions",
			"list",
			filter
		],
		MINE_OPEN: [
			"cash-sessions",
			"mine",
			"open"
		],
		DETAILS: ["cash-sessions", "detail"],
		DETAIL: (id) => [
			"cash-sessions",
			"detail",
			id
		]
	},
	DENOMINATIONS: {
		ALL: ["denominations"],
		LISTS: ["denominations", "list"],
		LIST: (filter) => [
			"denominations",
			"list",
			filter
		]
	},
	TYPE_OPERATIONS: {
		ALL: ["type-operations"],
		LISTS: ["type-operations", "list"],
		LIST: (filter) => [
			"type-operations",
			"list",
			filter
		]
	}
};
//#endregion
export { QUERY_KEYS };
