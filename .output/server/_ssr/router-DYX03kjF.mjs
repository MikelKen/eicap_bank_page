import { __exportAll as __exportAll$1, __toESM } from "../_runtime.mjs";
import { DialogBackdrop, DialogClose, DialogDescription as DialogDescription$1, DialogPopup, DialogPortal as DialogPortal$1, DialogRoot, DialogTitle as DialogTitle$1, require_jsx_runtime, require_react } from "../_libs/@base-ui/react+[...].mjs";
import { Button$1, cn, validateToken } from "./button-DORldgde.mjs";
import { create, persist } from "../_libs/zustand.mjs";
import { _enum, array, date, datetime, number as number$1, number$1 as number, object, record, string } from "../_libs/zod.mjs";
import { AxiosError } from "../_libs/axios+[...].mjs";
import { Temporal } from "../_libs/temporal-polyfill+[...].mjs";
import { HeadContent, Link, Scripts, createFileRoute, createRootRouteWithContext, createRouter, lazyRouteComponent, redirect, useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { QueryClient } from "../_libs/tanstack__query-core.mjs";
import { setupRouterSsrQueryIntegration } from "../_libs/@tanstack/react-router-ssr-query+[...].mjs";
import { Toaster } from "../_libs/sonner.mjs";
import { LoaderCircle, X } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/permission.store-2Xqd7AZJ.js
var usePermission = create()(persist((set) => ({
	permission: null,
	setPermission: (permission) => set({ permission })
}), {
	name: "permission-storage",
	onRehydrateStorage: () => (state) => {
		if (state?.permission) console.log("[PermissionStore] onRehydrateStorage — permission:", state.permission);
	}
}));
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/pagination.type-BJhXTWD2.js
var OkResponse = (schema) => object({
	message: string(),
	data: schema
});
var ErrorSchema = object({
	error: string(),
	details: record(string(), string()).optional()
});
async function parseResponse(request, schema) {
	try {
		const { data } = await request;
		console.log("[API] Raw response:", data);
		const parsed = OkResponse(schema).safeParse(data);
		if (!parsed.success) throw parsed.error;
		return parsed.data;
	} catch (error) {
		if (error instanceof AxiosError && error.response) throw {
			...ErrorSchema.parse(error.response.data),
			status: error.response.status
		};
		throw error;
	}
}
var PaginatedResponse = (schema) => object({
	items: array(schema),
	total: number().int().nonnegative(),
	page: number().int().positive(),
	per_page: number().int().positive(),
	total_pages: number().int().nonnegative()
});
var PaginationSchema = object({
	page: number$1().int().positive().optional().default(1),
	per_page: number$1().int().positive().optional().default(20),
	sort: string().optional().default("created_at"),
	order: _enum(["asc", "desc"]).optional().default("desc")
});
function defaultPagination() {
	return {
		page: 1,
		per_page: 20,
		sort: "created_at",
		order: "desc"
	};
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/bank-operation.type-D6QmVFlz.js
var OperationInformationSchema = object({
	id: string(),
	origin: string(),
	reason: string(),
	destination: string(),
	details: string()
});
var BankOperationSchema = object({
	id: string(),
	code: string(),
	date: datetime({ offset: true }).transform(Temporal.Instant.from),
	previous_balance: string(),
	import: string(),
	end_balance: string(),
	type_operation_id: string(),
	type_operation_code: string(),
	account_id: string().optional(),
	account_number: string().optional(),
	cash_session_id: string().optional(),
	info: OperationInformationSchema.nullish(),
	created_at: datetime({ offset: true }).transform(Temporal.Instant.from)
});
var BankOperationFilterSchema = PaginationSchema.extend({
	account_id: string().optional(),
	type_operation_code: string().optional()
});
var BankOperationListPaginatedSchema = PaginatedResponse(BankOperationSchema);
var CreateOperationInformationSchema = object({
	origin: string().optional(),
	reason: string().optional(),
	destination: string().optional(),
	details: string().optional()
});
object({
	type_operation_code: string(),
	account_id: string().optional(),
	amount: number(),
	info: CreateOperationInformationSchema.optional()
});
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/cash-session.type-DFJ2LPKK.js
var CashCountSchema = object({
	id: string(),
	type: string(),
	quantity: number().int(),
	subtotal: string(),
	denomination_id: string(),
	denomination_name: string().optional(),
	denomination_value: string().optional()
});
var CashSessionSchema = object({
	id: string(),
	state: string(),
	opening_date: datetime({ offset: true }).transform(Temporal.Instant.from),
	opening_amount: string(),
	closing_date: datetime({ offset: true }).nullish().transform((v) => v ? Temporal.Instant.from(v) : null),
	closing_amount: string().nullish(),
	expected_amount: string().nullish(),
	difference_amount: string().nullish(),
	operation_code: string().optional(),
	user_id: string(),
	user_name: string().optional(),
	counts: array(CashCountSchema).optional(),
	created_at: datetime({ offset: true }).transform(Temporal.Instant.from),
	updated_at: datetime({ offset: true }).transform(Temporal.Instant.from),
	deleted_at: datetime({ offset: true }).nullish().transform((v) => v ? Temporal.Instant.from(v) : null)
});
object({
	denomination_id: string(),
	quantity: number().int().positive()
});
var CashSessionFilterSchema = PaginationSchema.extend({ state: string().optional() });
var CashSessionListPaginatedSchema = PaginatedResponse(CashSessionSchema);
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/client.type-BqJfnM9b.js
var ClientSchema = object({
	id: string(),
	name: string(),
	ci: string(),
	sex: string(),
	birth_date: date().transform((v) => Temporal.PlainDate.from(v)),
	created_at: datetime({ offset: true }).transform(Temporal.Instant.from),
	updated_at: datetime({ offset: true }).transform(Temporal.Instant.from),
	deleted_at: datetime({ offset: true }).nullish().transform((v) => v ? Temporal.Instant.from(v) : null)
});
var ClientFilterSchema = PaginationSchema.extend({ search: string().optional() });
object({
	name: string().min(1, "Nombre es requerido"),
	ci: string().min(1, "Cédula es requerida"),
	sex: string().min(1, "Género es requerido"),
	birth_date: string().min(1, "Fecha de nacimiento es requerida")
});
object({
	name: string().min(1, "Nombre es requerido"),
	ci: string().min(1, "Cédula es requerida"),
	sex: string().min(1, "Género es requerido"),
	birth_date: string().min(1, "Fecha de nacimiento es requerida")
});
var ClientListPaginatedSchema = PaginatedResponse(ClientSchema);
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/user.type-CVIJwO5G.js
var UserSchema = object({
	id: string(),
	name: string(),
	email: string().email(),
	avatar: string(),
	role: string(),
	token: string().optional(),
	created_at: datetime({ offset: true }).transform(Temporal.Instant.from),
	updated_at: datetime({ offset: true }).transform(Temporal.Instant.from),
	deleted_at: datetime({ offset: true }).nullish().transform((v) => v ? Temporal.Instant.from(v) : null)
});
var UserFilterSchema = PaginationSchema.extend({
	name: string().optional(),
	roles: string().optional()
});
object({
	name: string().min(1, "Nombre es requerido"),
	email: string().email("Email inválido"),
	password: string().min(1, "Contraseña es requerida"),
	role: _enum(["admin", "student"], "Rol inválido")
});
object({
	name: string().min(1, "Nombre es requerido"),
	email: string().email("Email inválido").optional(),
	password: string().optional(),
	role: _enum(["admin", "student"], "Rol inválido")
});
var UserListPaginatedSchema = PaginatedResponse(UserSchema);
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-DYX03kjF.js
var router_DYX03kjF_exports = /* @__PURE__ */ __exportAll$1({
	DialogContent: () => DialogContent,
	DialogDescription: () => DialogDescription,
	DialogFooter: () => DialogFooter,
	DialogHeader: () => DialogHeader,
	DialogTitle: () => DialogTitle,
	Route: () => Route$1,
	Route$1: () => Route$2,
	Route$2: () => Route$4,
	Route$3: () => Route$5,
	Route$4: () => Route$6,
	Route$5: () => Route$7,
	getRouter: () => getRouter,
	router_exports: () => router_exports,
	useAuthStore: () => useAuthStore,
	useDialog: () => useDialog,
	useLoader: () => useLoader
});
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
function ErrorPage({ error, reset }) {
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "flex flex-col items-center justify-center py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "island-shell flex flex-col items-center gap-6 px-8 py-12 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold tracking-tight text-foreground",
					children: "Error"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "max-w-sm text-lg text-muted-foreground",
					children: ["Algo salió mal. ", error.message]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex items-center gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => router.history.back(),
							className: "inline-flex items-center rounded-lg border border-input bg-background px-5 py-2.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent",
							children: "← Ir atrás"
						}),
						reset && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => reset(),
							className: "inline-flex items-center rounded-lg border border-input bg-background px-5 py-2.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent",
							children: "Reintentar"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "inline-flex items-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90",
							children: "Ir al inicio"
						})
					]
				})
			]
		})
	});
}
function getContext() {
	return { queryClient: new QueryClient({ defaultOptions: { queries: { staleTime: 72e5 } } }) };
}
function Dialog$1({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogRoot, {
		"data-slot": "dialog",
		...props
	});
}
function DialogPortal({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogPortal$1, {
		"data-slot": "dialog-portal",
		...props
	});
}
function DialogOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogBackdrop, {
		"data-slot": "dialog-overlay",
		className: cn("fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0", className),
		...props
	});
}
function DialogContent({ className, children, showCloseButton = true, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPopup, {
		"data-slot": "dialog-content",
		className: cn("fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-popover p-4 text-sm text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className),
		...props,
		children: [children, showCloseButton && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
			"data-slot": "dialog-close",
			render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
				variant: "ghost",
				className: "absolute top-2 right-2",
				size: "icon-sm"
			}),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Close"
			})]
		})]
	})] });
}
function DialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "dialog-header",
		className: cn("flex flex-col gap-2", className),
		...props
	});
}
function DialogFooter({ className, showCloseButton = false, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-slot": "dialog-footer",
		className: cn("-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 sm:flex-row sm:justify-end", className),
		...props,
		children: [children, showCloseButton && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
			render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, { variant: "outline" }),
			children: "Close"
		})]
	});
}
function DialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
		"data-slot": "dialog-title",
		className: cn("text-base leading-none font-medium", className),
		...props
	});
}
function DialogDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
		"data-slot": "dialog-description",
		className: cn("text-sm text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground", className),
		...props
	});
}
var counter = 0;
var useDialog = create((set) => ({
	stack: [],
	open: (config) => {
		const id = `dialog-${Date.now()}-${++counter}`;
		set((s) => ({ stack: [...s.stack, {
			id,
			title: config.title,
			component: config.component,
			props: config.props ?? {},
			width: config.width ?? "480px",
			offset: {
				x: 0,
				y: 0
			}
		}] }));
		return id;
	},
	close: (id) => set((s) => ({ stack: s.stack.filter((d) => d.id !== id) })),
	clear: () => set({ stack: [] }),
	updateOffset: (id, offset) => set((s) => ({ stack: s.stack.map((d) => d.id === id ? {
		...d,
		offset
	} : d) }))
}));
function DialogRenderer() {
	const stack = useDialog((s) => s.stack);
	const close = useDialog((s) => s.close);
	return stack.map((dialog) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogInstance, {
		dialog,
		onClose: () => close(dialog.id)
	}, dialog.id));
}
function DialogInstance({ dialog, onClose }) {
	const updateOffset = useDialog((s) => s.updateOffset);
	const dragRef = (0, import_react.useRef)({
		dragging: false,
		startX: 0,
		startY: 0,
		origX: 0,
		origY: 0
	});
	const handleMouseDown = (0, import_react.useCallback)((e) => {
		if (e.button !== 0) return;
		const state = dragRef.current;
		state.dragging = true;
		state.startX = e.clientX;
		state.startY = e.clientY;
		state.origX = dialog.offset.x;
		state.origY = dialog.offset.y;
		const handleMouseMove = (me) => {
			if (!state.dragging) return;
			updateOffset(dialog.id, {
				x: state.origX + (me.clientX - state.startX),
				y: state.origY + (me.clientY - state.startY)
			});
		};
		const handleMouseUp = () => {
			state.dragging = false;
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseup", handleMouseUp);
		};
		document.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("mouseup", handleMouseUp);
	}, [
		dialog.id,
		dialog.offset.x,
		dialog.offset.y,
		updateOffset
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog$1, {
		open: true,
		disablePointerDismissal: true,
		onOpenChange: (open) => {
			if (!open) onClose();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "translate-x-0 translate-y-0",
			style: {
				top: `calc(50% + ${dialog.offset.y}px)`,
				left: `calc(50% + ${dialog.offset.x}px)`,
				transform: "translate(-50%, -50%)",
				width: dialog.width
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
				className: "cursor-move select-none",
				onMouseDown: handleMouseDown,
				children: dialog.title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: dialog.title })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(dialog.component, {
				dialogId: dialog.id,
				close: onClose,
				...dialog.props
			})]
		})
	});
}
var useLoader = create((set) => ({
	isLoading: false,
	message: null,
	show: (message) => set({
		isLoading: true,
		message: message || null
	}),
	hide: () => set({
		isLoading: false,
		message: null
	})
}));
function Loader() {
	const isLoading = useLoader((s) => s.isLoading);
	const message = useLoader((s) => s.message);
	if (!isLoading) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-[9999] flex items-center justify-center bg-black/60",
		"aria-busy": "true",
		role: "alert",
		"aria-live": "assertive",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-12 animate-spin text-white" }), message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-lg font-medium text-white",
				children: message
			})]
		})
	});
}
function NotFoundPage() {
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "flex flex-col items-center justify-center py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "island-shell flex flex-col items-center gap-6 px-8 py-12 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold tracking-tight text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-sm text-lg text-muted-foreground",
					children: "La página que estás buscando no existe o ha sido movida."
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
var styles_default = "/assets/styles-DwUosRd8.css";
var THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:'auto';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='auto'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);if(mode==='auto'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',mode)}root.style.colorScheme=resolved;}catch(e){}})();`;
var Route$13 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "EICAP-BANK" }
		],
		links: [{
			rel: "stylesheet",
			href: styles_default
		}, {
			rel: "icon",
			type: "image/png",
			href: "/image.png"
		}]
	}),
	shellComponent: RootDocument,
	notFoundComponent: NotFoundPage
});
function RootDocument({ children }) {
	(0, import_react.useEffect)(() => {}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("head", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", { dangerouslySetInnerHTML: { __html: THEME_INIT_SCRIPT } }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "font-sans antialiased wrap-anywhere selection:bg-[rgba(77,143,224,0.22)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogRenderer, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
					richColors: true,
					closeButton: true,
					position: "top-right",
					expand: true,
					visibleToasts: 5
				}),
				children,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	});
}
var $$splitComponentImporter$12 = () => import("./routes-Cg8jLMq8.mjs");
var Route$12 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var useAuthStore = create()(persist((set) => ({
	user: null,
	token: null,
	isAuthenticated: false,
	setUser: (user) => set({ user }),
	setToken: (token) => set({
		token,
		isAuthenticated: token !== null && validateToken(token)
	}),
	logout: () => set({
		user: null,
		token: null,
		isAuthenticated: false
	})
}), {
	name: "auth-storage",
	onRehydrateStorage: () => (state) => {
		if (state?.token && !validateToken(state.token)) state.logout();
	}
}));
var _prevToken = null;
useAuthStore.subscribe((state) => {
	if (state.token !== _prevToken) {
		if (state.token && !validateToken(state.token)) state.logout();
		_prevToken = state.token;
	}
});
var $$splitComponentImporter$11 = () => import("../_protected-OOFWz27q.mjs");
var Route$11 = createFileRoute("/_protected")({
	beforeLoad: () => {
		if (!useAuthStore.getState().isAuthenticated) throw redirect({ to: "/unauthorized" });
	},
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./unauthorized-DasTyxV3.mjs");
var Route$10 = createFileRoute("/unauthorized")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./dashboard-CyE--rb6.mjs");
var Route$9 = createFileRoute("/_protected/dashboard")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./dashboard-Bf0ztgxn.mjs");
var Route$8 = createFileRoute("/_protected/dashboard/")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./account-Df8UDaqq.mjs");
var ALLOWED_ROLES$6 = ["admin", "student"];
var Route$7 = createFileRoute("/_protected/dashboard/account/")({
	beforeLoad: () => {
		const permission = usePermission.getState().permission;
		if (!permission || !ALLOWED_ROLES$6.includes(permission)) throw redirect({ to: "/unauthorized" });
	},
	validateSearch: BankOperationFilterSchema,
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./cash-closing-D_OHkt0h.mjs");
var ALLOWED_ROLES$5 = ["admin"];
var Route$6 = createFileRoute("/_protected/dashboard/cash-closing/")({
	beforeLoad: () => {
		const permission = usePermission.getState().permission;
		if (!permission || !ALLOWED_ROLES$5.includes(permission)) throw redirect({ to: "/unauthorized" });
	},
	validateSearch: CashSessionFilterSchema,
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./client-CfdaJosm.mjs");
var ALLOWED_ROLES$4 = ["admin", "student"];
var Route$5 = createFileRoute("/_protected/dashboard/client/")({
	beforeLoad: () => {
		const permission = usePermission.getState().permission;
		console.log("[Route] beforeLoad — permission:", permission);
		if (!permission || !ALLOWED_ROLES$4.includes(permission)) throw redirect({ to: "/unauthorized" });
	},
	validateSearch: ClientFilterSchema,
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("../_clientId-Cczl6anX.mjs");
var ALLOWED_ROLES$3 = ["admin", "student"];
var Route$4 = createFileRoute("/_protected/dashboard/client/$clientId")({
	beforeLoad: () => {
		const permission = usePermission.getState().permission;
		if (!permission || !ALLOWED_ROLES$3.includes(permission)) throw redirect({ to: "/unauthorized" });
	},
	validateSearch: BankOperationFilterSchema,
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./credit-D-4nhPx1.mjs");
var ALLOWED_ROLES$2 = ["admin", "student"];
var Route$3 = createFileRoute("/_protected/dashboard/credit/")({
	beforeLoad: () => {
		const permission = usePermission.getState().permission;
		if (!permission || !ALLOWED_ROLES$2.includes(permission)) throw redirect({ to: "/unauthorized" });
	},
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("../_clientId-Bm467L7z.mjs");
var ALLOWED_ROLES$1 = ["admin", "student"];
var Route$2 = createFileRoute("/_protected/dashboard/credit/$clientId")({
	beforeLoad: () => {
		const permission = usePermission.getState().permission;
		if (!permission || !ALLOWED_ROLES$1.includes(permission)) throw redirect({ to: "/unauthorized" });
	},
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./user-DnkONvxJ.mjs");
var ALLOWED_ROLES = ["admin"];
var Route$1 = createFileRoute("/_protected/dashboard/user/")({
	beforeLoad: () => {
		const permission = usePermission.getState().permission;
		console.log("[Route] beforeLoad — permission:", permission);
		if (!permission || !ALLOWED_ROLES.includes(permission)) throw redirect({ to: "/unauthorized" });
	},
	validateSearch: UserFilterSchema,
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./me-DDzAUQ3b.mjs");
var Route = createFileRoute("/_protected/dashboard/user/me")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$12.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$13
});
var ProtectedRoute = Route$11.update({
	id: "/_protected",
	getParentRoute: () => Route$13
});
var UnauthorizedRoute = Route$10.update({
	id: "/unauthorized",
	path: "/unauthorized",
	getParentRoute: () => Route$13
});
var ProtectedDashboardRoute = Route$9.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => ProtectedRoute
});
var ProtectedDashboardIndexRoute = Route$8.update({
	id: "/",
	path: "/",
	getParentRoute: () => ProtectedDashboardRoute
});
var ProtectedDashboardAccountIndexRoute = Route$7.update({
	id: "/account/",
	path: "/account/",
	getParentRoute: () => ProtectedDashboardRoute
});
var ProtectedDashboardCashClosingIndexRoute = Route$6.update({
	id: "/cash-closing/",
	path: "/cash-closing/",
	getParentRoute: () => ProtectedDashboardRoute
});
var ProtectedDashboardClientIndexRoute = Route$5.update({
	id: "/client/",
	path: "/client/",
	getParentRoute: () => ProtectedDashboardRoute
});
var ProtectedDashboardClientClientIdRoute = Route$4.update({
	id: "/client/$clientId",
	path: "/client/$clientId",
	getParentRoute: () => ProtectedDashboardRoute
});
var ProtectedDashboardCreditIndexRoute = Route$3.update({
	id: "/credit/",
	path: "/credit/",
	getParentRoute: () => ProtectedDashboardRoute
});
var ProtectedDashboardCreditClientIdRoute = Route$2.update({
	id: "/credit/$clientId",
	path: "/credit/$clientId",
	getParentRoute: () => ProtectedDashboardRoute
});
var ProtectedDashboardUserIndexRoute = Route$1.update({
	id: "/user/",
	path: "/user/",
	getParentRoute: () => ProtectedDashboardRoute
});
var ProtectedDashboardRouteChildren = {
	ProtectedDashboardIndexRoute,
	ProtectedDashboardClientClientIdRoute,
	ProtectedDashboardCreditClientIdRoute,
	ProtectedDashboardUserMeRoute: Route.update({
		id: "/user/me",
		path: "/user/me",
		getParentRoute: () => ProtectedDashboardRoute
	}),
	ProtectedDashboardAccountIndexRoute,
	ProtectedDashboardCashClosingIndexRoute,
	ProtectedDashboardClientIndexRoute,
	ProtectedDashboardCreditIndexRoute,
	ProtectedDashboardUserIndexRoute
};
var ProtectedRouteChildren = { ProtectedDashboardRoute: ProtectedDashboardRoute._addFileChildren(ProtectedDashboardRouteChildren) };
var rootRouteChildren = {
	IndexRoute,
	ProtectedRoute: ProtectedRoute._addFileChildren(ProtectedRouteChildren),
	UnauthorizedRoute
};
var routeTree = Route$13._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	const context = getContext();
	const router = createRouter({
		routeTree,
		context: { ...context },
		scrollRestoration: true,
		defaultPreload: "intent",
		defaultPreloadStaleTime: 0,
		defaultErrorComponent: ({ error, reset }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorPage, {
			error,
			reset
		})
	});
	setupRouterSsrQueryIntegration({
		router,
		queryClient: context.queryClient
	});
	return router;
}
//#endregion
export { BankOperationListPaginatedSchema, CashSessionListPaginatedSchema, CashSessionSchema, ClientListPaginatedSchema, ClientSchema, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, PaginatedResponse, PaginationSchema, Route$1, Route$2, Route$4, Route$5, Route$6, Route$7, UserListPaginatedSchema, UserSchema, defaultPagination, parseResponse, router_DYX03kjF_exports, useAuthStore, useDialog, useLoader, usePermission };
