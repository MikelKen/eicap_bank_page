import { require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { Button$1 } from "./button-DORldgde.mjs";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./router-DYX03kjF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/confirm-dialog-bSLAfSUX.js
var import_jsx_runtime = require_jsx_runtime();
function ConfirmDialog({ close, title, description, confirmLabel = "Confirmar", cancelLabel = "Cancelar", isLoading = false, onConfirm }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
		className: "sm:max-w-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: description })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
			className: "mt-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
				variant: "outline",
				type: "button",
				onClick: close,
				children: cancelLabel
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
				variant: "destructive",
				type: "button",
				disabled: isLoading,
				onClick: onConfirm,
				children: isLoading ? "Eliminando..." : confirmLabel
			})]
		})]
	});
}
//#endregion
export { ConfirmDialog };
