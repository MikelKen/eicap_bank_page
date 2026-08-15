import { _null } from "../_libs/zod.mjs";
import { ClientListPaginatedSchema, ClientSchema, parseResponse } from "./router-LQQOMst4.mjs";
import { useQuery } from "../_libs/tanstack__react-query.mjs";
import { QUERY_KEYS } from "./query-keys-DJLdofVW.mjs";
import { ENDPOINTS, api } from "./endpoints-DlQq3h-Y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useQuery-CItDbTTk.js
var ClientService = class {
	async findAll(filter) {
		return await parseResponse(api.get(ENDPOINTS.CLIENTS.BASE, { params: filter }), ClientListPaginatedSchema);
	}
	async findAllMine(filter) {
		return await parseResponse(api.get(ENDPOINTS.CLIENTS.MINE, { params: filter }), ClientListPaginatedSchema);
	}
	async findById(id) {
		return (await parseResponse(api.get(ENDPOINTS.CLIENTS.DETAIL(id)), ClientSchema)).data;
	}
	async create(input) {
		return await parseResponse(api.post(ENDPOINTS.CLIENTS.BASE, input), _null());
	}
};
var clientService = new ClientService();
var useClientMineListQuery = (filter) => {
	return useQuery({
		queryKey: QUERY_KEYS.CLIENTS.LIST(filter),
		queryFn: () => clientService.findAllMine(filter)
	});
};
var useClientDetailQuery = (id) => {
	return useQuery({
		queryKey: QUERY_KEYS.CLIENTS.DETAIL(id),
		queryFn: () => clientService.findById(id),
		enabled: !!id
	});
};
//#endregion
export { clientService, useClientDetailQuery, useClientMineListQuery };
