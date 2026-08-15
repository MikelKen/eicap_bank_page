import { AxiosError } from "../_libs/axios+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/get-api-error-B0LFU43N.js
function getApiError(error, fallback = "Error desconocido") {
	if (typeof error === "object" && error !== null) {
		if ("details" in error) {
			const details = error.details;
			if (details) {
				const values = Object.values(details);
				if (values.length > 0) return values[0];
			}
		}
		if (error instanceof AxiosError && error.response?.data?.message) return error.response.data.message;
		if (error instanceof Error) return error.message;
	}
	return fallback;
}
//#endregion
export { getApiError };
