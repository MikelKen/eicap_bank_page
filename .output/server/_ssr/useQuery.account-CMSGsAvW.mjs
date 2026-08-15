import { _null, datetime, object, string } from "../_libs/zod.mjs";
import { BankOperationListPaginatedSchema, PaginatedResponse, PaginationSchema, parseResponse } from "./router-LQQOMst4.mjs";
import { Temporal } from "../_libs/temporal-polyfill+[...].mjs";
import { useQuery } from "../_libs/tanstack__react-query.mjs";
import { QUERY_KEYS } from "./query-keys-DJLdofVW.mjs";
import { ENDPOINTS, api } from "./endpoints-DlQq3h-Y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useQuery.account-CMSGsAvW.js
var BankOperationService = class {
	async findByClient(clientId, filter) {
		return await parseResponse(api.get(ENDPOINTS.BANK_OPERATIONS.BY_CLIENT(clientId), { params: filter }), BankOperationListPaginatedSchema);
	}
	async findByActiveSession(filter) {
		return await parseResponse(api.get(ENDPOINTS.BANK_OPERATIONS.ACTIVE_SESSION, { params: filter }), BankOperationListPaginatedSchema);
	}
	async create(input) {
		console.log("Datos de la transaccion: ", input);
		return await parseResponse(api.post(ENDPOINTS.BANK_OPERATIONS.BASE, input), _null());
	}
};
var bankOperationService = new BankOperationService();
var useBankOperationsByClientQuery = (clientId, filter) => {
	return useQuery({
		queryKey: QUERY_KEYS.BANK_OPERATIONS.BY_CLIENT(clientId, filter),
		queryFn: () => bankOperationService.findByClient(clientId, filter),
		enabled: !!clientId
	});
};
var useBankOperationsByActiveSessionQuery = (filter, enabled) => {
	return useQuery({
		queryKey: QUERY_KEYS.BANK_OPERATIONS.ACTIVE_SESSION.LIST(filter),
		queryFn: () => bankOperationService.findByActiveSession(filter),
		enabled
	});
};
var AccountSchema = object({
	id: string(),
	number: string(),
	interest: string(),
	balance: string(),
	status: string(),
	client_id: string(),
	client_name: string().optional(),
	type_account_id: string(),
	type_account_name: string().optional(),
	created_at: datetime({ offset: true }).transform(Temporal.Instant.from),
	updated_at: datetime({ offset: true }).transform(Temporal.Instant.from),
	deleted_at: datetime({ offset: true }).nullish().transform((v) => v ? Temporal.Instant.from(v) : null)
});
PaginationSchema.extend({
	client_id: string().optional(),
	search: string().optional()
});
var AccountListPaginatedSchema = PaginatedResponse(AccountSchema);
var AccountService = class {
	async findByClient(clientId, filter) {
		return await parseResponse(api.get(ENDPOINTS.ACCOUNTS.BY_CLIENT(clientId), { params: filter }), AccountListPaginatedSchema);
	}
};
var accountService = new AccountService();
var useAccountsByClientQuery = (clientId, filter) => {
	return useQuery({
		queryKey: QUERY_KEYS.ACCOUNTS.BY_CLIENT(clientId, filter),
		queryFn: () => accountService.findByClient(clientId, filter),
		enabled: !!clientId
	});
};
//#endregion
export { bankOperationService, useAccountsByClientQuery, useBankOperationsByActiveSessionQuery, useBankOperationsByClientQuery };
