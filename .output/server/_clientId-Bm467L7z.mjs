import { require_jsx_runtime } from "./_libs/@base-ui/react+[...].mjs";
import { Route$2 } from "./_ssr/router-DYX03kjF.mjs";
import { useClientDetailQuery } from "./_ssr/useQuery-DwFiERs1.mjs";
import { ViewCredit } from "./_ssr/view.credit-DqyIGeoP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_clientId-Bm467L7z.js
var import_jsx_runtime = require_jsx_runtime();
function CreditClientPage() {
	const { clientId } = Route$2.useParams();
	const { data: client } = useClientDetailQuery(clientId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ViewCredit, { client });
}
//#endregion
export { CreditClientPage as component };
