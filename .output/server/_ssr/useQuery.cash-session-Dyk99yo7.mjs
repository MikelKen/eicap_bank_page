import { _null } from "../_libs/zod.mjs";
import { CashSessionListPaginatedSchema, CashSessionSchema, parseResponse } from "./router-LQQOMst4.mjs";
import { useQuery } from "../_libs/tanstack__react-query.mjs";
import { QUERY_KEYS } from "./query-keys-DJLdofVW.mjs";
import { ENDPOINTS, api } from "./endpoints-DlQq3h-Y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useQuery.cash-session-Dyk99yo7.js
var CashSessionService = class {
	async findAll(filter) {
		return await parseResponse(api.get(ENDPOINTS.CASH_SESSIONS.LIST, { params: filter }), CashSessionListPaginatedSchema);
	}
	async findMyOpen() {
		try {
			return (await parseResponse(api.get(ENDPOINTS.CASH_SESSIONS.MINE_OPEN), CashSessionSchema)).data;
		} catch (error) {
			if (typeof error === "object" && error !== null && "status" in error && error.status === 404) return null;
			throw error;
		}
	}
	async open(counts) {
		return await parseResponse(api.post(ENDPOINTS.CASH_SESSIONS.OPEN, { counts }), _null());
	}
	async close(sessionId, counts) {
		return await parseResponse(api.put(ENDPOINTS.CASH_SESSIONS.CLOSE(sessionId), { counts }), _null());
	}
};
var cashSessionService = new CashSessionService();
var useCashSessionsQuery = (filter) => {
	return useQuery({
		queryKey: QUERY_KEYS.CASH_SESSIONS.LIST(filter),
		queryFn: () => cashSessionService.findAll(filter)
	});
};
var useMyOpenCashSessionQuery = () => {
	return useQuery({
		queryKey: QUERY_KEYS.CASH_SESSIONS.MINE_OPEN,
		queryFn: () => cashSessionService.findMyOpen(),
		retry: false
	});
};
//#endregion
export { cashSessionService, useCashSessionsQuery, useMyOpenCashSessionQuery };
