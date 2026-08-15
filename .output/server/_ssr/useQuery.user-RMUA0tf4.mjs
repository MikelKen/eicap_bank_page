import { _null } from "../_libs/zod.mjs";
import { UserListPaginatedSchema, UserSchema, parseResponse, useAuthStore } from "./router-LQQOMst4.mjs";
import { useQuery } from "../_libs/tanstack__react-query.mjs";
import { QUERY_KEYS } from "./query-keys-DJLdofVW.mjs";
import { ENDPOINTS, api } from "./endpoints-DlQq3h-Y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useQuery.user-RMUA0tf4.js
var UserService = class {
	async findAll(filter) {
		return await parseResponse(api.get(ENDPOINTS.USERS.BASE, { params: filter }), UserListPaginatedSchema);
	}
	async findMe() {
		return (await parseResponse(api.get(ENDPOINTS.USERS.ME), UserSchema)).data;
	}
	async create(input) {
		return await parseResponse(api.post(ENDPOINTS.USERS.BASE, input), _null());
	}
};
var userService = new UserService();
var useUserListQuery = (filter) => {
	return useQuery({
		queryKey: QUERY_KEYS.USERS.LIST(filter),
		queryFn: () => userService.findAll(filter)
	});
};
var useMeQuery = () => {
	const token = useAuthStore((s) => s.token);
	return useQuery({
		queryKey: QUERY_KEYS.USERS.ME,
		queryFn: () => userService.findMe(),
		enabled: !!token
	});
};
//#endregion
export { useMeQuery, useUserListQuery, userService };
