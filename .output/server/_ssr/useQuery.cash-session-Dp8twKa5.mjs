import { CashSessionListPaginatedSchema, CashSessionSchema, parseResponse } from "./router-DYX03kjF.mjs";
import { _null } from "../_libs/zod.mjs";
import { useQuery } from "../_libs/tanstack__react-query.mjs";
import { QUERY_KEYS } from "./query-keys-C2BKfhUN.mjs";
import { ENDPOINTS, api } from "./endpoints-CJI49jz4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useQuery.cash-session-Dp8twKa5.js
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
