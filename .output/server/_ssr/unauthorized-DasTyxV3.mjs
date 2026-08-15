import { require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { Link, useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/unauthorized-DasTyxV3.js
var import_jsx_runtime = require_jsx_runtime();
function UnauthorizedPage() {
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "flex flex-col items-center justify-center py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "island-shell flex flex-col items-center gap-6 px-8 py-12 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold tracking-tight text-foreground",
					children: "401"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-sm text-lg text-muted-foreground",
					children: "No tenés permisos para acceder a esta página."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => router.history.back(),
						className: "inline-flex items-center rounded-lg border border-input bg-background px-5 py-2.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent",
						children: "← Ir atrás"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90",
						children: "Ir al inicio"
					})]
				})
			]
		})
	});
}
function RouteComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UnauthorizedPage, {});
}
//#endregion
export { RouteComponent as component };
